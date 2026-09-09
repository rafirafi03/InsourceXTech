import { useEffect } from "react";
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/60 p-4 backdrop-blur-sm"
          data-lenis-prevent
          onClick={onClose}
        >
          <div className="flex min-h-full items-center justify-center py-6">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl"
            >
              <div className="mb-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-muted)] text-[var(--color-ink)] transition hover:bg-[var(--color-accent)] hover:text-white"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col items-center">
                <img
                  alt={title}
                  src={image}
                  className="mb-4 h-52 w-full rounded-[1.5rem] object-cover"
                />
                <h5 className="font-display text-center text-3xl uppercase text-[var(--color-ink)]">
                  {title}
                </h5>
                <p className="my-3 text-center text-sm text-[var(--color-text-muted)] sm:text-base">
                  {content}
                </p>
              </div>

              {subservices.length > 0 && (
                <div className="mt-6">
                  <h6 className="mb-4 text-center font-display text-2xl uppercase text-[var(--color-ink)]">
                    Subservices
                  </h6>
                  <div className="flex flex-col gap-4">
                    {subservices.map((sub, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center rounded-[1.25rem] bg-[var(--color-muted)] p-4 text-center"
                      >
                        <img
                          src={sub.image}
                          alt={sub.title}
                          className="mb-3 h-40 w-full rounded-xl object-cover"
                        />
                        <h6 className="font-display text-xl uppercase text-[var(--color-ink)]">
                          {sub.title}
                        </h6>
                        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                          {sub.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-center">
                <button
                  onClick={onClose}
                  className="btn-accent w-full justify-center sm:w-auto"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
