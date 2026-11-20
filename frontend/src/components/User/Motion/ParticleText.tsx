import { useEffect, useRef } from "react";

type Particle = {
  hx: number; // home position
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  blue: boolean;
};

type ParticleTextProps = {
  text: string;
  className?: string;
};

const FONT_FAMILY = "Syncopate";

/**
 * Text drawn as particles on a canvas. Particles assemble when scrolled into
 * view, scatter away from the pointer, and spring back to their letters.
 */
export default function ParticleText({ text, className }: ParticleTextProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let visible = false;
    let disposed = false;
    const pointer = { x: -9999, y: -9999, active: false };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = wrap.clientWidth;
      // Height follows the width so the word always fills the row.
      const fontSize = Math.min(width / (text.length * 0.98), 220);
      height = Math.round(fontSize * 1.5);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Render the word off-screen, then sample its pixels.
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `700 ${fontSize}px ${FONT_FAMILY}, sans-serif`;
      octx.fillText(text, width / 2, height / 2);

      const data = octx.getImageData(0, 0, width, height).data;
      const gap = width < 640 ? 3 : width < 1100 ? 4 : 5;
      const next: Particle[] = [];
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          if (data[(y * width + x) * 4 + 3] > 128) {
            next.push({
              hx: x,
              hy: y,
              // Start scattered; they fly home once the section is visible.
              x: reduce ? x : Math.random() * width,
              y: reduce ? y : Math.random() * height,
              vx: 0,
              vy: 0,
              size: gap * (0.55 + Math.random() * 0.25),
              // Blue band sweeps through the middle of the word.
              blue: Math.random() < 0.12 + 0.5 * Math.max(0, 1 - Math.abs(x / width - 0.5) * 3.2),
            });
          }
        }
      }
      particles = next;
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#f5f7fb";
      for (const p of particles) if (!p.blue) ctx.fillRect(p.x, p.y, p.size, p.size);
      ctx.fillStyle = "#3b82f6";
      for (const p of particles) if (p.blue) ctx.fillRect(p.x, p.y, p.size, p.size);
    };

    const step = () => {
      const radius = Math.max(70, width * 0.07);
      const r2 = radius * radius;
      for (const p of particles) {
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const force = (1 - d / radius) * 6;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }
        // Spring back home with damping.
        p.vx += (p.hx - p.x) * 0.045;
        p.vy += (p.hy - p.y) * 0.045;
        p.vx *= 0.84;
        p.vy *= 0.84;
        p.x += p.vx;
        p.y += p.vy;
      }
      draw();
      if (visible && !disposed) frame = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduce) {
        draw();
        return;
      }
      frame = requestAnimationFrame(step);
    };

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = pointer.y = -9999;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else cancelAnimationFrame(frame);
      },
      { threshold: 0.15 }
    );

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (Math.abs(wrap.clientWidth - width) < 2) return;
        build();
        start();
      }, 120);
    });

    // Wait for the display font so the letters are sampled in the right shape.
    const fontReady = document.fonts
      ? document.fonts.load(`700 100px ${FONT_FAMILY}`).catch(() => undefined)
      : Promise.resolve();

    fontReady.then(() => {
      if (disposed) return;
      build();
      draw();
      io.observe(wrap);
      ro.observe(wrap);
    });

    canvas.addEventListener("pointermove", toLocal);
    canvas.addEventListener("pointerdown", toLocal);
    canvas.addEventListener("pointerleave", onLeave);
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") onLeave();
    };
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onLeave);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", toLocal);
      canvas.removeEventListener("pointerdown", toLocal);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onLeave);
    };
  }, [text]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={text}
        className="block cursor-crosshair"
        style={{ touchAction: "pan-y" }}
      />
    </div>
  );
}
