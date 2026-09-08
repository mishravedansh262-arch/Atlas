/**
 * Icon size scale.
 *
 * The codebase had accumulated nine distinct interactive icon sizes
 * (10, 11, 12, 13, 14, 15, 16, 17, 20), which made optical weight
 * inconsistent between otherwise-identical controls. These four tiers cover
 * every interactive case; anything outside them is a deliberate exception
 * (spinners, progress rings) and should be written inline with a comment.
 *
 * Pair with `strokeWidth={1.5}` — 2 only for active/emphasised state.
 */
export const ICON = {
  /** 12px — inline metadata beside micro text: dates, counts, dots. */
  xs: 12,
  /** 14px — row-level actions and list leading icons. */
  sm: 14,
  /** 16px — buttons, form controls, top-bar actions. */
  md: 16,
  /** 20px — primary navigation (rail, bottom bar). */
  lg: 20,
} as const;

export type IconSize = (typeof ICON)[keyof typeof ICON];
