import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export let lenisInstance: Lenis | null = null;

type SmoothScrollProps = {
  children: ReactNode;
};

function shouldEnableLenis() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  // Native touch scroll feels smoother on phones/tablets; Lenis often "sticks" at the top.
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  if (window.matchMedia("(max-width: 1023px)").matches) return false;
  return true;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    if (!shouldEnableLenis()) {
      lenisInstance = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.2,
    });

    lenisInstance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onChange = () => {
      if (!shouldEnableLenis()) {
        cancelAnimationFrame(frame);
        lenis.destroy();
        lenisInstance = null;
      }
    };

    const mqTouch = window.matchMedia("(pointer: coarse)");
    const mqWidth = window.matchMedia("(max-width: 1023px)");
    mqTouch.addEventListener("change", onChange);
    mqWidth.addEventListener("change", onChange);

    return () => {
      mqTouch.removeEventListener("change", onChange);
      mqWidth.removeEventListener("change", onChange);
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
