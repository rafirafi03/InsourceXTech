import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import Loader from "../Loader/loader";
import CircularCarousel from "../Motion/CircularCarousel";
import { useMediaQuery, useSolutions } from "../../../Hooks/useSiteContent";

const ease = [0.16, 1, 0.3, 1] as const;

// Portrait 4:5 artwork made for the ring (public/solutionimages, 800x1000 WebP).
// Solutions without one here keep their original image.
const LOCAL_IMAGES: Record<string, string> = {
  "meeting solution": "/solutionimages/meetingsolution.webp",
  "wifi solution": "/solutionimages/wifisolution.webp",
  "telephonic solution": "/solutionimages/telephonicsolution.webp",
  "structure cabling": "/solutionimages/sructurecablingsolution.webp",
  "microsoft software licensing": "/solutionimages/microsoft_software_licensing_solution.webp",
};

const localImage = (title: string) => LOCAL_IMAGES[title.trim().toLowerCase()];

export default function Solutions() {
  const { solutions, isLoading } = useSolutions();
  const isNarrow = useMediaQuery("(max-width: 767px)");

  const stageRef = useRef<HTMLDivElement>(null);
  // Mount the ring only once it is near the viewport so its entrance is seen.
  const inView = useInView(stageRef, { once: true, margin: "0px 0px -20% 0px" });

  const items = useMemo(
    () =>
      solutions.map((item) => ({
        src: localImage(item.title) ?? item.image,
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
      className="relative overflow-hidden border-t border-white/[0.06] bg-[var(--bg)] py-24 sm:py-32"
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
            <p className="eyebrow mb-5">Portfolio</p>
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
        className="relative mt-4 h-[380px] w-full sm:mt-10 sm:h-[600px] lg:h-[660px]"
      >
        {inView && (
          <CircularCarousel
            items={items}
            preset="cylinder"
            intro="rise"
            cardWidth={isNarrow ? 200 : 320}
            aspectRatio={isNarrow ? 0.6 : 0.8}
            gap={isNarrow ? 14 : 30}
            speed={12}
            fadeColor="#01030a"
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
