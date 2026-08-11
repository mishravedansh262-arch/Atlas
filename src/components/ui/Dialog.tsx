import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
};

export default function Dialog({ open, onClose, title, description, children }: DialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Trap focus and handle Escape
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-md rounded-xl border border-border-secondary bg-surface-secondary p-6 shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 id="dialog-title" className="text-sm font-semibold text-text-primary">
                  {title}
                </h2>
                {description && (
                  <p className="mt-0.5 text-xs text-text-tertiary">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-surface-elevated hover:text-text-secondary"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
