// Preserve the supplied geometry's drawing vocabulary, emitting vector nodes only.
const NS = "http://www.w3.org/2000/svg";
let gradientId = 0;

// Shared filters are declared once per board by the SVG layer.
export const SHADOW_FILTERS = {
  soft: "dna-shadow-soft",
  lift: "dna-shadow-lift",
};

export function svgNode(tag, attrs = {}) {
  const node = document.createElementNS(NS, tag);
  for (const [name, value] of Object.entries(attrs))
    node.setAttribute(name, String(value));
  return node;
}

export class SvgDrawing {
  constructor(parent) {
    this.parent = parent;
    this.state = {
      fillStyle: "#000",
      strokeStyle: "#000",
      lineWidth: 1,
      lineCap: "butt",
      lineJoin: "miter",
      globalAlpha: 1,
      font: "10px sans-serif",
      textAlign: "start",
      textBaseline: "alphabetic",
      dash: [],
      transform: [1, 0, 0, 1, 0, 0],
      animation: null,
      shadow: null,
    };
    this.stack = [];
    this.beginPath();
  }
  save() {
    this.stack.push({ ...this.state, transform: [...this.state.transform] });
  }
  restore() {
    this.state = this.stack.pop() ?? this.state;
  }
  setLineDash(dash) {
    this.state.dash = [...dash];
  }
  translate(x, y) {
    const [a, b, c, d, e, f] = this.state.transform;
    this.state.transform = [a, b, c, d, e + a * x + c * y, f + b * x + d * y];
  }
  scale(x, y = x) {
    const [a, b, c, d, e, f] = this.state.transform;
    this.state.transform = [a * x, b * x, c * y, d * y, e, f];
  }
  beginPath() {
    this.path = [];
    this.current = null;
    this.start = null;
  }
  moveTo(x, y) {
    this.path.push(`M ${x} ${y}`);
    this.current = this.start = { x, y };
  }
  lineTo(x, y) {
    if (!this.current) this.moveTo(x, y);
    else {
      this.path.push(`L ${x} ${y}`);
      this.current = { x, y };
    }
  }
  closePath() {
    this.path.push("Z");
    this.current = this.start;
  }
  arcTo(x1, y1, x2, y2, radius) {
    const p = this.current;
    if (!p) {
      this.moveTo(x1, y1);
      return;
    }
    const a = { x: p.x - x1, y: p.y - y1 },
      b = { x: x2 - x1, y: y2 - y1 };
    const al = Math.hypot(a.x, a.y),
      bl = Math.hypot(b.x, b.y);
    const cross = a.x * b.y - a.y * b.x;
    if (!al || !bl || !radius || Math.abs(cross) < 1e-9) {
      this.lineTo(x1, y1);
      return;
    }
    const angle = Math.acos(
      Math.max(-1, Math.min(1, (a.x * b.x + a.y * b.y) / (al * bl))),
    );
    const distance = radius / Math.tan(angle / 2);
    this.lineTo(x1 + (a.x / al) * distance, y1 + (a.y / al) * distance);
    const end = {
      x: x1 + (b.x / bl) * distance,
      y: y1 + (b.y / bl) * distance,
    };
    this.path.push(
      `A ${radius} ${radius} 0 0 ${cross < 0 ? 1 : 0} ${end.x} ${end.y}`,
    );
    this.current = end;
  }
  arc(x, y, radius, start, end, anticlockwise = false) {
    this.ellipse(x, y, radius, radius, 0, start, end, anticlockwise);
  }
  ellipse(x, y, rx, ry, rotation, start, end, anticlockwise = false) {
    const tau = Math.PI * 2;
    let delta = end - start;
    if (!anticlockwise && delta >= tau) delta = tau;
    else if (anticlockwise && -delta >= tau) delta = -tau;
    else if (!anticlockwise) delta = ((delta % tau) + tau) % tau;
    else delta = -(((-delta % tau) + tau) % tau);
    const at = (angle) => ({
      x:
        x +
        rx * Math.cos(angle) * Math.cos(rotation) -
        ry * Math.sin(angle) * Math.sin(rotation),
      y:
        y +
        rx * Math.cos(angle) * Math.sin(rotation) +
        ry * Math.sin(angle) * Math.cos(rotation),
    });
    const first = at(start);
    this.lineTo(first.x, first.y);
    // A full ellipse needs two SVG arcs, since coincident endpoints draw nothing.
    const count = Math.abs(delta) >= tau - 1e-9 ? 2 : 1;
    for (let i = 1; i <= count; i += 1) {
      const endPoint = at(start + (delta * i) / count);
      this.path.push(
        `A ${rx} ${ry} ${(rotation * 180) / Math.PI} ${Math.abs(delta / count) > Math.PI ? 1 : 0} ${delta >= 0 ? 1 : 0} ${endPoint.x} ${endPoint.y}`,
      );
      this.current = endPoint;
    }
  }
  roundRect(x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    this.moveTo(x + r, y);
    this.lineTo(x + width - r, y);
    this.arcTo(x + width, y, x + width, y + r, r);
    this.lineTo(x + width, y + height - r);
    this.arcTo(x + width, y + height, x + width - r, y + height, r);
    this.lineTo(x + r, y + height);
    this.arcTo(x, y + height, x, y + height - r, r);
    this.lineTo(x, y + r);
    this.arcTo(x, y, x + r, y, r);
    this.closePath();
  }
  paint(stroke) {
    const s = this.state;
    const node = svgNode("path", {
      d: this.path.join(" "),
      fill: stroke ? "none" : this.color(s.fillStyle),
      opacity: s.globalAlpha,
    });
    this.applyTransform(node);
    this.applyEffects(node);
    if (stroke) {
      for (const [key, value] of Object.entries({
        stroke: this.color(s.strokeStyle),
        "stroke-width": s.lineWidth,
        "stroke-linecap": s.lineCap,
        "stroke-linejoin": s.lineJoin,
        "stroke-dasharray": s.dash.join(" ") || "none",
      }))
        node.setAttribute(key, String(value));
    }
    this.parent.append(node);
  }
  fill() {
    this.paint(false);
  }
  stroke() {
    this.paint(true);
  }
  fillRect(x, y, width, height) {
    const node = svgNode("rect", {
      x,
      y,
      width,
      height,
      fill: this.color(this.state.fillStyle),
      opacity: this.state.globalAlpha,
    });
    this.applyTransform(node);
    this.applyEffects(node);
    this.parent.append(node);
  }
  fillText(value, x, y) {
    const s = this.state;
    const font = s.font.match(/^(?:(\d+)\s+)?([\d.]+)px\s+(.+)$/);
    const node = svgNode("text", {
      x,
      y,
      fill: this.color(s.fillStyle),
      opacity: s.globalAlpha,
      "font-weight": font?.[1] ?? "400",
      "font-size": font?.[2] ?? "10",
      "font-family": font?.[3] ?? "sans-serif",
      "text-anchor":
        s.textAlign === "center"
          ? "middle"
          : s.textAlign === "right"
            ? "end"
            : "start",
      "dominant-baseline":
        s.textBaseline === "middle" ? "central" : "alphabetic",
    });
    this.applyTransform(node);
    this.applyEffects(node);
    node.textContent = value;
    this.parent.append(node);
  }
  // Motion classes hand CSS keyframes to freshly built nodes, and shadow
  // filters keep lifted elements readable against the bench.
  applyEffects(node) {
    const { animation, shadow } = this.state;
    if (animation) node.setAttribute("class", animation);
    if (shadow) node.setAttribute("filter", `url(#${SHADOW_FILTERS[shadow]})`);
  }
  applyTransform(node) {
    const [a, b, c, d, e, f] = this.state.transform;
    if (a !== 1 || b !== 0 || c !== 0 || d !== 1 || e !== 0 || f !== 0) {
      node.setAttribute("transform", `matrix(${a} ${b} ${c} ${d} ${e} ${f})`);
    }
  }
  color(value) {
    return typeof value === "string" ? value : `url(#${value.id})`;
  }
  createLinearGradient(x1, y1, x2, y2) {
    const id = `dna-gradient-${++gradientId}`;
    const node = svgNode("linearGradient", {
      id,
      x1,
      y1,
      x2,
      y2,
      gradientUnits: "userSpaceOnUse",
    });
    const defs = svgNode("defs");
    defs.append(node);
    this.parent.append(defs);
    return {
      id,
      addColorStop(offset, color) {
        node.append(svgNode("stop", { offset, "stop-color": color }));
      },
    };
  }
}

for (const key of [
  "fillStyle",
  "strokeStyle",
  "lineWidth",
  "lineCap",
  "lineJoin",
  "globalAlpha",
  "font",
  "textAlign",
  "textBaseline",
  "animation",
  "shadow",
]) {
  Object.defineProperty(SvgDrawing.prototype, key, {
    get() {
      return this.state[key];
    },
    set(value) {
      this.state[key] = value;
    },
  });
}
