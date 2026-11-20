import { motion } from "framer-motion";
import ParticleText from "../Motion/ParticleText";

const ease = [0.16, 1, 0.3, 1] as const;

/** Interlude band: the INSOURCE wordmark as interactive particles. */
export default function ParticleSection() {
  return (
    <section
      aria-label="Insource"
      className="relative overflow-hidden border-y border-white/[0.06] bg-[var(--bg)] py-12 sm:py-28"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div className="glow-orb left-1/2 top-1/2 h-[26rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-40" />

      <div className="shell relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease }}
          className="mb-6 flex items-center justify-between gap-4 sm:mb-10"
        >
          <p className="eyebrow">Bridge Technologies</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--text-faint)]">
            <span className="hidden sm:inline">Hover to interact</span>
            <span className="sm:hidden">Touch to interact</span>
          </p>
        </motion.div>

        <ParticleText text="INSOURCE" className="w-full" />
      </div>
    </section>
  );
}
