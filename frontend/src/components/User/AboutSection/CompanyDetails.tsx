import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { scrollHelper } from "../../../utils/scrollHelper";
import DottedGlobe from "../Motion/DottedGlobe";
import { useOfficeStatus } from "../../../Hooks/useOfficeStatus";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Headquarters band: where we are and how to reach us, with a live
 * open/closed badge in Dubai time and an interactive globe.
 */
export default function CompanyDetails() {
  const { data, isLoading } = useSelector((state: RootState) => state.about);
  const about = data?.aboutCompany;
  const { clock, status } = useOfficeStatus(about?.timing);

  if (isLoading || !about) return null;

  const whatsapp = import.meta.env.VITE_WHATSAPP_NO || "971585883524";

  return (
    <section
      id="headquarters"
      aria-label="Headquarters"
      className="relative overflow-hidden border-y border-white/[0.06] bg-[var(--bg)] py-24 sm:py-32"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <div className="glow-orb right-[-12rem] top-1/4 h-[36rem] w-[36rem] opacity-40" />

      <div className="shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease }}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              <p className="eyebrow">Headquarters</p>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-[var(--text-dim)]">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--blue)]" />
                {clock} in Dubai
                {status && (
                  <>
                    <span className="text-white/20">|</span>
                    <span className={status.open ? "text-emerald-400" : ""}>
                      {status.open ? "Open now" : `Closed · ${status.note}`}
                    </span>
                  </>
                )}
              </span>
            </motion.div>

            {/* The visible h2 watches the viewport; its masked lines rise in on cue. */}
            <motion.h2
              className="section-title"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
                  transition={{ duration: 1.1, ease }}
                >
                  Based in Dubai.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block text-[var(--blue)]"
                  variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
                  transition={{ duration: 1.1, ease }}
                >
                  Built for the GCC.
                </motion.span>
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, delay: 0.2, ease }}
              className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-dim)] sm:text-lg"
            >
              Talk to the team behind {about.name}. Visit our office, call us during working hours,
              or send a message and we'll get back to you within 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, delay: 0.3, ease }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <button onClick={() => scrollHelper("contact")} className="btn-primary">
                Send a message
                <ArrowUpRight size={18} />
              </button>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <FaWhatsapp size={18} />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease }}
            className="relative mx-auto w-full max-w-[460px] lg:col-span-5"
          >
            <DottedGlobe className="w-full" />
            <div className="pointer-events-none absolute bottom-[14%] left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-[#01030a]/70 px-4 py-2 text-center backdrop-blur-md">
              <p className="font-display text-[10px] tracking-[0.3em] text-white">Dubai · UAE</p>
            </div>
            <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--text-faint)]">
              Drag to rotate
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
