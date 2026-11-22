import { CSSProperties, ReactNode, useRef } from "react";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { LightbulbIcon, CompassIcon, RotateCw } from "lucide-react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import Loader from "../Loader/loader";
import { Reveal } from "../Motion/Reveal";
import { useMediaQuery } from "../../../Hooks/useSiteContent";
import { useFitPin } from "../../../Hooks/useFitPin";

type Variant = "dark" | "blue";

const faceBase: CSSProperties = {
  gridArea: "1 / 1",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

const surface = (variant: Variant) =>
  variant === "blue"
    ? "keep-light border-blue-400/40 bg-[linear-gradient(135deg,#1d4ed8_0%,#2563eb_45%,#0b2a6b_100%)]"
    : "border-white/10 bg-[var(--bg-card)]";

function Glow({ variant }: { variant: Variant }) {
  return (
    <div
      className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl ${
        variant === "blue" ? "bg-white/20" : "bg-[var(--blue)]/25"
      }`}
    />
  );
}

type FlipCardProps = {
  index: number;
  icon: ReactNode;
  title: string;
  text: string;
  variant: Variant;
  /** Shared scroll progress (pinned desktop layout). Falls back to the card's own scroll. */
  progress?: MotionValue<number>;
  /** Part of `progress` over which this card flips. */
  range: [number, number];
};

/**
 * Card with a front (number, icon, title) and a back (the full text) that
 * flips over in 3D as the page scrolls. Scrolling back flips it back.
 */
function FlipCard({ index, icon, title, text, variant, progress, range }: FlipCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // On phones each card drives its own flip as it crosses the screen.
  const { scrollYProgress: own } = useScroll({ target: ref, offset: ["start 85%", "center 50%"] });
  const source = progress ?? own;

  const raw = useTransform(source, range, [0, 180], { clamp: true });
  const rotateY = useSpring(raw, { stiffness: 110, damping: 20, mass: 0.8 });
  const lift = useTransform(rotateY, [0, 90, 180], [1, 1.05, 1]);
  const shadow = useTransform(
    rotateY,
    [0, 90, 180],
    [
      "0 20px 60px -30px rgba(0,0,0,0.8)",
      "0 50px 100px -30px rgba(59,130,246,0.45)",
      "0 20px 60px -30px rgba(0,0,0,0.8)",
    ]
  );

  const isBlue = variant === "blue";
  const number = String(index + 1).padStart(2, "0");

  return (
    <div ref={ref} style={{ perspective: 1600 }} className="h-full">
      <motion.div
        style={
          reduce
            ? { rotateY: 180, transformStyle: "preserve-3d" }
            : { rotateY, scale: lift, boxShadow: shadow, transformStyle: "preserve-3d" }
        }
        className="relative grid h-full rounded-[1.25rem] sm:rounded-[2rem]"
      >
        {/* Front */}
        <div
          aria-hidden
          style={faceBase}
          className={`relative flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-[1.25rem] border p-4 sm:min-h-[20rem] sm:rounded-[2rem] sm:p-10 ${surface(
            variant
          )}`}
        >
          <Glow variant={variant} />
          <div className="relative flex items-start justify-between">
            <span
              className={`font-display text-[2.6rem] leading-none sm:text-[6rem] ${
                isBlue ? "text-white/25" : "text-outline"
              }`}
            >
              {number}
            </span>
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full sm:h-14 sm:w-14 ${
                isBlue ? "bg-white text-[var(--blue-deep)]" : "bg-[var(--blue)] text-white"
              }`}
            >
              {icon}
            </span>
          </div>
          <div className="relative">
            <h3 className="font-display text-sm leading-tight text-white sm:text-3xl lg:text-5xl">{title}</h3>
            <p
              className={`mt-3 flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.2em] sm:mt-4 sm:gap-2 sm:text-[10px] sm:tracking-[0.3em] ${
                isBlue ? "text-white/70" : "text-[var(--text-faint)]"
              }`}
            >
              <RotateCw size={12} />
              Keep scrolling
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          style={{ ...faceBase, transform: "rotateY(180deg)" }}
          className={`relative flex min-h-[15rem] flex-col overflow-hidden rounded-[1.25rem] border p-4 sm:min-h-[20rem] sm:rounded-[2rem] sm:p-10 ${surface(
            variant
          )}`}
        >
          <Glow variant={variant} />
          <div className="relative mb-3 flex items-center gap-2 sm:mb-6 sm:gap-4">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full sm:h-11 sm:w-11 ${
                isBlue ? "bg-white text-[var(--blue-deep)]" : "bg-[var(--blue)] text-white"
              }`}
            >
              {icon}
            </span>
            <span
              className={`font-display text-xs tracking-[0.3em] ${
                isBlue ? "text-white/70" : "text-[var(--blue-bright)]"
              }`}
            >
              {number}
            </span>
          </div>
          <h3 className="font-display relative text-xs text-white sm:text-2xl lg:text-3xl">{title}</h3>
          <p
            className={`relative mt-2 text-[11.5px] leading-relaxed sm:mt-5 sm:text-base xl:text-lg xl:leading-relaxed ${
              isBlue ? "text-white/85" : "text-[var(--text-dim)]"
            }`}
          >
            {text}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

const MissionVisionComponent = () => {
  const { data, isLoading } = useSelector((state: RootState) => state.about);
  const about = data?.aboutCompany;
  const isWide = useMediaQuery("(min-width: 1024px)");

  // Desktop: pinned panel fits its content; 160svh of scroll drives the flips (same as before).
  const { pinRef, panelRef, pinStyle, panelStyle } = useFitPin("160svh", "260vh", isWide && !isLoading);
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ["start start", "end end"] });

  if (isLoading) {
    return <Loader />;
  }

  const cards = [
    {
      title: "Our Vision",
      text: about?.vision?.trim() ?? "",
      icon: <LightbulbIcon className="h-4 w-4 sm:h-6 sm:w-6" />,
      variant: "dark" as const,
    },
    {
      title: "Our Mission",
      text: about?.mission?.trim() ?? "",
      icon: <CompassIcon className="h-4 w-4 sm:h-6 sm:w-6" />,
      variant: "blue" as const,
    },
  ];

  // Desktop: pin the section and flip Vision, then Mission, as you scroll.
  const ranges: [number, number][] = isWide
    ? [
        [0.1, 0.45],
        [0.35, 0.7],
      ]
    : [
        [0, 0.85],
        [0.15, 1],
      ];

  return (
    <section id="mission" className="relative bg-[var(--bg)]">
      <div ref={pinRef} className="relative" style={pinStyle}>
        <div ref={panelRef} className="py-14 sm:py-20" style={panelStyle}>
          <div className="glow-orb left-1/2 top-1/2 h-[30rem] w-[50rem] max-w-full -translate-x-1/2 -translate-y-1/2 opacity-30" />
          <div className="shell relative">
            <Reveal variant="up" className="mb-10 lg:mb-12">
              <h2 className="section-title">
                Vision & <span className="text-blue">mission</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-6 lg:gap-8">
              {cards.map((card, i) => (
                <FlipCard
                  key={card.title}
                  index={i}
                  progress={isWide ? scrollYProgress : undefined}
                  range={ranges[i]}
                  {...card}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionComponent;
