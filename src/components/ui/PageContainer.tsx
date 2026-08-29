import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

type PageContainerProps = {
  children: ReactNode;
  /**
   * `default` — data-dense pages (dashboard, grids, tables).
   * `narrow`  — single-column reading/timeline measure, where a full-width
   *             line length would hurt scannability.
   */
  width?: "default" | "narrow";
  className?: string;
};

/**
 * Page content wrapper.
 *
 * Centralises horizontal alignment so pages don't drift apart — every app page
 * previously declared its own `mx-auto max-w-*`, and Roadmap had silently
 * diverged, causing a visible width jump on navigation.
 *
 * `narrow` exists because the Roadmap timeline genuinely reads better at a
 * tighter measure. It is a deliberate variant rather than an inconsistency, and
 * both variants share the same vertical rhythm.
 */
export default function PageContainer({
  children,
  width = "default",
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto space-y-6",
        width === "default" ? "max-w-7xl" : "max-w-5xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
