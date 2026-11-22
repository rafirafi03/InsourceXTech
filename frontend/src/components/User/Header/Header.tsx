import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { scrollHelper } from "../../../utils/scrollHelper";
import { lenisInstance } from "../Motion/SmoothScroll";
import { setTheme, useTheme } from "../../../Hooks/useTheme";

/** Sun/moon switch between the dark and light colour themes. */
function ThemeToggle() {
  const theme = useTheme();
  const isLight = theme === "light";
  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Dark theme" : "Light theme"}
      className="relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[var(--line-strong)] text-[var(--text)] transition-colors hover:border-[var(--blue)] hover:text-[var(--blue)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          {isLight ? <Moon size={18} /> : <Sun size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

const navItems = ["About", "Solutions", "Services", "Mission", "Contact"];
const ease = [0.16, 1, 0.3, 1] as const;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 200 && !isMenuOpen);
  });

  const handleOnclick = (section: string) => {
    setIsMenuOpen(false);
    // Wait for the menu to close (and scroll to unlock) before scrolling.
    window.setTimeout(() => scrollHelper(section), 50);
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenisInstance?.stop();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      lenisInstance?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[70] h-[2px] w-full origin-left bg-[var(--blue)] shadow-[0_0_12px_var(--blue)]"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="fixed top-0 left-0 z-[60] w-full"
      >
        <div
          className={`transition-[background,border-color,backdrop-filter] duration-500 ${
            scrolled || isMenuOpen
              ? "border-b border-[var(--line)] bg-[var(--bg)]/75 backdrop-blur-xl"
              : "border-b border-transparent"
          }`}
        >
          <div className="shell flex h-[4.5rem] items-center justify-between gap-4 sm:h-20">
            <button
              onClick={() => handleOnclick("home")}
              className="flex min-w-0 cursor-pointer items-center gap-3"
              aria-label="Insource Bridge Technologies"
            >
              <img
                src="/insourcextechlogo.png"
                alt="Insource Bridge Technologies"
                className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-white/15 sm:h-10 sm:w-10"
              />
              <div className="min-w-0 text-left leading-none">
                <p className="font-display text-sm tracking-[0.18em] text-white sm:text-base">
                  INSOURCE
                </p>
                <p className="mt-1.5 truncate text-[9px] uppercase tracking-[0.3em] text-white/85 sm:text-[10px]">
                  Bridge Technologies
                </p>
              </div>
            </button>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleOnclick(item.toLowerCase())}
                  className="group relative cursor-pointer overflow-hidden px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-dim)] transition-colors hover:text-[var(--text)]"
                >
                  <span className="relative block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[130%]">
                    {item}
                  </span>
                  <span className="absolute inset-x-4 top-2 block translate-y-[130%] text-[var(--blue)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                    {item}
                  </span>
                </button>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => handleOnclick("contact")}
                className="btn-primary !hidden !min-h-11 !px-5 !text-[13px] lg:!inline-flex"
              >
                Get in touch
                <ArrowUpRight size={16} />
              </button>

              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className="relative flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  className="block h-[1.5px] w-5 bg-[var(--text)]"
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  className="block h-[1.5px] w-5 bg-[var(--text)]"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-[55] flex flex-col bg-[var(--bg)] pt-24 lg:hidden"
            data-lenis-prevent
          >
            <div className="grid-bg pointer-events-none absolute inset-0" />
            <nav className="shell relative flex flex-1 flex-col justify-center gap-1">
              {navItems.map((item, index) => (
                <div key={item} className="overflow-hidden border-b border-white/10">
                  <motion.button
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, delay: 0.15 + index * 0.06, ease }}
                    onClick={() => handleOnclick(item.toLowerCase())}
                    className="flex w-full cursor-pointer items-baseline gap-4 py-4 text-left"
                  >
                    <span className="font-display text-xs text-[var(--blue)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl text-white sm:text-4xl">{item}</span>
                  </motion.button>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease }}
              className="shell relative pb-10"
            >
              <button onClick={() => handleOnclick("contact")} className="btn-primary w-full">
                Get in touch
                <ArrowUpRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
