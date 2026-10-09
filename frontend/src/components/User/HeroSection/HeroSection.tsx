import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { scrollHelper } from "../../../utils/scrollHelper";

const HeroSection = () => {
  const handleScroll = (section: string) => {
    scrollHelper(section);
  };

  return (
    <section className="page-shell pt-24 pb-2 sm:pt-28">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-[var(--color-panel)] text-white shadow-[0_20px_60px_rgba(11,31,68,0.18)] sm:rounded-[2rem] lg:rounded-[2.5rem]">
        <motion.img
          src="/heroimg.png"
          alt=""
          aria-hidden
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#071633]/85 via-[#0b1f44]/75 to-[#0b1f44]/90 lg:bg-gradient-to-r lg:from-[#071633]/95 lg:via-[#0b1f44]/70 lg:to-[#0b1f44]/10" />
        <div className="hero-shine pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.75rem-1px)] border border-white/10 sm:rounded-[calc(2rem-1px)] lg:rounded-[calc(2.5rem-1px)]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent sm:inset-x-10" />

        <div className="relative z-10 mx-auto flex min-h-[460px] w-full max-w-[1280px] items-center sm:min-h-[500px] lg:min-h-[520px] xl:min-h-[560px]">
          <div className="flex w-full flex-col justify-center px-5 py-12 text-center sm:px-8 sm:py-14 md:px-10 lg:w-[58%] lg:px-12 lg:py-12 lg:text-left xl:w-[54%]">
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 text-[10px] uppercase tracking-[0.26em] text-white/70 sm:mb-4 sm:text-[11px] md:text-xs"
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
              className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:mt-5 sm:max-w-lg sm:text-[0.95rem] md:text-base lg:mx-0"
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
