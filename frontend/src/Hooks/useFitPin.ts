import { CSSProperties, useLayoutEffect, useRef, useState } from "react";

/**
 * Pinned panel that is only as tall as its content (no blank screen above or
 * below it). While pinned it sits centred on screen, never under the header.
 * The section stays pinned for `runway` of extra scroll, so scroll-driven
 * animations keep the same pace they had with a full-screen panel.
 *
 * Usage: put `pinRef` + `pinStyle` on the tall outer wrapper (also use it as
 * the useScroll target), and `panelRef` + `panelStyle` on the sticky child.
 */
export function useFitPin<P extends HTMLElement = HTMLDivElement, Q extends HTMLElement = HTMLDivElement>(
  runway: string,
  fallbackHeight: string,
  enabled = true
) {
  const pinRef = useRef<P>(null);
  const panelRef = useRef<Q>(null);
  const [panelHeight, setPanelHeight] = useState(0);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || !enabled) return;
    const measure = () => setPanelHeight(panel.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(panel);
    return () => ro.disconnect();
  }, [enabled]);

  const pinStyle: CSSProperties | undefined = enabled
    ? { height: panelHeight ? `calc(${panelHeight}px + ${runway})` : fallbackHeight }
    : undefined;

  const panelStyle: CSSProperties | undefined = enabled
    ? { position: "sticky", top: `max(4.5rem, calc(50svh - ${panelHeight / 2}px))` }
    : undefined;

  return { pinRef, panelRef, pinStyle, panelStyle };
}
