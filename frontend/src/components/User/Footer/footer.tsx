import { Mail, PhoneCall, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { RootState } from "../../../store/store";
import Loader from "../Loader/loader";
import { useSelector } from "react-redux";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data, isLoading } = useSelector((state: RootState) => state.about);
  const about = data?.aboutCompany;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <footer className="page-shell pb-5 pt-1 sm:pb-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden rounded-[2rem] bg-[var(--color-panel)] px-6 py-10 text-white sm:rounded-[2.5rem] sm:px-8 sm:py-12 md:px-10 md:py-12"
      >
        <div className="max-w-2xl">
          <h2 className="display-title !text-white">
            OUTSIZED <span className="accent-on-dark">PERFORMANCE</span>
          </h2>
          <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-white/50 sm:mt-5">
            Leading IT solutions in the GCC region — crafted for scale,
            reliability, and lasting impact.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 border-t border-white/10 pt-7 sm:mt-9 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl uppercase leading-tight">
              {about?.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/45">
              Leading IT Solutions in the GCC Region
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent-soft)]">
              Contact Us
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 text-sm leading-relaxed text-white/65">
                <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-soft)]" />
                <span>{about?.phone}</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm leading-relaxed text-white/65">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-soft)]" />
                <span className="break-all">{about?.email}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent-soft)]">
              Location
            </h4>
            <div className="flex items-start gap-2.5 text-sm leading-relaxed text-white/65">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-soft)]" />
              <span>{about?.location}</span>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent-soft)]">
              Working Hours
            </h4>
            <div className="flex items-start gap-2.5 text-sm leading-relaxed text-white/65">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-soft)]" />
              <span>{about?.timing}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-center">
          <p className="text-sm text-white/35">
            © {currentYear} {about?.name}. All rights reserved.
          </p>
          <p className="mt-1.5 text-sm text-white/35">
            Developed by{" "}
            <a
              className="text-[var(--color-accent-soft)] hover:underline"
              href="https://www.instagram.com/rafii.in/"
            >
              Ahamad Rafi
            </a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
