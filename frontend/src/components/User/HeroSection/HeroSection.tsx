import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { scrollHelper } from "../../../utils/scrollHelper";

const HeroSection = () => {
  const handleScroll = (section: string) => {
    scrollHelper(section);
  };

  return (
    <section className="page-shell pt-24 pb-2 sm:pt-28">
      <div className="hero-panel relative overflow-hidden rounded-[1.75rem] text-white shadow-[0_20px_60px_rgba(11,31,68,0.18)] sm:rounded-[2rem] lg:rounded-[2.5rem]">
        <div className="hero-orb-a pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-[#3b82f6]/30 blur-3xl sm:h-64 sm:w-64" />
        <div className="hero-orb-b pointer-events-none absolute -right-10 bottom-4 h-44 w-44 rounded-full bg-[#60a5fa]/25 blur-3xl sm:h-56 sm:w-56" />
        <div className="hero-orb-c pointer-events-none absolute left-1/3 top-1/3 h-36 w-36 rounded-full bg-white/10 blur-3xl" />

        <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="hero-shine pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.75rem-1px)] border border-white/10 sm:rounded-[calc(2rem-1px)] lg:rounded-[calc(2.5rem-1px)]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent sm:inset-x-10" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col lg:min-h-[520px] lg:flex-row lg:items-stretch xl:min-h-[560px]">
          {/* Text */}
          <div className="relative z-20 flex w-full flex-col justify-center px-5 pb-6 pt-8 text-center sm:px-8 sm:pb-8 sm:pt-10 md:px-10 lg:w-[54%] lg:px-12 lg:pb-12 lg:pt-12 lg:text-left xl:w-[52%]">
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 text-[10px] uppercase tracking-[0.26em] text-white/60 sm:mb-4 sm:text-[11px] md:text-xs"
            >
              Insource Bridge Technologies
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.35rem,8vw,5rem)] leading-[0.92]"
            >
              A NEW <span className="accent-on-dark">ERA</span>
              <br />
              OF TECHNOLOGY
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/65 sm:mt-5 sm:max-w-lg sm:text-[0.95rem] md:text-base lg:mx-0"
            >
              Cutting-edge solutions that drive growth, efficiency, and digital
              transformation for businesses across the GCC.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-7 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScroll("services")}
                className="btn-accent w-full max-w-xs sm:w-auto sm:max-w-none"
              >
                Explore Services
                <ArrowDownRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScroll("about")}
                className="btn-ghost w-full max-w-xs sm:w-auto sm:max-w-none"
              >
                About Us
              </motion.button>
            </motion.div>
          </div>

          {/* Image — in-flow on mobile/tablet, side panel on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="relative z-10 flex w-full flex-1 items-end justify-center px-4 lg:absolute lg:bottom-0 lg:right-0 lg:h-full lg:w-[48%] lg:px-0 xl:w-[50%]"
          >
            <img
              src="/camera_man.png"
              alt="Insource Bridge Technologies"
              className="h-auto max-h-[240px] w-auto max-w-[85%] object-contain object-bottom drop-shadow-[0_16px_30px_rgba(0,0,0,0.3)] sm:max-h-[300px] sm:max-w-[75%] md:max-h-[340px] lg:h-[92%] lg:max-h-none lg:max-w-[95%] xl:max-w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
