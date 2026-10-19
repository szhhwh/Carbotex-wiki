import {
  ACESFilmicToneMapping,
  Color,
  DirectionalLight,
  HemisphereLight,
  PerspectiveCamera,
  Raycaster,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { gsap } from "gsap";
import {
  createHelixGeometry,
  getDisplayNucleotides,
} from "../core/helix-geometry.js";
import { onLocaleChange, t } from "../../../shared/js/i18n.js";

export function createHelixViewer(host, { onSelect, onContextChange }) {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionReduced = () => motionQuery.matches;
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.setClearColor(new Color("#f4f5ef"), 0);
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-label", t("dna.viewer.label"));
  canvas.setAttribute("aria-describedby", "viewer-help");

  const stopLocaleListener = onLocaleChange(() => {
    canvas.setAttribute("aria-label", t("dna.viewer.label"));
  });
  canvas.tabIndex = 0;
  host.append(canvas);
  const scene = new Scene();
  scene.add(new HemisphereLight("#e8f5ff", "#9e9585", 2.7));
  const key = new DirectionalLight("#fff2db", 3.1);
  key.position.set(5, 10, 8);
  const rim = new DirectionalLight("#a9d9ff", 2);
  rim.position.set(-8, 3, -5);
  scene.add(key, rim);
  const camera = new PerspectiveCamera(36, 1, 0.1, 500);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.enablePan = false;
  controls.autoRotateSpeed = 0.65;
  controls.maxPolarAngle = Math.PI - 0.08;
  controls.minPolarAngle = 0.08;
  const geometry = createHelixGeometry();
  const raycaster = new Raycaster();
  const pointer = new Vector2();
  let group = null;
  let signature = "";
  let extensionEnabled = false;
  let height = 4;
  let active = false;
  let ticking = false;
  let dirty = true;
  let interacting = false;
  let contextLost = false;
  let destroyed = false;
  let pointerDown = null;
  let cameraTween = null;

  function stop() {
    if (ticking) gsap.ticker.remove(tick);
    ticking = false;
  }

  function wake() {
    dirty = true;
    if (!active || contextLost || destroyed || ticking) return;
    ticking = true;
    gsap.ticker.add(tick);
  }

  function tick(_time, deltaMs) {
    const needsRender = dirty;
    dirty = false;
    const changed = controls.update(Math.min(deltaMs / 1000, 0.05));
    if (needsRender || changed) renderer.render(scene, camera);
    if (!interacting && !controls.autoRotate && !changed && !dirty) stop();
  }

  function fitDistance() {
    // Include both model height and width when fitting a portrait viewport.
    const halfFov = (camera.fov * Math.PI) / 360;
    return (
      (Math.max(height / 2 + 0.5, 3.7 / camera.aspect) / Math.tan(halfFov)) *
      1.12
    );
  }

  function fitCamera(animate = false) {
    const distance = fitDistance();
    controls.target.set(0, 0, 0);
    const target = new Vector3(distance * 0.22, distance * 0.38, distance);
    camera.near = Math.max(0.05, distance / 200);
    camera.far = Math.max(200, distance * 6);
    camera.updateProjectionMatrix();
    controls.minDistance = 3.8;
    controls.maxDistance = distance * 3;
    cameraTween?.kill();
    cameraTween = null;
    if (
      animate &&
      !motionReduced() &&
      camera.position.distanceTo(target) > 0.05
    )
      cameraTween = gsap.to(camera.position, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 0.65,
        ease: "power3.out",
        onUpdate: () => {
          controls.update();
          wake();
        },
      });
    else camera.position.copy(target);
    controls.update();
    controls.saveState();
    wake();
  }

  // A rebuilt model grows into place instead of blinking into the scene.
  function animateGroupIn(target, entering = false) {
    if (!target || motionReduced()) return;
    gsap.killTweensOf(target.scale);
    gsap.killTweensOf(target.rotation);
    target.scale.setScalar(entering ? 0.8 : 0.965);
    if (entering) target.rotation.y = -0.3;
    gsap.to(target.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: entering ? 0.72 : 0.4,
      ease: entering ? "back.out(1.4)" : "power2.out",
      onUpdate: wake,
    });
    if (entering)
      gsap.to(target.rotation, {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        onUpdate: wake,
      });
  }

  function resize() {
    const { width, height: viewportHeight } = host.getBoundingClientRect();
    if (!width || !viewportHeight) return;
    const previousAspect = camera.aspect;
    camera.aspect = width / viewportHeight;
    camera.updateProjectionMatrix();
    // Bound raster work on high-DPI and small devices.
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, width < 600 ? 1.5 : 2),
    );
    renderer.setSize(width, viewportHeight, false);
    if (previousAspect !== camera.aspect) fitCamera();
    wake();
  }

  function startInteraction() {
    interacting = true;
    canvas.classList.add("is-dragging");
    cameraTween?.kill();
    cameraTween = null;
    wake();
  }

  function endInteraction() {
    interacting = false;
    canvas.classList.remove("is-dragging");
    wake();
  }

  function select(event) {
    if (
      !pointerDown ||
      pointerDown.id !== event.pointerId ||
      Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y) >
        5
    ) {
      pointerDown = null;
      return;
    }
    pointerDown = null;
    const rect = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster
      .intersectObjects(group?.children || [], false)
      .find((intersection) => intersection.object.isInstancedMesh);
    const base = hit?.object.userData.bases[hit.instanceId];
    if (base) onSelect(base);
  }

  function rememberPointer(event) {
    // A second touch starts a pinch gesture, never a selection.
    if (!event.isPrimary) pointerDown = null;
    else
      pointerDown = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }

  function cancelPointer() {
    pointerDown = null;
    endInteraction();
  }

  function keydown(event) {
    if (event.key === "Home") {
      event.preventDefault();
      fitCamera();
    } else if (event.key === "+" || event.key === "=" || event.key === "-") {
      event.preventDefault();
      zoom(event.key === "-" ? -1 : 1);
    }
  }

  function zoom(direction) {
    const offset = camera.position.clone().sub(controls.target);
    const current = offset.length();
    const distance = Math.max(
      controls.minDistance,
      Math.min(controls.maxDistance, current * (direction > 0 ? 0.82 : 1.22)),
    );
    cameraTween?.kill();
    cameraTween = null;
    if (motionReduced() || Math.abs(distance - current) < 1e-3) {
      camera.position.copy(controls.target).add(offset.setLength(distance));
      controls.update();
      wake();
      return;
    }
    const flight = { distance: current };
    cameraTween = gsap.to(flight, {
      distance,
      duration: 0.36,
      ease: "power2.out",
      onUpdate: () => {
        const direction = camera.position.clone().sub(controls.target);
        if (direction.lengthSq() < 1e-6) return;
        camera.position
          .copy(controls.target)
          .add(direction.setLength(flight.distance));
        controls.update();
        wake();
      },
    });
    controls.update();
    wake();
  }

  function lost(event) {
    event.preventDefault();
    contextLost = true;
    controls.enabled = false;
    stop();
    onContextChange(false);
  }

  function restored() {
    contextLost = false;
    controls.enabled = active;
    onContextChange(true);
    wake();
  }

  controls.addEventListener("change", wake);
  controls.addEventListener("start", startInteraction);
  controls.addEventListener("end", endInteraction);
  canvas.addEventListener("pointerdown", rememberPointer);
  canvas.addEventListener("pointerup", select);
  canvas.addEventListener("pointercancel", cancelPointer);
  canvas.addEventListener("keydown", keydown);
  canvas.addEventListener("webglcontextlost", lost);
  canvas.addEventListener("webglcontextrestored", restored);
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  return {
    update(nucleotides, mode, extend) {
      const nextSignature = JSON.stringify([nucleotides, mode, extend]);
      if (signature === nextSignature) return;
      const display = getDisplayNucleotides(nucleotides, extend);
      const previousHeight = height;
      const extensionChanged = extend !== extensionEnabled;
      group = geometry.build(display, mode);
      scene.add(group);
      animateGroupIn(group, !signature);
      height = group.userData.height;
      if (
        !signature ||
        (!extensionChanged && Math.abs(previousHeight - height) > 0.5)
      ) {
        fitCamera();
      } else if (extensionChanged) {
        // Allow zooming out to the longer model without moving the current view.
        controls.maxDistance = Math.max(
          controls.maxDistance,
          fitDistance() * 3,
        );
        camera.far = Math.max(camera.far, controls.maxDistance * 2);
        camera.updateProjectionMatrix();
      }
      signature = nextSignature;
      extensionEnabled = extend;
      wake();
    },
    setActive(value) {
      if (active === value) return;
      active = value;
      controls.enabled = value && !contextLost;
      if (active) {
        resize();
        animateGroupIn(group, true);
        wake();
      } else {
        interacting = false;
        pointerDown = null;
        stop();
      }
    },
    setAutoRotate(value) {
      if (controls.autoRotate === value) return;
      controls.autoRotate = value;
      wake();
    },
    zoom,
    resetCamera: () => fitCamera(true),
    dispose() {
      destroyed = true;
      cameraTween?.kill();
      cameraTween = null;
      if (group) {
        gsap.killTweensOf(group.scale);
        gsap.killTweensOf(group.rotation);
      }
      stopLocaleListener();
      stop();
      observer.disconnect();
      controls.removeEventListener("change", wake);
      controls.removeEventListener("start", startInteraction);
      controls.removeEventListener("end", endInteraction);
      controls.dispose();
      canvas.removeEventListener("pointerdown", rememberPointer);
      canvas.removeEventListener("pointerup", select);
      canvas.removeEventListener("pointercancel", cancelPointer);
      canvas.removeEventListener("keydown", keydown);
      canvas.removeEventListener("webglcontextlost", lost);
      canvas.removeEventListener("webglcontextrestored", restored);
      geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      scene.clear();
    },
  };
}
