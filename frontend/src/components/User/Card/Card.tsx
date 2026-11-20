import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Modal from "../Modal/Modal";
import { ISubService } from "../../../types";

interface PageProps {
  title: string;
  image: string;
  content: string;
  subservices?: ISubService[];
  index?: number;
  active?: boolean;
  onActive?: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

/** A full-width service row. Click opens the details modal. */
export default function Card({
  title,
  image,
  content,
  subservices = [],
  index = 0,
  active = false,
  onActive,
}: PageProps) {
  const [isModal, setModal] = useState(false);

  return (
    <>
      <motion.div
        onViewportEnter={onActive}
        viewport={{ margin: "-45% 0px -45% 0px" }}
      >
      <motion.button
        type="button"
        onClick={() => setModal(true)}
        onMouseEnter={onActive}
        onFocus={onActive}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease }}
        className="group relative flex w-full cursor-pointer items-center gap-4 border-b border-white/10 py-6 text-left sm:gap-6 sm:py-8"
      >
        <span
          className={`absolute inset-x-0 bottom-[-1px] h-px origin-left bg-[var(--blue)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active ? "scale-x-100" : "scale-x-0"
          }`}
        />

        <span
          className={`font-display w-8 shrink-0 text-[11px] transition-colors duration-500 sm:w-10 ${
            active ? "text-[var(--blue)]" : "text-[var(--text-faint)]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-14 w-14 shrink-0 rounded-xl object-cover opacity-80 lg:hidden"
        />

        <h3
          className={`font-display min-w-0 flex-1 text-sm leading-snug transition-all duration-500 sm:text-lg lg:text-xl ${
            active ? "text-white lg:translate-x-2" : "text-white/45"
          }`}
        >
          {title}
        </h3>

        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 sm:h-12 sm:w-12 ${
            active
              ? "rotate-45 border-[var(--blue)] bg-[var(--blue)] text-white"
              : "border-white/15 text-white/50"
          }`}
        >
          <ArrowUpRight size={18} />
        </span>
      </motion.button>
      </motion.div>

      <Modal
        isOpen={isModal}
        onClose={() => setModal(false)}
        title={title}
        image={image}
        content={content}
        subservices={subservices}
      />
    </>
  );
}
