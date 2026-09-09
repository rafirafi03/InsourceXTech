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
}

export default function Card({
  title,
  image,
  content,
  subservices = [],
}: PageProps) {
  const [isModal, setModal] = useState(false);

  return (
    <>
      <motion.div
        onClick={() => setModal(true)}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#dce5f5] bg-white shadow-[0_8px_24px_rgba(11,31,68,0.05)] transition-shadow hover:shadow-[0_12px_28px_rgba(37,99,235,0.12)]"
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <div className="relative h-32 overflow-hidden bg-[var(--color-muted)] sm:h-36">
          <img
            alt={`${title} image`}
            src={image}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-panel)]/25 to-transparent opacity-0 transition group-hover:opacity-100" />
          <div className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)] text-white opacity-0 shadow-md transition group-hover:opacity-100">
            <ArrowUpRight size={14} />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-3.5 py-3.5 sm:px-4 sm:py-4">
          <h5 className="font-display text-[1.15rem] uppercase leading-tight tracking-wide text-[var(--color-ink)] line-clamp-2 sm:text-lg">
            {title}
          </h5>
          <div className="mt-auto flex items-center justify-between pt-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              View details
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-muted)] text-[var(--color-accent)] transition group-hover:bg-[var(--color-accent)] group-hover:text-white">
              <ArrowUpRight size={13} />
            </span>
          </div>
        </div>
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
