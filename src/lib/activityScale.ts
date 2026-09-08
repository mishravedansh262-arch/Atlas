/**
 * Visual encoding for completion-activity counts.
 *
 * Lives apart from the components so the Command Center strip and the
 * Analytics heatmap cannot drift: the same day must render the same colour on
 * both screens, otherwise the two surfaces appear to disagree about the data.
 *
 * Five steps ramping blue -> cyan, so a peak day reads as hotter rather than
 * merely more opaque.
 */
export function intensityClass(count: number): string {
  if (count === 0) return "bg-surface-track";
  if (count === 1) return "bg-brand-600/40";
  if (count === 2) return "bg-brand-500/65";
  if (count <= 4) return "bg-brand-400/85";
  return "bg-accent-cyan";
}

/** Peak days earn a faint bloom so streaks are visible at a glance. */
export function isPeak(count: number): boolean {
  return count >= 5;
}

/** Sample counts used to render the "less -> more" legend. */
export const LEGEND_STEPS = [0, 1, 2, 3, 5] as const;
