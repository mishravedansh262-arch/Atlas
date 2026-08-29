import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";

import Dialog from "./Dialog";
import Spinner from "./Spinner";
import { cn } from "../../lib/cn";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  /** Plain-language consequence. Avoid technical detail. */
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** `danger` for irreversible actions. */
  tone?: "danger" | "default";
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Accessible replacement for `window.confirm()`.
 *
 * Built on the existing hand-rolled `Dialog` (no third-party library), so it
 * inherits Escape-to-close, the backdrop, and `role="dialog"`/`aria-modal`.
 *
 * Adds on top of that:
 *  - focus moves to Cancel on open, so the destructive button is never the
 *    default target of a stray Enter keypress
 *  - Tab is trapped inside the dialog
 *  - focus returns to the element that opened it on close
 */
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
  isPending = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // Remember the trigger, focus Cancel, restore on close.
  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    // rAF so the dialog has mounted and is focusable.
    const raf = requestAnimationFrame(() => cancelRef.current?.focus());

    return () => {
      cancelAnimationFrame(raf);
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  // Trap Tab within the dialog.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const root = containerRef.current;
      if (!root) return;

      const focusables = root.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <Dialog open={open} onClose={onCancel} title={title}>
      <div ref={containerRef}>
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "shrink-0 rounded-lg p-2",
              tone === "danger"
                ? "bg-error/10 text-error"
                : "bg-brand-500/10 text-brand-400",
            )}
          >
            <AlertTriangle size={15} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <p className="text-xs leading-relaxed text-text-secondary">
            {description}
          </p>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="focus-ring label-mono rounded-lg border border-border-primary bg-surface-tertiary px-3.5 py-2 text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className={cn(
              "focus-ring label-mono inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-white transition-colors disabled:opacity-60",
              tone === "danger"
                ? "bg-error hover:bg-error/85"
                : "bg-brand-500 hover:bg-brand-400",
            )}
          >
            {isPending && <Spinner />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
