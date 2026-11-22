import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ISubService } from "../../../types";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { lenisInstance } from "../Motion/SmoothScroll";

interface pageProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  content: string;
  subservices?: ISubService[];
}

const ease = [0.16, 1, 0.3, 1] as const;

const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  image,
  content,
  subservices = [],
}: pageProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenisInstance?.stop();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      lenisInstance?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-[var(--bg)]/80 p-4 backdrop-blur-md"
          data-lenis-prevent
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="flex min-h-full items-center justify-center py-6">
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.6, ease }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--bg-elev)] shadow-[0_40px_120px_-20px_rgba(59,130,246,0.35)]"
            >
              <div className="relative h-56 overflow-hidden sm:h-72">
                <motion.img
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease }}
                  alt={title}
                  src={image}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elev)] via-[var(--bg-elev)]/30 to-transparent" />
                <button
                  onClick={onClose}
                  className="keep-light absolute top-4 right-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:border-[var(--blue)] hover:bg-[var(--blue)]"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-6 pb-8 sm:px-10 sm:pb-10">
                <h5 className="font-display relative z-10 -mt-4 text-xl leading-snug text-white sm:text-2xl">
                  {title}
                </h5>
                <div className="my-5 h-px w-14 bg-[var(--blue)]" />
                <p className="text-[0.975rem] leading-relaxed text-[var(--text-dim)]">{content}</p>

                {subservices.length > 0 && (
                  <div className="mt-10">
                    <h6 className="eyebrow mb-6">Subservices</h6>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {subservices.map((sub, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 + idx * 0.08, ease }}
                          className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-[var(--bg-card)]"
                        >
                          <img
                            src={sub.image}
                            alt={sub.title}
                            className="h-36 w-full object-cover"
                          />
                          <div className="p-5">
                            <h6 className="font-display text-sm text-white">{sub.title}</h6>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">
                              {sub.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-10">
                  <button onClick={onClose} className="btn-outline w-full sm:w-auto">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmationModal;
