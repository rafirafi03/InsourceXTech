import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * Custom arrow cursor that follows the mouse on a spring and turns to point
 * the way it is moving.
 *
 * It only replaces the plain cursor. Anything that asks for a real cursor
 * (links and buttons -> pointer, text fields -> I-beam, the carousel -> grab)
 * shows the native one, and the arrow steps aside so it's always clear what
 * can be clicked. The rules live in index.css under `.has-arrow-cursor`.
 */
export default function ArrowCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [native, setNative] = useState(false);

  const spring = { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const rotate = useSpring(0, { ...spring, damping: 60, stiffness: 300 });
  const scale = useSpring(1, { ...spring, stiffness: 500, damping: 35 });

  // Only on devices with a real mouse.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-arrow-cursor");

    let last = { x: 0, y: 0, t: performance.now() };
    let heading = 0; // last direction in degrees
    let total = 0; // accumulated rotation, so the spring never spins the long way round
    let first = true;
    let settleTimer = 0;
    let frame = 0;
    let pending: MouseEvent | null = null;

    const apply = () => {
      frame = 0;
      const e = pending;
      if (!e) return;
      pending = null;

      if (first) {
        x.jump(e.clientX);
        y.jump(e.clientY);
        first = false;
      } else {
        x.set(e.clientX);
        y.set(e.clientY);
      }

      // Hide the arrow wherever the page shows a native cursor (pointer, text, grab...).
      const target = e.target as Element | null;
      const wanted = target ? getComputedStyle(target).cursor : "none";
      setNative(wanted !== "none");
      setVisible(true);

      const now = performance.now();
      const dt = now - last.t;
      if (dt > 0) {
        const vx = (e.clientX - last.x) / dt;
        const vy = (e.clientY - last.y) / dt;
        if (Math.hypot(vx, vy) > 0.1) {
          const angle = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
          let delta = angle - heading;
          if (delta > 180) delta -= 360;
          if (delta < -180) delta += 360;
          total += delta;
          heading = angle;
          rotate.set(total);
          scale.set(0.92);
          window.clearTimeout(settleTimer);
          settleTimer = window.setTimeout(() => scale.set(1), 150);
        }
      }
      last = { x: e.clientX, y: e.clientY, t: now };
    };

    const onMove = (e: MouseEvent) => {
      pending = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => setVisible(false);
    const onDown = () => scale.set(0.8);
    const onUp = () => scale.set(1);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      root.classList.remove("has-arrow-cursor");
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled, x, y, rotate, scale]);

  if (!enabled) return null;

  const shown = visible && !native;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[2147483647]"
      style={{ x, y, translateX: "-50%", translateY: "-50%", rotate, scale }}
    >
      <motion.div
        initial={false}
        animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 0.4 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <svg
          width="26"
          height="28"
          viewBox="0 0 26 28"
          fill="none"
          style={{ filter: "drop-shadow(0 0 8px rgba(59,130,246,0.55))", display: "block" }}
        >
          {/* Navigation arrow pointing up; the wrapper rotates it toward the motion. */}
          <path
            d="M13 2.5c.5 0 .95.3 1.15.76l8.6 19.9c.42.98-.55 1.98-1.53 1.58L13.6 21.7a1.6 1.6 0 0 0-1.2 0l-7.62 3.04c-.98.4-1.95-.6-1.53-1.58l8.6-19.9c.2-.46.65-.76 1.15-.76Z"
            fill="#3b82f6"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
