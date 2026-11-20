import { ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { Monitor, Target, Globe, Users } from "lucide-react";
import Loading from "../Loader/loader";
import { Reveal } from "../Motion/Reveal";
import { useMediaQuery, useWhyUs } from "../../../Hooks/useSiteContent";

const icons = [Monitor, Target, Globe, Users];
const GAP = 20;

type Feature = { icon: ReactNode; title: string; description: string };

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-white/10 bg-[var(--bg-card)] p-4 transition-colors duration-500 hover:border-[var(--blue)]/60 sm:rounded-[1.75rem] sm:p-8">
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-[var(--blue)]/0 blur-3xl transition-colors duration-700 group-hover:bg-[var(--blue)]/30" />
      <div className="relative mb-5 flex items-center justify-between sm:mb-10">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--blue)] text-white shadow-[0_0_30px_-4px_var(--blue)] sm:h-12 sm:w-12">
          {feature.icon}
        </div>
        <span className="font-display text-[10px] text-[var(--text-faint)] sm:text-xs">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-display relative text-[9.5px] leading-snug text-white min-[360px]:text-[11px] sm:text-base lg:text-lg">
        {feature.title}
      </h3>
      <p className="relative mt-2 flex-1 text-[12px] leading-relaxed text-[var(--text-dim)] sm:mt-4 sm:text-[0.95rem]">
        {feature.description}
      </p>
    </div>
  );
}

/**
 * Card that starts piled in the middle of the grid (rotated) and flies out to
 * its own slot as `progress` advances.
 */
function SpreadCard({
  feature,
  index,
  cols,
  rows,
  progress,
}: {
  feature: Feature;
  index: number;
  cols: number;
  rows: number;
  progress: MotionValue<number>;
}) {
  const col = index % cols;
  const row = Math.floor(index / cols);
  const dx = (cols - 1) / 2 - col; // steps toward the centre column
  const dy = (rows - 1) / 2 - row;
  const tilt = [-8, 5, -3, 7][index % 4];

  const t = useTransform(progress, [0.08 + index * 0.04, 0.55 + index * 0.04], [1, 0], {
    clamp: true,
  });
  const x = useTransform(t, (v) => `calc(${dx * v * 100}% + ${dx * v * GAP}px)`);
  const y = useTransform(t, (v) => `calc(${dy * v * 100}% + ${dy * v * GAP}px)`);
  const rotate = useTransform(t, [0, 1], [0, tilt]);
  const scale = useTransform(t, [0, 1], [1, 0.82]);

  return (
    <motion.div style={{ x, y, rotate, scale, zIndex: 10 - index }} className="h-full">
      <FeatureCard feature={feature} index={index} />
    </motion.div>
  );
}

const WhyChooseUsComponent = () => {
  const { whyUs, isLoading } = useWhyUs();
  const isLg = useMediaQuery("(min-width: 1024px)");
  // The pinned fly-out needs room; short screens (e.g. landscape phones) get the simple grid.
  const canPin = useMediaQuery("(min-width: 768px) and (min-height: 640px)");

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const headingScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0.3, 1]);

  if (isLoading) {
    return <Loading />;
  }

  const features: Feature[] = whyUs.slice(0, 4).map((item, index) => {
    const Icon = icons[index] ?? icons[0];
    return { icon: <Icon className="h-5 w-5" />, title: item.title, description: item.description };
  });

  const heading = (
    <>
      <p className="eyebrow mb-5">Why us</p>
      <h2 className="section-title">
        Why <span className="text-blue">choose us?</span>
      </h2>
    </>
  );

  // Phones and short screens: simple staggered reveal, no pinning.
  if (!canPin) {
    return (
      <section ref={ref} id="why-us" className="relative bg-[var(--bg)] py-20 sm:py-24">
        <div className="shell">
          <Reveal variant="up" className="mb-8 sm:mb-12">
            {heading}
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {features.map((feature, i) => (
              <Reveal key={feature.title} variant="up" delay={i * 0.05} className="h-full">
                <FeatureCard feature={feature} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const cols = isLg ? 4 : 2;
  const rows = Math.ceil(features.length / cols);

  return (
    <section ref={ref} id="why-us" className="relative h-[260vh] bg-[var(--bg)]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="shell relative">
          <motion.div
            style={{ scale: headingScale, opacity: headingOpacity }}
            className="mb-10 origin-left lg:mb-14"
          >
            {heading}
          </motion.div>
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: GAP }}
          >
            {features.map((feature, i) => (
              <SpreadCard
                key={feature.title}
                feature={feature}
                index={i}
                cols={cols}
                rows={rows}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsComponent;
