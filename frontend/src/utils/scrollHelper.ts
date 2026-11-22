import { lenisInstance } from "../components/User/Motion/SmoothScroll";

/**
 * Smooth-scroll to a section by id. `onArrive` runs once the scroll has
 * finished (useful for opening something there without interrupting the scroll).
 */
export const scrollHelper = (section: string, onArrive?: () => void) => {
  const el = document.getElementById(section);
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, {
      offset: -88,
      duration: 1.2,
      onComplete: () => onArrive?.(),
    });
    return;
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
  if (!onArrive) return;

  // Native smooth scroll: wait for `scrollend` (with a fallback for browsers without it).
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    window.removeEventListener("scrollend", finish);
    window.clearTimeout(fallback);
    onArrive();
  };
  const fallback = window.setTimeout(finish, 1200);
  window.addEventListener("scrollend", finish, { once: true });
};
