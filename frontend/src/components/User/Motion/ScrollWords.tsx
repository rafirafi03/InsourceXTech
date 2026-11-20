import { ElementType, useRef } from "react";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type WordProps = {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
};

/**
 * One word that goes from dim, blurred and tilted back to crisp white as
 * `progress` moves through `range`.
 */
function Word({ word, progress, range }: WordProps) {
  const p = useTransform(progress, range, [0, 1], { clamp: true });
  const color = useTransform(p, [0, 1], ["rgba(255,255,255,0.1)", "rgba(255,255,255,1)"]);
  const filter = useTransform(p, (v) => `blur(${(8 * Math.pow(1 - v, 1.5)).toFixed(2)}px)`);
  const rotateX = useTransform(p, [0, 1], [-60, 0]);
  const rotate = useTransform(p, [0, 1], [5, 0]);
  const y = useTransform(p, [0, 1], [28, 0]);

  return (
    <span className="mr-[0.25em] inline-block" style={{ perspective: 800 }}>
      <motion.span
        className="inline-block will-change-transform"
        style={{ color, filter, rotateX, rotate, y, transformOrigin: "bottom center" }}
      >
        {word}
      </motion.span>
    </span>
  );
}

type ScrollWordsProps = {
  text: string;
  className?: string;
  as?: ElementType;
  /** Drive the reveal from an external progress (e.g. a pinned section). */
  progress?: MotionValue<number>;
  /** Portion of `progress` used by the reveal. */
  span?: [number, number];
};

/**
 * Word-by-word reveal scrubbed by scroll position.
 */
export default function ScrollWords({
  text,
  className,
  as: Tag = "p",
  progress,
  span = [0, 1],
}: ScrollWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });

  const words = text.trim().split(/\s+/);
  const source = progress ?? scrollYProgress;

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  const [start, end] = span;
  const total = end - start;
  // Each word fades in over a short window that overlaps the next words.
  const windowSize = Math.min(0.25, 6 / words.length) * total;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        const wStart = start + (i / words.length) * (total - windowSize);
        return (
          <Word
            key={`${word}-${i}`}
            word={word}
            progress={source}
            range={[wStart, wStart + windowSize]}
          />
        );
      })}
    </Tag>
  );
}
