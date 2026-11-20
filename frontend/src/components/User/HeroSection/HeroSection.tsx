import { ReactNode, useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { scrollHelper } from "../../../utils/scrollHelper";
import ProximityHeadline, { ProximityWords } from "../Motion/ProximityText";

const ease = [0.16, 1, 0.3, 1] as const;
const easeInOut = [0.76, 0, 0.24, 1] as const;

// Intro timeline (seconds)
const T = {
  line: 0.15,
  open: 0.75,
  eyebrow: 1.1,
  title: 1.2,
  wipe: 1.55,
  copy: 1.8,
  chrome: 2.1,
};

/** A headline line that slides up out of a mask. */
function MaskLine({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block origin-bottom-left"
        initial={{ y: "115%", skewY: 7 }}
        animate={{ y: "0%", skewY: 0 }}
        transition={{ duration: 1.2, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Word revealed by a blue block that wipes across it. */
function WipeWord({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="relative inline-block">
      <motion.span
        className="inline-block text-[var(--blue)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.01, delay: delay + 0.45 }}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute inset-y-[8%] -inset-x-[0.08em] bg-[var(--blue)]"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{
          clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0 0 100%)"],
        }}
        transition={{ duration: 1, delay, times: [0, 0.45, 1], ease: easeInOut }}
      />
    </span>
  );
}

function Corner({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay, ease }}
      className={`absolute h-6 w-6 border-[var(--blue)] sm:h-8 sm:w-8 ${className}`}
    />
  );
}

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // ——— Scroll: push into the corridor while the copy recedes ———
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const zoom = useTransform(scrollYProgress, [0, 1], [1, 1.55]);
  const imgBrightness = useTransform(scrollYProgress, [0, 0.8], ["brightness(1)", "brightness(0.35)"]);
  const textScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.82]);
  const textY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-18%"]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.45], [1, 0]);
  const textBlur = useTransform(scrollYProgress, [0.1, 0.5], ["blur(0px)", "blur(12px)"]);
  const chromeOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const vignette = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  // ——— Pointer depth parallax ———
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const imgX = useTransform(sx, (v) => v * -26);
  const imgY = useTransform(sy, (v) => v * -18);
  const copyX = useTransform(sx, (v) => v * 10);
  const copyY = useTransform(sy, (v) => v * 8);
  const glowX = useTransform(sx, (v) => `${50 + v * 30}%`);
  const glowY = useTransform(sy, (v) => `${45 + v * 30}%`);
  const glow = useMotionTemplate`radial-gradient(600px circle at ${glowX} ${glowY}, rgba(59,130,246,0.22), transparent 60%)`;

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  const still = Boolean(reduce);

  return (
    <section ref={ref} id="home" className="relative h-[100svh] sm:h-[180vh]">
      <div className="noise sticky top-0 h-[100svh] w-full overflow-hidden bg-[var(--bg)]">
        {/* ——— Image stage: slit opens from a centre line ——— */}
        <motion.div
          className="absolute inset-0"
          initial={still ? false : { clipPath: "inset(50% 0% 50% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.4, delay: T.open, ease: easeInOut }}
        >
          <motion.div
            className="absolute -inset-8"
            style={still ? undefined : { x: imgX, y: imgY }}
          >
            <motion.div
              className="absolute inset-0 origin-[24%_46%]"
              style={still ? undefined : { scale: zoom, filter: imgBrightness }}
            >
              <motion.img
                src="/heroimg.png"
                alt=""
                aria-hidden
                initial={still ? false : { scale: 1.35 }}
                animate={{ scale: 1.04 }}
                transition={{ duration: 2.4, delay: T.open, ease }}
                className="h-full w-full object-cover object-[30%_center] sm:object-[60%_center]"
              />
            </motion.div>
          </motion.div>

          {/* Light scan sweeping through the racks */}
          <div className="hero-scan pointer-events-none absolute inset-0" />

          {/* Readability + mood */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#01030a]/90 via-[#01030a]/45 to-[#01030a]/20 max-md:from-[#01030a]/80 max-md:via-[#01030a]/60" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#01030a]/55 via-transparent to-[#01030a]" />
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={still ? undefined : { background: glow }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#01030a_85%)]"
            style={still ? undefined : { opacity: vignette }}
          />
        </motion.div>

        {/* Centre line that draws, then splits into the opening slit */}
        {!still && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] h-px origin-left bg-[var(--blue)] shadow-[0_0_24px_2px_var(--blue)]"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
            transition={{ duration: 1.6, delay: T.line, times: [0, 0.45, 1], ease: easeInOut }}
          />
        )}

        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />

        {/* HUD corner brackets */}
        <motion.div
          className="pointer-events-none absolute inset-x-4 top-24 bottom-6 z-10 sm:inset-x-8 sm:top-28 sm:bottom-10"
          style={still ? undefined : { opacity: chromeOpacity }}
        >
          <Corner className="top-0 left-0 origin-top-left border-t border-l" delay={T.chrome} />
          <Corner className="top-0 right-0 origin-top-right border-t border-r" delay={T.chrome + 0.05} />
          <Corner className="bottom-0 left-0 origin-bottom-left border-b border-l" delay={T.chrome + 0.1} />
          <Corner className="right-0 bottom-0 origin-bottom-right border-r border-b" delay={T.chrome + 0.15} />
        </motion.div>

        {/* ——— Copy (kept minimal: label, headline, one line, two actions) ——— */}
        <motion.div
          style={still ? undefined : { scale: textScale, y: textY, opacity: textOpacity, filter: textBlur }}
          className="relative z-10 h-full origin-[20%_50%]"
        >
          <motion.div
            style={still ? undefined : { x: copyX, y: copyY }}
            className="shell flex h-full flex-col justify-center pt-16"
          >
            <motion.p
              initial={still ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: T.eyebrow, ease }}
              className="eyebrow no-dot mb-7 [@media(max-height:500px)]:!hidden !text-[0.6rem] !tracking-[0.4em] !text-[var(--text-dim)]"
            >
              Insource Bridge Technologies
            </motion.p>

            <ProximityHeadline
              as="h1"
              aria-label="A new era of technology"
              className="font-hero text-[clamp(2.3rem,min(11.5vw,13svh),9.5rem)] md:text-[clamp(2.6rem,min(9vw,15svh),9.5rem)] leading-[0.88] text-white"
            >
              <MaskLine delay={T.title}>
                <ProximityWords text="A NEW" />{" "}
                <WipeWord delay={T.wipe}>
                  <ProximityWords text="ERA" accent />
                </WipeWord>
              </MaskLine>
              <MaskLine delay={T.title + 0.12}>
                <ProximityWords text="OF TECHNOLOGY" />
              </MaskLine>
            </ProximityHeadline>

            <div className="mt-8 flex flex-col gap-6 sm:mt-10 lg:flex-row lg:items-center lg:justify-between">
              <motion.p
                initial={still ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: T.copy, ease }}
                className="text-sm tracking-wide text-[var(--text-dim)] sm:text-base"
              >
                Technology that drives growth across the GCC.
              </motion.p>

              <motion.div
                initial={still ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: T.copy + 0.12, ease }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <button onClick={() => scrollHelper("services")} className="btn-primary">
                  Explore Services
                  <ArrowDownRight size={18} />
                </button>
                <button onClick={() => scrollHelper("about")} className="btn-outline backdrop-blur-sm">
                  About Us
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
