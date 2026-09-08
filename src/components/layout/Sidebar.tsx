import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { cn } from "../../lib/cn";
import { navigation } from "../../lib/navigation";
import { useAuth } from "../../hooks/useAuth";

const PIN_KEY = "atlas.prefs.railPinned";

function loadPinned(): boolean {
  try {
    return localStorage.getItem(PIN_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * Desktop navigation rail.
 *
 * 72px slim rail that expands to 240px. Active route is marked by a 2px
 * vertical accent line plus a tinted surface — no pill, no shadow.
 *
 * Expansion works two ways on purpose:
 *   - hover, for pointer users
 *   - an explicit pin toggle, persisted to localStorage
 *
 * The toggle is not a nicety. The `lg:` breakpoint is 1024px, which is exactly
 * iPad landscape width, and touch devices have no hover — so hover-only
 * expansion left those users with an icon-only rail they could never label.
 */
export default function Sidebar() {
  const { user } = useAuth();
  const [pinned, setPinned] = useState(loadPinned);

  useEffect(() => {
    try {
      localStorage.setItem(PIN_KEY, String(pinned));
    } catch {
      // Non-fatal: the rail simply won't remember the preference.
    }
  }, [pinned]);

  // When pinned, labels are always shown. When not, they fade in on hover.
  const labelVisibility = pinned
    ? "opacity-100"
    : "opacity-0 group-hover:opacity-100";

  return (
    <aside
      className={cn(
        "group hidden shrink-0 overflow-hidden border-r border-border-primary bg-surface-primary lg:flex lg:flex-col",
        "transition-[width] duration-300 ease-in-out",
        pinned ? "w-[240px]" : "w-[72px] hover:w-[240px]",
      )}
    >
      {/* Brand + pin toggle */}
      <div className="flex h-14 w-[240px] shrink-0 items-center border-b border-border-primary pl-[22px] pr-3">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-micro font-bold text-white">
          A
        </div>

        <div
          className={cn(
            "ml-4 flex min-w-0 flex-1 flex-col whitespace-nowrap transition-opacity duration-200",
            labelVisibility,
          )}
        >
          <span className="text-sm font-bold tracking-tight text-text-primary">
            ATLAS
          </span>
          <span className="meta-mono text-[10px] text-text-muted">
            Command Center
          </span>
        </div>

        <button
          onClick={() => setPinned((p) => !p)}
          aria-pressed={pinned}
          aria-label={pinned ? "Collapse navigation" : "Keep navigation expanded"}
          title={pinned ? "Collapse navigation" : "Keep navigation expanded"}
          className={cn(
            "focus-ring flex size-8 shrink-0 items-center justify-center rounded-lg text-text-muted transition-opacity duration-200 hover:bg-surface-tertiary hover:text-text-secondary",
            labelVisibility,
          )}
        >
          {pinned ? (
            <PanelLeftClose size={16} strokeWidth={1.5} />
          ) : (
            <PanelLeftOpen size={16} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Destinations */}
      <nav className="flex w-[240px] flex-1 flex-col gap-0.5 overflow-y-auto overflow-x-hidden py-3">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "focus-ring-inset relative flex h-10 shrink-0 items-center border-l-2 pl-[22px] pr-4 transition-colors duration-[var(--transition-fast)]",
                  isActive
                    ? "border-brand-500 bg-gradient-to-r from-brand-500/15 to-transparent text-brand-400"
                    : "border-transparent text-text-tertiary hover:bg-surface-tertiary hover:text-text-secondary",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className="glow-accent-sm pointer-events-none absolute -left-px top-1/2 h-6 w-px -translate-y-1/2 bg-brand-400"
                      aria-hidden="true"
                    />
                  )}
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className={cn(
                      "-ml-0.5 shrink-0",
                      isActive ? "text-brand-400" : "text-current",
                    )}
                  />
                  <span
                    className={cn(
                      "label-mono ml-4 whitespace-nowrap transition-opacity duration-200",
                      labelVisibility,
                    )}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Identity */}
      <div className="w-[240px] shrink-0 border-t border-border-primary px-[22px] py-3">
        <div className="flex items-center">
          {user ? (
            <img
              src={user.avatar}
              alt=""
              className="size-7 shrink-0 rounded-lg border border-border-primary"
            />
          ) : (
            <div className="size-7 shrink-0 rounded-lg bg-surface-overlay" />
          )}
          <div
            className={cn(
              "ml-4 min-w-0 whitespace-nowrap transition-opacity duration-200",
              labelVisibility,
            )}
          >
            <p className="truncate text-xs font-medium text-text-primary">
              {user?.name}
            </p>
            <p className="meta-mono truncate text-[10px] text-text-muted">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
