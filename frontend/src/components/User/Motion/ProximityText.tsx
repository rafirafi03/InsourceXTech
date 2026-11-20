import { ElementType, Fragment, HTMLAttributes, ReactNode, useEffect, useRef } from "react";

/**
 * Splits text into letters for <ProximityHeadline>. Words stay unbroken;
 * lines can still wrap between them. `accent` marks letters that rest in blue.
 */
export function ProximityWords({ text, accent = false }: { text: string; accent?: boolean }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, w) => (
        // Space lives outside the inline-block, where the browser keeps it.
        <Fragment key={w}>
          {w > 0 && " "}
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((ch, i) => (
              <span key={i} data-prox={accent ? "accent" : ""} className="inline-block">
                {ch}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </>
  );
}

type ProximityHeadlineProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Influence radius as a multiple of the font size. */
  radius?: number;
};

// Resting and "under the lens" values for the variable font axes and colours.
const REST = { wght: 800, wdth: 100 };
const LENS = { wght: 260, wdth: 78 };
const WHITE: [number, number, number] = [245, 247, 251];
const BLUE: [number, number, number] = [59, 130, 246];
const BLUE_LIGHT: [number, number, number] = [147, 197, 253];

const mix = (a: [number, number, number], b: [number, number, number], t: number) =>
  `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)}, ${Math.round(a[1] + (b[1] - a[1]) * t)}, ${Math.round(
    a[2] + (b[2] - a[2]) * t
  )})`;

/**
 * Headline whose letters react to the cursor: the ones nearest it thin out,
 * narrow, lift slightly and turn blue, easing back as the cursor moves on.
 * Uses the variable weight/width axes of the hero font. Mouse only.
 */
export default function ProximityHeadline({
  as: Tag = "h1",
  className,
  children,
  radius = 1.7,
  ...rest
}: ProximityHeadlineProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const chars = Array.from(root.querySelectorAll<HTMLElement>("[data-prox]"));
    const amount = new Float32Array(chars.length);
    const pointer = { x: -1e6, y: -1e6, inside: false };
    let raf = 0;

    const apply = (el: HTMLElement, t: number) => {
      const accent = el.dataset.prox === "accent";
      el.style.fontVariationSettings = `"wght" ${(REST.wght + (LENS.wght - REST.wght) * t).toFixed(
        1
      )}, "wdth" ${(REST.wdth + (LENS.wdth - REST.wdth) * t).toFixed(1)}`;
      el.style.transform = t > 0.001 ? `translateY(${(-0.06 * t).toFixed(3)}em)` : "";
      el.style.color = t > 0.001 ? (accent ? mix(BLUE, BLUE_LIGHT, t) : mix(WHITE, BLUE, t)) : "";
    };

    const frame = () => {
      raf = 0;
      const size = parseFloat(getComputedStyle(root).fontSize) || 80;
      const reach = size * radius;
      // Read every letter's position first, then write, to avoid layout thrash.
      const targets = chars.map((el) => {
        if (!pointer.inside) return 0;
        const r = el.getBoundingClientRect();
        const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / reach);
        return t * t * (3 - 2 * t); // smoothstep falloff
      });
      let moving = false;
      chars.forEach((el, i) => {
        const next = amount[i] + (targets[i] - amount[i]) * 0.18;
        const settled = Math.abs(targets[i] - next) < 0.002;
        amount[i] = settled ? targets[i] : next;
        if (!settled) moving = true;
        apply(el, amount[i]);
      });
      if (moving || pointer.inside) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const box = root.getBoundingClientRect();
      const pad = (parseFloat(getComputedStyle(root).fontSize) || 80) * 0.8;
      const inside =
        e.clientX > box.left - pad &&
        e.clientX < box.right + pad &&
        e.clientY > box.top - pad &&
        e.clientY < box.bottom + pad;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (inside || pointer.inside) {
        pointer.inside = inside;
        wake();
      }
    };
    const onLeave = () => {
      pointer.inside = false;
      wake();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      chars.forEach((el) => {
        el.style.fontVariationSettings = "";
        el.style.transform = "";
        el.style.color = "";
      });
    };
  }, [radius]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
