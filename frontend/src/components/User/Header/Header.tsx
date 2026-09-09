import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollHelper } from "../../../utils/scrollHelper";

const navItems = ["Solutions", "Services", "About", "Mission", "Contact"];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOnclick = (section: string) => {
    scrollHelper(section);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="page-shell relative pt-4 pb-2">
        <div className="relative z-50 flex h-16 items-center justify-between gap-4 rounded-full border border-[#d7e0ef] bg-white/90 px-4 shadow-[0_10px_40px_rgba(11,31,68,0.08)] backdrop-blur-xl sm:h-[4.25rem] sm:px-5">
          <button
            onClick={() => handleOnclick("solutions")}
            className="flex min-w-0 cursor-pointer items-center gap-2.5 sm:gap-3"
          >
            <img
              src="/insourcextechlogo.png"
              alt="Insource Bridge Technologies"
              className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
            />
            <div className="min-w-0 text-left leading-none">
              <p className="font-display text-xl text-[var(--color-ink)] sm:text-2xl">
                INSOURCE
              </p>
              <p className="mt-1 truncate text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] sm:text-[11px]">
                Bridge Technologies
              </p>
            </div>
          </button>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleOnclick(item.toLowerCase())}
                className="cursor-pointer rounded-full px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)] transition hover:bg-[var(--color-muted)] hover:text-[var(--color-accent)] xl:px-4"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => handleOnclick("contact")}
              className="btn-accent !hidden !min-h-10 !px-4 !text-sm lg:!inline-flex"
            >
              Get in touch
            </button>

            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-muted)] text-[var(--color-ink)] lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-[var(--color-panel)]/35 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            <nav className="relative z-50 mt-3 overflow-hidden rounded-[1.75rem] border border-[#d7e0ef] bg-white/95 p-3 shadow-[0_24px_60px_rgba(11,31,68,0.16)] backdrop-blur-xl lg:hidden">
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <button
                    key={item}
                    onClick={() => handleOnclick(item.toLowerCase())}
                    className="group flex items-center justify-between rounded-2xl px-4 py-3.5 text-left text-sm font-medium uppercase tracking-[0.14em] text-[var(--color-ink)] transition-colors duration-150 hover:bg-[var(--color-muted)] hover:text-[var(--color-accent)]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-display text-base text-[var(--color-accent)]/70 group-hover:text-[var(--color-accent)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                  </button>
                ))}

                <button
                  onClick={() => handleOnclick("contact")}
                  className="btn-accent mt-2 w-full"
                >
                  Get in touch
                </button>
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
