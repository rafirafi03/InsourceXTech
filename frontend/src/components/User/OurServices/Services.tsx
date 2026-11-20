import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../Loader/loader";
import Modal from "../Modal/Modal";
import ScrollWords from "../Motion/ScrollWords";
import ChromaGrid from "../Motion/ChromaGrid";
import { useMediaQuery, useServices } from "../../../Hooks/useSiteContent";
import { IService } from "../../../types";

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
    <section id="services" className="relative overflow-hidden bg-[var(--bg)] py-24 sm:py-32">
      <div className="glow-orb -right-40 top-20 h-[32rem] w-[32rem] opacity-30" />
      <div className="glow-orb -left-40 bottom-10 h-[28rem] w-[28rem] opacity-25" />

      <div className="shell relative">
        <div className="mb-12 grid gap-8 sm:mb-16 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-7"
          >
            <p className="eyebrow mb-5">What we deliver</p>
            <h2 className="section-title">
              Our <span className="text-blue">services</span>
            </h2>
          </motion.div>
          <div className="lg:col-span-5">
            <ScrollWords
              text="Explore the capabilities that power modern businesses."
              className="text-xl font-semibold leading-snug sm:text-2xl"
            />
            <p className="mt-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--text-faint)]">
              <span className="h-px w-8 bg-[var(--blue)]" />
              {String(services.length).padStart(2, "0")} services · Tap a card for details
            </p>
          </div>
        </div>

        <ChromaGrid
          items={items}
          theme="midnight"
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
