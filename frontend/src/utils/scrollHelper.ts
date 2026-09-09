import { lenisInstance } from "../components/User/Motion/SmoothScroll";

export const scrollHelper = (section: string) => {
  const el = document.getElementById(section);
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, {
      offset: -88,
      duration: 1.2,
    });
    return;
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
};
