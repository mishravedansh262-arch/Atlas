import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
};

/**
 * Modal dialog.
 * Spec: sits on the elevated surface tier; floating dialogs are the one
 * permitted exception to the no-shadow rule.
 */
export default function Dialog({
  open,
  onClose,
  title,
  description,
  children,
}: DialogProps) {
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="absolute inset-0 bg-black/75"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl border border-border-primary bg-surface-elevated p-5 shadow-[var(--shadow-dialog)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2
                  id="dialog-title"
                  className="label-mono text-text-secondary"
                >
                  {title}
                </h2>
                {description && (
                  <p className="mt-1.5 text-xs text-text-tertiary">
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="shrink-0 rounded-lg p-1 text-text-muted transition-colors hover:bg-surface-overlay hover:text-text-secondary"
                aria-label="Close dialog"
              >
                <X size={15} strokeWidth={1.5} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
