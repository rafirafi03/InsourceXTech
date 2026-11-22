import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import Loader from "../Loader/loader";
import CircularCarousel from "../Motion/CircularCarousel";
import { useMediaQuery, useSolutions } from "../../../Hooks/useSiteContent";
import { solutionImage } from "../../../data/solutionImages";
import { useTheme } from "../../../Hooks/useTheme";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Solutions() {
  const { solutions, isLoading } = useSolutions();
  const isNarrow = useMediaQuery("(max-width: 767px)");
  const theme = useTheme();


  const stageRef = useRef<HTMLDivElement>(null);
  // Mount the ring only once it is near the viewport so its entrance is seen.
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
            Drag to explore
          </p>
        </motion.div>
      </div>

      <div
        ref={stageRef}
        className="relative mt-4 h-[400px] w-full sm:mt-10 sm:h-[560px] lg:h-[620px]"
      >
        {/* Round ring. A long camera distance (perspective) keeps every card the same
            height and size; cards only narrow slightly as they turn away. */}
        {inView && (
          <CircularCarousel
            items={items}
            preset="cylinder"
            intro="rise"
            cardWidth={isNarrow ? 200 : 320}
            aspectRatio={isNarrow ? 0.6 : 0.8}
            gap={isNarrow ? 14 : 30}
            perspective={isNarrow ? 7000 : 9000}
            tilt={-4}
            speed={12}
            fadeColor={theme === "light" ? "#ffffff" : "#01030a"}
            depthFade={0.7}
            innerShade={0.35}
            cornerRadius={18}
            parallax={0.35}
            captions
          />
        )}
      </div>
    </section>
  );
}
