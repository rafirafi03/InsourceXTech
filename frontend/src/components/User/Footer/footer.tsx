import { useRef } from "react";
import { Mail, PhoneCall, MapPin, Clock } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RootState } from "../../../store/store";
import Loader from "../Loader/loader";
import { useSelector } from "react-redux";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data, isLoading } = useSelector((state: RootState) => state.about);
  const about = data?.aboutCompany;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const wordOpacity = useTransform(scrollYProgress, [0.2, 1], [0, 1]);
  const lineScale = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  if (isLoading) {
    return <Loader />;
  }

  const columns: {
    heading: string;
    items: { icon: typeof Mail; text?: string; href?: string }[];
  }[] = [
    {
      heading: "Contact Us",
      items: [
        { icon: PhoneCall, text: about?.phone, href: about?.phone ? `tel:${about.phone.replace(/\s/g, "")}` : undefined },
        { icon: Mail, text: about?.email, href: about?.email ? `mailto:${about.email}` : undefined },
      ],
    },
    { heading: "Location", items: [{ icon: MapPin, text: about?.location }] },
    { heading: "Working Hours", items: [{ icon: Clock, text: about?.timing }] },
  ];

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/[0.06] bg-[var(--bg)] pt-14 sm:pt-16 lg:pt-20">
      <div className="shell relative">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-lg leading-snug text-white">{about?.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-dim)]">
              Leading IT Solutions in the GCC Region
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="eyebrow mb-5 !text-[0.6rem]">{col.heading}</h4>
              <div className="space-y-3">
                {col.items.map(({ icon: Icon, text, href }, i) => {
                  const content = (
                    <>
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--blue)]" />
                      <span className="break-words">{text}</span>
                    </>
                  );
                  return href ? (
                    <a
                      key={i}
                      href={href}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-dim)] transition-colors hover:text-white"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-dim)]"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          style={{ scaleX: lineScale }}
          className="mt-16 h-px origin-left bg-gradient-to-r from-[var(--blue)] via-white/20 to-transparent"
        />

        <div className="flex flex-col gap-2 py-6 text-sm text-[var(--text-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {about?.name}. All rights reserved.
          </p>
          <p>
            Developed by{" "}
            <a
              className="text-[var(--blue-bright)] transition-colors hover:text-white"
              href="https://www.instagram.com/rafii.in/"
            >
              Ahamad Rafi
            </a>
          </p>
        </div>
      </div>

      {/* Oversized wordmark rising from the bottom edge */}
      <div className="pointer-events-none relative select-none overflow-hidden" aria-hidden>
        <motion.p
          style={{
            y: wordY,
            opacity: wordOpacity,
            backgroundImage: "linear-gradient(180deg, rgb(var(--fg-rgb) / 0.16), rgba(59,130,246,0.04))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
          className="font-display -mb-[0.18em] text-center text-[11vw] leading-none tracking-[-0.03em]"
        >
          Insource
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
