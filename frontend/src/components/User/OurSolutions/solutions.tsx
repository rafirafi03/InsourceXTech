import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import Loader from "../Loader/loader";
import FlexCarousel from "../Motion/FlexCarousel";
import { useMediaQuery, useSolutions } from "../../../Hooks/useSiteContent";
import { solutionImage } from "../../../data/solutionImages";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Solutions() {
  const { solutions, isLoading } = useSolutions();
  const isNarrow = useMediaQuery("(max-width: 767px)");
  const isShort = useMediaQuery("(max-height: 560px)");

  const stageRef = useRef<HTMLDivElement>(null);
  // Mount the carousel only once it is near the viewport so its entrance is seen.
  const inView = useInView(stageRef, { once: true, margin: "0px 0px -20% 0px" });

  const items = useMemo(
    () =>
      solutions.map((item) => ({
        src: solutionImage(item.title) ?? item.image,
        alt: item.title,
        title: item.title,
      })),
    [solutions]
  );

  if (isLoading) return <Loader />;
  if (items.length === 0) return null;

  return (
    <section
      id="solutions"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[var(--bg)] py-14 sm:py-20 lg:py-24 xl:py-32"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="glow-orb left-1/2 top-[55%] h-[30rem] w-[56rem] max-w-full -translate-x-1/2 -translate-y-1/2 opacity-50" />

      <div className="shell relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <h2 className="section-title">
              Our <span className="text-blue">solutions</span>
            </h2>
          </div>
          <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--text-faint)]">
            <MoveHorizontal size={16} className="text-[var(--blue)]" />
            Drag or click to explore
          </p>
        </motion.div>
      </div>

      <div
        ref={stageRef}
        className="relative mt-2 h-[400px] w-full sm:mt-10 sm:h-[560px] lg:h-[min(660px,80svh)] [@media(max-height:560px)]:h-[86svh]"
      >
        {inView && (
          <FlexCarousel
            items={items}
            preset="liquid"
            intro="rise"
            fit="portrait"
            cardHeight={isShort ? 0.5 : isNarrow ? 0.6 : 0.64}
            gap={isNarrow ? 10 : 16}
            radius={isNarrow ? 14 : 20}
            squeeze={0.2}
            autoplay
            interval={3.5}
            focusOnClick
            captions
            captureWheel={false}
          />
        )}
      </div>
    </section>
  );
}
