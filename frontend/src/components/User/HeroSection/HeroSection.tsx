import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { scrollHelper } from "../../../utils/scrollHelper";
import ProximityHeadline, { ProximityWords } from "../Motion/ProximityText";
import { useServices, useSolutions } from "../../../Hooks/useSiteContent";
import { solutionImage } from "../../../data/solutionImages";

const ease = [0.16, 1, 0.3, 1] as const;

// Intro timeline (seconds)
const T = { title: 0.15, copy: 0.55, cards: 0.6, strips: 0.85 };

/** A headline line that slides up out of a mask. */
function MaskLine({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block origin-bottom-left"
        initial={{ y: "115%", skewY: 7 }}
        animate={{ y: "0%", skewY: 0 }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Card that rises in and unmasks from the bottom. */
function Rise({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, clipPath: "inset(100% 0% 0% 0% round 28px)" }}
      animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 28px)" }}
      transition={{ duration: 1.1, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Tall angled service strip: vertical label on desktop, horizontal bar on smaller screens. */
function Strip({ label, index, delay }: { label: string; index: number; delay: number }) {
  const light = index % 2 === 1;
  return (
    <motion.button
      type="button"
      onClick={() => scrollHelper("services")}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 1, delay, ease }}
      className={`hero-strip group relative order-3 flex min-h-[3.75rem] origin-bottom items-center justify-between gap-2 overflow-hidden px-4 text-left text-white transition-[width,flex-basis,filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:brightness-110 lg:order-none lg:h-full lg:w-14 lg:shrink-0 lg:flex-col-reverse lg:justify-between lg:px-0 lg:py-6 lg:hover:w-24 ${
        light
          ? "bg-[linear-gradient(160deg,#7cc4f5_0%,#3b82f6_100%)]"
          : "bg-[linear-gradient(160deg,#1d4ed8_0%,#2563eb_55%,#60a5fa_100%)]"
      }`}
      aria-label={`${label}: view services`}
    >
      <span className="text-[13px] font-semibold capitalize leading-tight sm:text-sm lg:rotate-180 lg:text-[15px] lg:[writing-mode:vertical-rl]">
        {label.toLowerCase()}
      </span>
      <ArrowUpRight
        size={16}
        className="shrink-0 opacity-70 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
      />
    </motion.button>
  );
}

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const still = Boolean(reduce);

  const { services } = useServices();
  const { solutions } = useSolutions();

  // Strip labels: the four shortest service titles, kept in their original order.
  const strips = useMemo(() => {
    const short = [...services]
      .sort((a, b) => a.title.length - b.title.length)
      .slice(0, 4)
      .map((s) => s._id);
    return services.filter((s) => short.includes(s._id)).map((s) => s.title);
  }, [services]);

  // Chips: short solution names.
  const chips = useMemo(
    () => solutions.map((s) => s.title).filter((t) => t.length <= 20).slice(0, 6),
    [solutions]
  );

  // Feature card: solutions that have the new artwork.
  const featured = useMemo(
    () =>
      solutions
        .map((s) => ({ title: s.title, src: solutionImage(s.title) }))
        .filter((s): s is { title: string; src: string } => Boolean(s.src)),
    [solutions]
  );
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (featured.length < 2 || still) return;
    const id = window.setInterval(() => setSlide((i) => (i + 1) % featured.length), 3200);
    return () => window.clearInterval(id);
  }, [featured.length, still]);
  const current = featured[slide % Math.max(1, featured.length)];

  // Scroll: headline lifts away, bento trails slightly (parallax).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const headY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const bentoY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Pointer: the photo inside the big card drifts against the cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const photoX = useSpring(useTransform(mx, [-0.5, 0.5], [18, -18]), { stiffness: 80, damping: 20 });
  const photoY = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 80, damping: 20 });
  useEffect(() => {
    if (still || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, still]);

  return (
    <section
      ref={ref}
      id="home"
      className="hero-dots relative overflow-hidden bg-[var(--bg)] pt-28 pb-8 sm:pb-12 sm:pt-32 [@media(min-width:1024px)_and_(orientation:landscape)]:min-h-[100svh] lg:pb-10"
    >
      <div className="glow-orb -top-40 left-1/4 h-[30rem] w-[40rem] opacity-30" />

      <div className="shell relative">
        {/* ——— Headline row ——— */}
        <motion.div
          style={still ? undefined : { y: headY, opacity: headOpacity }}
          className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
        >
          <ProximityHeadline
            as="h1"
            aria-label="A new era of technology"
            className="font-hero relative text-[clamp(2.5rem,min(9.5vw,12svh),7.25rem)] leading-[0.92] text-white"
          >
            <MaskLine delay={T.title}>
              <span className="text-[var(--blue)]">
                <ProximityWords text="A NEW" accent />
              </span>{" "}
              <ProximityWords text="ERA" />
              <motion.span
                aria-hidden
                className="ml-1 inline-block align-top text-[0.28em] text-[var(--blue-bright)]"
                animate={still ? undefined : { rotate: 360, scale: [1, 1.25, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                ✦
              </motion.span>
            </MaskLine>
            <MaskLine delay={T.title + 0.12}>
              <span className="text-[var(--blue)]">
                <ProximityWords text="OF TECHNOLOGY" accent />
              </span>
            </MaskLine>
          </ProximityHeadline>

          <motion.div
            initial={still ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: T.copy, ease }}
            className="flex max-w-sm flex-col gap-5 lg:items-end lg:pt-3 lg:text-right"
          >
            <p className="text-sm leading-relaxed text-[var(--text-dim)] sm:text-base">
              <span className="font-semibold text-white">Insource Bridge Technologies: </span>
              Technology that drives growth across the GCC.
            </p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <button onClick={() => scrollHelper("services")} className="btn-primary !min-h-11 !px-5 !text-sm">
                Explore Services
                <ArrowDownRight size={16} />
              </button>
              <button onClick={() => scrollHelper("about")} className="btn-outline !min-h-11 !px-5 !text-sm">
                About Us
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* ——— Bento row ——— */}
        <motion.div
          style={still ? undefined : { y: bentoY }}
          className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 lg:flex lg:h-[clamp(340px,50svh,540px)]"
        >
          {/* Photo card with folder-tab notch */}
          <Rise delay={T.cards} className="order-1 lg:order-none lg:flex-[1.75]">
            <div className="group relative aspect-[4/5] h-full overflow-hidden rounded-[22px] bg-[var(--bg-card)] sm:aspect-[4/3] sm:rounded-[28px] lg:aspect-auto">
              <motion.img
                src="/heroimg.png"
                alt=""
                aria-hidden
                style={still ? undefined : { x: photoX, y: photoY }}
                className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] max-w-none object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01030a]/85 via-[#01030a]/10 to-[#01030a]/30" />

              <span className="notch notch--tr w-[34%] [--nh:2.75rem] sm:[--nh:3.25rem]">
                <button
                  type="button"
                  onClick={() => scrollHelper("solutions")}
                  aria-label="See our solutions"
                  className="absolute top-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--blue)] text-white transition-transform duration-500 hover:rotate-45 sm:h-11 sm:w-11"
                >
                  <ArrowUpRight size={18} />
                </button>
              </span>

              {chips.length > 0 && (
                <div className="relative z-[1] hidden max-w-[62%] flex-wrap gap-2 p-6 lg:flex">
                  {chips.map((c, i) => (
                    <motion.span
                      key={c}
                      initial={still ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: T.cards + 0.5 + i * 0.07, ease }}
                      className="rounded-full bg-[var(--blue)] px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_6px_20px_-6px_var(--blue)]"
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              )}

              <div className="absolute inset-x-4 bottom-4 z-[1] flex items-center gap-2 sm:inset-x-6 sm:bottom-6">
                <span className="pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--blue)]" />
                <span className="text-[11px] font-medium text-white/80 sm:text-xs">
                  Based in Dubai · Serving the GCC
                </span>
              </div>
            </div>
          </Rise>

          {strips.slice(0, 2).map((label, i) => (
            <Strip key={label} label={label} index={i} delay={T.strips + i * 0.08} />
          ))}

          {/* Feature card cycling through solution artwork */}
          <Rise delay={T.cards + 0.12} className="order-2 lg:order-none lg:flex-[1.05]">
            <button
              type="button"
              onClick={() => scrollHelper("solutions")}
              className="group relative block aspect-[4/5] h-full w-full overflow-hidden rounded-[22px] bg-[var(--bg-card)] text-left sm:aspect-[4/3] sm:rounded-[28px] lg:aspect-auto"
              aria-label="See our solutions"
            >
              <AnimatePresence initial={false}>
                {current && (
                  <motion.img
                    key={current.src}
                    src={current.src}
                    alt=""
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                )}
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#01030a] via-[#01030a]/25 to-transparent" />
              <span className="notch notch--tl w-[38%] [--nh:2.25rem] sm:[--nh:2.75rem]">
                <span className="absolute top-2.5 left-3 font-display text-[9px] tracking-[0.25em] text-[var(--blue-bright)] sm:top-3.5 sm:left-4 sm:text-[10px]">
                  Solutions
                </span>
              </span>

              <div className="absolute inset-x-4 bottom-4 z-[1] sm:inset-x-6 sm:bottom-6">
                <div className="relative h-[2.6em] overflow-hidden font-display text-sm leading-[1.25] text-white sm:text-xl lg:text-2xl">
                  <AnimatePresence initial={false} mode="popLayout">
                    {current && (
                      <motion.p
                        key={current.title}
                        initial={{ y: "2.6em", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-2.6em", opacity: 0 }}
                        transition={{ duration: 0.7, ease }}
                        className="absolute inset-x-0 bottom-0"
                      >
                        {current.title}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                {featured.length > 1 && (
                  <div className="mt-3 flex gap-1.5">
                    {featured.map((f, i) => (
                      <span
                        key={f.src}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          i === slide ? "w-6 bg-[var(--blue)]" : "w-1.5 bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </button>
          </Rise>

          {strips.slice(2, 4).map((label, i) => (
            <Strip key={label} label={label} index={i + 2} delay={T.strips + 0.16 + i * 0.08} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
