import {
  BoxGeometry,
  BufferGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  InstancedMesh,
  LinearFilter,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Quaternion,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
} from "three";
import { BASE_COLORS, BASE_STRUCTURES, COMPLEMENT } from "./assembly-model.js";

// Layout coordinates are a teaching schematic, not measured atomic positions.
const RISE = 0.86;
const TWIST = Math.PI / 5;
const RADIUS = 2.85;
const GROOVE_OFFSET = 0.48;
const SLAB_THICKNESS = 0.22;
const LABEL_SURFACE_GAP = 0.01;
const UP = new Vector3(0, 1, 0);
const ATLAS_COLUMNS = 8;
const ATLAS_CELL = 128;

export function getDisplayNucleotides(nucleotides, extend) {
  const actual = nucleotides.map((base) => ({ ...base, generated: false }));
  if (!extend || !actual.length) return actual;
  const occupied = new Map(
    actual.map((base) => [`${base.strand}:${base.row}`, base.type]),
  );
  const result = [...actual];
  for (let row = -16; row <= 23; row++) {
    const left =
      occupied.get(`left:${row}`) ||
      COMPLEMENT[occupied.get(`right:${row}`)] ||
      ["A", "T", "G", "C"][Math.abs(row * 13 + 7) % 4];
    for (const strand of ["left", "right"]) {
      if (!occupied.has(`${strand}:${row}`)) {
        result.push({
          row,
          strand,
          type: strand === "left" ? left : COMPLEMENT[left],
          generated: true,
        });
      }
    }
  }
  return result.sort(
    (a, b) => a.row - b.row || a.strand.localeCompare(b.strand),
  );
}

function position(row, x, z, centerRow, height = 0) {
  const angle = row * TWIST;
  return new Vector3(
    x * Math.cos(angle) + z * Math.sin(angle),
    (row - centerRow) * RISE + height,
    -x * Math.sin(angle) + z * Math.cos(angle),
  );
}

function makeAtlas() {
  const tokens = [
    ...new Set([
      "A",
      "T",
      "G",
      "C",
      "5'",
      "3'",
      ...Object.values(BASE_STRUCTURES).flatMap((base) =>
        base.labels.map((label) => label.text),
      ),
    ]),
  ];
  const canvas = document.createElement("canvas");
  canvas.width = ATLAS_COLUMNS * ATLAS_CELL;
  canvas.height = Math.ceil(tokens.length / ATLAS_COLUMNS) * ATLAS_CELL;
  const context = canvas.getContext("2d");
  context.font = "600 74px sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#18324a";
  tokens.forEach((token, index) => {
    context.fillText(
      token,
      (index % ATLAS_COLUMNS) * ATLAS_CELL + ATLAS_CELL / 2,
      Math.floor(index / ATLAS_COLUMNS) * ATLAS_CELL + ATLAS_CELL / 2,
      ATLAS_CELL - 8,
    );
  });
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  return { texture, tokens, rows: canvas.height / ATLAS_CELL };
}

export function createHelixGeometry() {
  const geometries = {
    sphere: new SphereGeometry(1, 24, 16),
    cylinder: new CylinderGeometry(1, 1, 1, 12, 1, true),
    slab: new BoxGeometry(1, 1, 1),
  };
  const material = new MeshStandardMaterial({
    roughness: 0.34,
    metalness: 0.08,
  });
  const atlas = makeAtlas();
  const labelMaterial = new MeshBasicMaterial({
    map: atlas.texture,
    transparent: true,
    alphaTest: 0.15,
    depthWrite: false,
    side: DoubleSide,
    forceSinglePass: true,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });
  // Surface labels use world-space corners; other labels use billboard offsets.
  labelMaterial.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        "#include <common>\nattribute vec2 labelOffset;",
      )
      .replace(
        "#include <project_vertex>",
        "#include <project_vertex>\nmvPosition.xy += labelOffset;\ngl_Position = projectionMatrix * mvPosition;",
      );
  };
  const matrix = new Matrix4();
  const quaternion = new Quaternion();
  const scale = new Vector3();
  const color = new Color();
  const direction = new Vector3();
  let current = null;

  function disposeGroup() {
    if (!current) return;
    current.traverse((object) => {
      if (object.isInstancedMesh) object.dispose();
      if (object.userData.labelGeometry) object.geometry.dispose();
    });
    current.removeFromParent();
    current = null;
  }

  function build(nucleotides, mode) {
    disposeGroup();
    const group = new Group();
    const minRow = Math.min(...nucleotides.map((base) => base.row));
    const maxRow = Math.max(...nucleotides.map((base) => base.row));
    const centerRow = (minRow + maxRow) / 2;
    const batches = { sphere: [], cylinder: [], slab: [] };
    const labels = [];
    const pairs = [];
    const backboneLinks = [];
    const occupied = new Map(
      nucleotides.map((base) => [`${base.strand}:${base.row}`, base]),
    );
    const addSphere = (point, radius, tint, base) =>
      batches.sphere.push({
        point,
        scale: new Vector3(radius, radius, radius),
        quaternion: new Quaternion(),
        tint,
        base,
      });
    function addBond(from, to, radius, tint, base) {
      direction.subVectors(to, from);
      batches.cylinder.push({
        point: from.clone().add(to).multiplyScalar(0.5),
        scale: new Vector3(radius, direction.length(), radius),
        quaternion: new Quaternion().setFromUnitVectors(
          UP,
          direction.normalize(),
        ),
        tint,
        base,
      });
    }
    function addDashes(from, to) {
      for (let dash = 0; dash < 4; dash++) {
        addBond(
          from.clone().lerp(to, dash / 4),
          from.clone().lerp(to, (dash + 0.55) / 4),
          0.025,
          "#967b68",
        );
      }
    }

    for (const base of nucleotides) {
      const { row, strand, type } = base;
      const sign = strand === "left" ? -1 : 1;
      const at = (x, z = GROOVE_OFFSET, height = 0) =>
        position(row, x, z, centerRow, height);
      const tint = BASE_COLORS[type].fill;
      const backboneTint = base.generated ? "#8cacc0" : "#397a9c";
      const sugar = at(sign * RADIUS);
      const phosphateRow = row + sign * 0.5;
      const phosphate = position(
        phosphateRow,
        sign * RADIUS,
        GROOVE_OFFSET,
        centerRow,
      );
      addSphere(sugar, mode === "structure" ? 0.16 : 0.24, "#c5dfed", base);
      addSphere(phosphate, 0.17, "#df9d7c", base);
      let previous = sugar;
      for (let step = 1; step <= 4; step++) {
        const next = position(
          row + (sign * step) / 8,
          sign * RADIUS,
          GROOVE_OFFSET,
          centerRow,
        );
        addBond(previous, next, 0.095, backboneTint, base);
        addSphere(next, 0.095, backboneTint, base);
        previous = next;
      }
      if (occupied.has(`${strand}:${row + sign}`)) {
        backboneLinks.push([`${strand}:${row}`, `${strand}:${row + sign}`]);
        for (let step = 5; step <= 8; step++) {
          const next = position(
            row + (sign * step) / 8,
            sign * RADIUS,
            GROOVE_OFFSET,
            centerRow,
          );
          addBond(previous, next, 0.095, backboneTint, base);
          addSphere(next, 0.095, backboneTint, base);
          previous = next;
        }
      }

      if (mode === "structure") {
        // Reuse the supplied base diagrams; their plane rotates with the helix.
        const local = (point) =>
          at(sign * (2.4 - point.x * 2.12), (point.y - 0.5) * 1.3 + 0.18);
        const structure = BASE_STRUCTURES[type];
        for (const bond of structure.bonds) {
          const copies = bond.order === 2 ? [-0.035, 0.035] : [0];
          const dx = bond.to.x - bond.from.x;
          const dz = bond.to.y - bond.from.y;
          const length = Math.hypot(dx, dz) || 1;
          for (const offset of copies) {
            const shift = (point) => ({
              x: point.x - (dz / length) * offset,
              y: point.y + (dx / length) * offset,
            });
            addBond(
              local(shift(bond.from)),
              local(shift(bond.to)),
              0.035,
              tint,
              base,
            );
          }
        }
        addBond(sugar, local(structure.sugarAnchor), 0.055, backboneTint, base);
        for (const label of structure.labels) {
          labels.push({
            point: local(label.at).add(new Vector3(0, 0.055, 0)),
            text: label.text,
            row,
            size: label.text.length > 1 ? 0.48 : 0.36,
          });
        }
      } else {
        addBond(sugar, at(sign * 2.14, 0.18), 0.07, backboneTint, base);
        batches.slab.push({
          point: at(sign * 1.27, 0.18),
          scale: new Vector3(1.8, SLAB_THICKNESS, 0.74),
          quaternion: new Quaternion().setFromAxisAngle(UP, row * TWIST),
          tint,
          base,
        });
        for (const surfaceSide of [1, -1]) {
          labels.push({
            point: at(
              sign * 1.27,
              0.18,
              surfaceSide * (SLAB_THICKNESS / 2 + LABEL_SURFACE_GAP),
            ),
            text: type,
            row,
            size: 0.65,
            surfaceSide,
          });
        }
      }

      const partner = occupied.get(`right:${row}`);
      if (strand === "left" && partner?.type === COMPLEMENT[type]) {
        const count = type === "A" || type === "T" ? 2 : 3;
        pairs.push({ row, count });
        for (let bond = 0; bond < count; bond++) {
          const z = 0.18 + (bond - (count - 1) / 2) * 0.24;
          const leftAnchor = BASE_STRUCTURES[type].pairAnchors[bond];
          const rightAnchor = BASE_STRUCTURES[partner.type].pairAnchors[bond];
          addDashes(
            mode === "structure"
              ? at(
                  -(2.4 - leftAnchor.x * 2.12),
                  (leftAnchor.y - 0.5) * 1.3 + 0.18,
                )
              : at(-0.33, z),
            mode === "structure"
              ? at(
                  2.4 - rightAnchor.x * 2.12,
                  (rightAnchor.y - 0.5) * 1.3 + 0.18,
                )
              : at(0.33, z),
          );
        }
      }
    }

    for (const strand of ["left", "right"]) {
      const rows = nucleotides
        .filter((base) => base.strand === strand)
        .map((base) => base.row);
      if (!rows.length) continue;
      const sign = strand === "left" ? -1 : 1;
      for (const end of ["start", "end"]) {
        const row = end === "start" ? Math.min(...rows) : Math.max(...rows);
        const fivePrime = (strand === "left") === (end === "start");
        labels.push({
          point: position(
            row,
            sign * (RADIUS + 0.48),
            GROOVE_OFFSET,
            centerRow,
            end === "start" ? -0.45 : 0.45,
          ),
          text: fivePrime ? "5'" : "3'",
          row,
          size: 0.48,
        });
      }
    }

    for (const [name, instances] of Object.entries(batches)) {
      if (!instances.length) continue;
      const mesh = new InstancedMesh(
        geometries[name],
        material,
        instances.length,
      );
      mesh.name = name;
      mesh.userData.bases = instances.map((instance) => instance.base);
      instances.forEach((instance, index) => {
        scale.copy(instance.scale);
        quaternion.copy(instance.quaternion);
        matrix.compose(instance.point, quaternion, scale);
        mesh.setMatrixAt(index, matrix);
        mesh.setColorAt(index, color.set(instance.tint));
      });
      mesh.instanceMatrix.needsUpdate = true;
      mesh.instanceColor.needsUpdate = true;
      mesh.computeBoundingSphere();
      group.add(mesh);
    }
    const positions = [];
    const offsets = [];
    const uvs = [];
    const indices = [];
    labels.forEach((label, index) => {
      const indexInAtlas = atlas.tokens.indexOf(label.text);
      const col = indexInAtlas % ATLAS_COLUMNS;
      const row = Math.floor(indexInAtlas / ATLAS_COLUMNS);
      for (const [x, z, u, v] of [
        [-1, -1, 0, 1],
        [1, -1, 1, 1],
        [1, 1, 1, 0],
        [-1, 1, 0, 0],
      ]) {
        const half = label.size / 2;
        if (label.surfaceSide) {
          const corner = new Vector3(x * half, 0, z * half * label.surfaceSide)
            .applyAxisAngle(UP, label.row * TWIST)
            .add(label.point);
          positions.push(corner.x, corner.y, corner.z);
          offsets.push(0, 0);
        } else {
          positions.push(label.point.x, label.point.y, label.point.z);
          offsets.push(x * half, -z * half);
        }
        uvs.push((col + u) / ATLAS_COLUMNS, 1 - (row + 1 - v) / atlas.rows);
      }
      const offset = index * 4;
      indices.push(
        offset,
        offset + 2,
        offset + 1,
        offset,
        offset + 3,
        offset + 2,
      );
    });
    if (labels.length) {
      const geometry = new BufferGeometry();
      geometry.setAttribute(
        "position",
        new Float32BufferAttribute(positions, 3),
      );
      geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
      geometry.setAttribute(
        "labelOffset",
        new Float32BufferAttribute(offsets, 2),
      );
      geometry.setIndex(indices);
      const mesh = new Mesh(geometry, labelMaterial);
      mesh.userData.labelGeometry = true;
      group.add(mesh);
    }
    group.userData = {
      height: Math.max(2, (maxRow - minRow + 2) * RISE),
      nucleotides,
      pairs,
      backboneLinks,
    };
    current = group;
    return group;
  }

  return {
    build,
    dispose() {
      disposeGroup();
      Object.values(geometries).forEach((geometry) => geometry.dispose());
      material.dispose();
      labelMaterial.dispose();
      atlas.texture.dispose();
    },
  };
}
