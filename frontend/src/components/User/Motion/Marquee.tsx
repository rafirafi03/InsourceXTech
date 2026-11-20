import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  speed?: number;
  tone?: "dark" | "blue";
  tilt?: number;
};

/**
 * Infinite ticker strip with ✦ separators. The strip also drifts a little
 * with page scroll so it feels attached to the scroll.
 */
export default function Marquee({
  items,
  reverse = false,
  speed = 40,
  tone = "dark",
  tilt = 0,
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], reverse ? ["-8%", "0%"] : ["0%", "-8%"]);

  if (items.length === 0) return null;

  // Repeat enough to fill wide screens, then double for the seamless loop.
  const row = Array.from({ length: Math.max(2, Math.ceil(8 / items.length)) }, () => items).flat();

  const isBlue = tone === "blue";

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden border-y py-5 sm:py-6 ${
        isBlue ? "border-blue-400/30 bg-[var(--blue)]" : "border-white/10 bg-[var(--bg)]"
      }`}
      style={{ transform: tilt ? `rotate(${tilt}deg) scale(1.04)` : undefined }}
      aria-hidden
    >
      <motion.div style={{ x: drift }}>
        <div
          className="marquee"
          data-reverse={reverse}
          style={{ ["--marquee-speed" as string]: `${speed}s` }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {row.map((item, i) => (
                <span key={`${copy}-${i}`} className="flex items-center">
                  <span className="font-display mx-6 whitespace-nowrap text-base text-white sm:mx-10 sm:text-xl md:text-2xl">
                    {item}
                  </span>
                  <span className={isBlue ? "text-[var(--bg)]" : "text-[var(--blue)]"}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
