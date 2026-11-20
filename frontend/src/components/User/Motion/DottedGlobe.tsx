import { useEffect, useRef } from "react";
import { LAND_MASK_B64, LAND_MASK_HEIGHT, LAND_MASK_WIDTH } from "../../../data/landMask";

type DottedGlobeProps = {
  /** Highlighted location (degrees). Defaults to Dubai. */
  lat?: number;
  lon?: number;
  /** Places the marker's arcs reach to. Defaults to the GCC capitals. */
  targets?: [number, number][];
  className?: string;
};

type Vec = [number, number, number];

const DEG = Math.PI / 180;

// Riyadh, Doha, Muscat, Kuwait City, Manama
const GCC_CAPITALS: [number, number][] = [
  [24.71, 46.68],
  [25.29, 51.53],
  [23.59, 58.41],
  [29.37, 47.98],
  [26.23, 50.59],
];

const toVec = (la: number, lo: number): Vec => [
  Math.cos(la * DEG) * Math.sin(lo * DEG),
  Math.sin(la * DEG),
  Math.cos(la * DEG) * Math.cos(lo * DEG),
];

/** Decodes the embedded 1° land mask once and returns a lookup. */
let landLookup: ((lat: number, lon: number) => boolean) | null = null;
function getLand() {
  if (landLookup) return landLookup;
  const bin = atob(LAND_MASK_B64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  landLookup = (lat, lon) => {
    const row = Math.min(LAND_MASK_HEIGHT - 1, Math.max(0, Math.floor(90 - lat)));
    const col = (((Math.floor(lon + 180) % 360) + 360) % 360) % LAND_MASK_WIDTH;
    const i = row * LAND_MASK_WIDTH + col;
    return (bytes[i >> 3] & (1 << (i & 7))) !== 0;
  };
  return landLookup;
}

/** Land dots on an even grid, so density doesn't bunch up at the poles. */
function buildLandDots(step: number) {
  const isLand = getLand();
  const dots: Vec[] = [];
  for (let lat = -84; lat <= 84; lat += step) {
    const lonStep = step / Math.max(0.2, Math.cos(lat * DEG));
    for (let lon = -180; lon < 180; lon += lonStep) {
      if (isLand(lat, lon)) dots.push(toVec(lat, lon));
    }
  }
  return dots;
}

/**
 * Realistic dotted Earth on canvas: land traced from Natural Earth data,
 * lit from one side, with an atmosphere glow. Drag to spin it (with inertia);
 * it also turns as the page scrolls, and drifts back to face the marker
 * when left alone.
 */
export default function DottedGlobe({
  lat = 25.27,
  lon = 55.3,
  targets = GCC_CAPITALS,
  className,
}: DottedGlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const land = buildLandDots(1.25);
    const home = toVec(lat, lon);
    const arcs = targets.map(([la, lo], i) => ({ to: toVec(la, lo), phase: i / targets.length }));

    // Faint graticule every 30°
    const grid: Vec[] = [];
    for (let la = -60; la <= 60; la += 30) for (let lo = -180; lo < 180; lo += 2) grid.push(toVec(la, lo));
    for (let lo = -180; lo < 180; lo += 30) for (let la = -80; la <= 80; la += 2) grid.push(toVec(la, lo));

    // Light direction in view space (upper left, toward viewer)
    const L: Vec = (() => {
      const v: Vec = [-0.55, 0.55, 0.63];
      const n = Math.hypot(...v);
      return [v[0] / n, v[1] / n, v[2] / n];
    })();

    // View state: `spin` brings a longitude to the front, `tilt` a latitude to the middle.
    const restTilt = lat * DEG * 0.75;
    const view = { spin: lon * DEG, tilt: restTilt, vSpin: 0, vTilt: 0 };
    const drag = { active: false, id: -1, x: 0, y: 0, lastT: 0, releasedAt: -1e9 };

    let size = 0;
    let dpr = 1;
    let raf = 0;
    let visible = false;
    let last = performance.now();
    const start = last;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = wrap.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    };

    const rotate = (p: Vec): Vec => {
      const cs = Math.cos(view.spin);
      const sn = Math.sin(view.spin);
      const x1 = p[0] * cs - p[2] * sn;
      const z1 = p[0] * sn + p[2] * cs;
      const ct = Math.cos(view.tilt);
      const st = Math.sin(view.tilt);
      return [x1, p[1] * ct - z1 * st, p[1] * st + z1 * ct];
    };

    const slerp = (a: Vec, b: Vec, t: number, lift: number): Vec => {
      const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
      const om = Math.acos(dot) || 1e-6;
      const s0 = Math.sin((1 - t) * om) / Math.sin(om);
      const s1 = Math.sin(t * om) / Math.sin(om);
      const h = 1 + lift * Math.sin(Math.PI * t);
      return [(a[0] * s0 + b[0] * s1) * h, (a[1] * s0 + b[1] * s1) * h, (a[2] * s0 + b[2] * s1) * h];
    };

    /** -0.5..0.5 as the globe passes through the viewport. */
    const scrollPhase = () => {
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      return Math.max(-0.5, Math.min(0.5, (vh / 2 - (r.top + r.height / 2)) / (vh + r.height)));
    };

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = (now - start) / 1000;

      if (!drag.active) {
        // Inertia from a throw
        view.spin += view.vSpin * dt;
        view.tilt += view.vTilt * dt;
        const decay = Math.exp(-dt * 2.2);
        view.vSpin *= decay;
        view.vTilt *= decay;

        // After a pause, drift back to face the marker (plus scroll turn and a slow sway).
        const idle = (now - drag.releasedAt) / 1000;
        if (idle > 2.2 && !reduce) {
          const sway = Math.sin(t * 0.15) * 0.35;
          const targetSpin = lon * DEG + sway + scrollPhase() * 1.6;
          // shortest way round
          let d = targetSpin - view.spin;
          d = Math.atan2(Math.sin(d), Math.cos(d));
          const k = 1 - Math.exp(-dt * 1.4);
          view.spin += d * k;
          view.tilt += (restTilt - view.tilt) * k;
        }
      }
      view.tilt = Math.max(-1.1, Math.min(1.1, view.tilt));
      draw(t);
    };

    const draw = (t: number) => {
      const R = size * 0.42;
      const cx = size / 2;
      const cy = size / 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // Atmosphere
      const atm = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.22);
      atm.addColorStop(0, "rgba(59,130,246,0.38)");
      atm.addColorStop(0.35, "rgba(59,130,246,0.12)");
      atm.addColorStop(1, "rgba(59,130,246,0)");
      ctx.fillStyle = atm;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2);
      ctx.fill();

      // Ocean body, lit from the upper left
      const ocean = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.45, R * 0.05, cx, cy, R);
      ocean.addColorStop(0, "#16357a");
      ocean.addColorStop(0.45, "#0a1a40");
      ocean.addColorStop(1, "#030714");
      ctx.fillStyle = ocean;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Graticule
      ctx.fillStyle = "rgba(147,197,253,0.10)";
      for (const g of grid) {
        const q = rotate(g);
        if (q[2] <= 0) continue;
        ctx.fillRect(cx + q[0] * R - 0.4, cy - q[1] * R - 0.4, 0.8, 0.8);
      }

      // Land, shaded by the light and shrinking toward the limb
      const base = Math.max(1.1, R / 120);
      for (const p of land) {
        const q = rotate(p);
        if (q[2] <= 0.02) continue;
        const lit = Math.max(0, q[0] * L[0] + q[1] * L[1] + q[2] * L[2]);
        const b = 0.28 + 0.72 * lit;
        const s = base * (0.55 + 0.45 * q[2]);
        const r = Math.round(150 + 90 * b);
        const gg = Math.round(175 + 70 * b);
        ctx.fillStyle = `rgba(${r},${gg},255,${(0.35 + 0.6 * b).toFixed(3)})`;
        ctx.fillRect(cx + q[0] * R - s / 2, cy - q[1] * R - s / 2, s, s);
      }

      // Terminator: darken the side away from the light
      const shade = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      shade.addColorStop(0, "rgba(1,3,10,0)");
      shade.addColorStop(0.55, "rgba(1,3,10,0)");
      shade.addColorStop(1, "rgba(1,3,10,0.55)");
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Rim light
      ctx.strokeStyle = "rgba(96,165,250,0.35)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // Arcs from the marker to each target
      for (const arc of arcs) {
        const cycle = (((reduce ? 0.6 : t * 0.35) + arc.phase) % 1 + 1) % 1;
        const head = Math.min(1, cycle * 1.5);
        const tail = Math.max(0, head - 0.6);
        ctx.beginPath();
        let started = false;
        for (let s = tail; s <= head + 1e-6; s += 0.04) {
          const q = rotate(slerp(home, arc.to, s, 0.12));
          if (q[2] < 0) {
            started = false;
            continue;
          }
          const px = cx + q[0] * R;
          const py = cy - q[1] * R;
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else ctx.lineTo(px, py);
        }
        const fade = 1 - Math.max(0, cycle - 0.66) / 0.34;
        ctx.strokeStyle = `rgba(147,197,253,${(0.95 * fade).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const end = rotate(arc.to);
        if (end[2] > 0) {
          ctx.fillStyle = "rgba(147,197,253,0.9)";
          ctx.beginPath();
          ctx.arc(cx + end[0] * R, cy - end[1] * R, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Marker with pulse rings
      const m = rotate(home);
      if (m[2] > 0) {
        const mx = cx + m[0] * R;
        const my = cy - m[1] * R;
        for (let k = 0; k < 3; k++) {
          const ph = reduce ? 0.4 : (t * 0.6 + k / 3) % 1;
          ctx.strokeStyle = `rgba(59,130,246,${(0.75 * (1 - ph)).toFixed(3)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(mx, my, 4 + ph * 24, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = "#3b82f6";
        ctx.shadowColor = "#3b82f6";
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(mx, my, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(mx, my, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      step(now);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };
    const wake = () => {
      if (!raf && visible) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    // ——— Drag to rotate ———
    const perPixel = () => 1 / Math.max(120, size * 0.42);
    const onDown = (e: PointerEvent) => {
      drag.active = true;
      drag.id = e.pointerId;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.lastT = performance.now();
      view.vSpin = 0;
      view.vTilt = 0;
      canvas.style.cursor = "grabbing";
      wake();
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.active || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      // On touch, let vertical swipes scroll the page.
      if (e.pointerType !== "mouse" && Math.abs(dy) > Math.abs(dx) * 1.2 && Math.abs(view.vSpin) < 0.01) {
        drag.active = false;
        canvas.style.cursor = "grab";
        return;
      }
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      const now = performance.now();
      const dt = Math.max(0.001, (now - drag.lastT) / 1000);
      const k = perPixel();
      view.spin -= dx * k;
      view.tilt += dy * k;
      view.vSpin = (-dx * k) / dt;
      view.vTilt = (dy * k) / dt;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.lastT = now;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== drag.id) return;
      if (drag.active && performance.now() - drag.lastT > 80) {
        view.vSpin = 0;
        view.vTilt = 0;
      }
      view.vSpin = Math.max(-8, Math.min(8, view.vSpin));
      view.vTilt = Math.max(-4, Math.min(4, view.vTilt));
      drag.active = false;
      drag.releasedAt = performance.now();
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    resize();
    draw(0);

    const ro = new ResizeObserver(() => {
      resize();
      draw((performance.now() - start) / 1000);
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [lat, lon, targets]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Globe showing our headquarters in Dubai"
        className="block"
        style={{ cursor: "grab", touchAction: "pan-y" }}
      />
    </div>
  );
}
