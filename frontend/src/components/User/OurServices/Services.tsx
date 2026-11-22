import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../Loader/loader";
import Modal from "../Modal/Modal";
import ChromaGrid from "../Motion/ChromaGrid";
import { useMediaQuery, useServices } from "../../../Hooks/useSiteContent";
import { IService } from "../../../types";
import { useTheme } from "../../../Hooks/useTheme";
import { OPEN_SERVICE_EVENT } from "../../../utils/serviceEvents";

const ease = [0.16, 1, 0.3, 1] as const;

// Blue family accents so each card glows slightly differently under the spotlight.
const ACCENTS = ["#3b82f6", "#60a5fa", "#22d3ee", "#818cf8", "#38bdf8", "#2563eb"];

/** First sentence of a description, used as the card teaser. */
const firstSentence = (text: string) => {
  const match = text.trim().match(/^.*?[.!?](\s|$)/);
  return (match ? match[0] : text).trim();
};

export default function Services() {
  const { services, isLoading } = useServices();
  const [selected, setSelected] = useState<IService | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);
  const theme = useTheme();

  // Open a service's details when another section asks (e.g. a hero strip).
  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const match = services.find((s) => s._id === id);
      if (match) setSelected(match);
    };
    window.addEventListener(OPEN_SERVICE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SERVICE_EVENT, onOpen);
  }, [services]);
  // Phones: always two cards per row.
  const isPhone = useMediaQuery("(max-width: 639px)");
  // Touch screens have no hover spotlight, so show the photos mostly in colour there.
  const isTouch = useMediaQuery("(hover: none)");

  const items = useMemo(
    () =>
      services.map((service, index) => ({
        image: service.image,
        title: service.title,
        alt: service.title,
        subtitle: firstSentence(service.content),
        eyebrow:
          String(index + 1).padStart(2, "0") +
          (service.subservices.length ? `  ·  ${service.subservices.length} sub-services` : ""),
        accent: ACCENTS[index % ACCENTS.length],
      })),
    [services]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section id="services" className="relative overflow-hidden bg-[var(--bg)] py-14 sm:py-20 lg:py-24 xl:py-32">
      <div className="glow-orb -right-40 top-20 h-[32rem] w-[32rem] opacity-30" />
      <div className="glow-orb -left-40 bottom-10 h-[28rem] w-[28rem] opacity-25" />

      <div className="shell relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease }}
          className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-16"
        >
          <h2 className="section-title">
            Our <span className="text-blue">services</span>
          </h2>
          <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--text-faint)]">
            <span className="h-px w-8 bg-[var(--blue)]" />
            {String(services.length).padStart(2, "0")} services · Tap a card for details
          </p>
        </motion.div>

        <ChromaGrid
          items={items}
          theme={theme === "light" ? "light" : "midnight"}
          columns={isPhone ? 2 : 3}
          minCardWidth={isPhone ? 120 : 220}
          gap={isPhone ? 10 : 16}
          radius={isPhone ? 200 : 320}
          softness={0.6}
          damping={0.4}
          fadeOut={0.7}
          grayscale={isTouch ? 0.2 : 1}
          dim={isTouch ? 0.12 : 0.35}
          glow={0.7}
          borderGlow={1}
          aspectRatio="16 / 10"
          cardRadius={isPhone ? 18 : 24}
          frame={!isPhone}
          onItemClick={(_, index) => setSelected(services[index] ?? null)}
        />
      </div>

      <Modal
        isOpen={selected !== null}
        onClose={closeModal}
        title={selected?.title ?? ""}
        image={selected?.image ?? ""}
        content={selected?.content ?? ""}
        subservices={selected?.subservices ?? []}
      />
    </section>
  );
}
