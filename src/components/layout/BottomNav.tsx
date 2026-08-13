import { NavLink } from "react-router-dom";

import { cn } from "../../lib/cn";
import { primaryNavigation } from "../../lib/navigation";

/**
 * Mobile bottom navigation.
 *
 * Per the design spec, mobile switches from a rail/drawer to a fixed
 * bottom bar. Carries the five primary work destinations; Profile and
 * Settings live in the mobile top bar.
 */
export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex h-[68px] items-stretch border-t border-border-primary bg-surface-primary/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      {primaryNavigation.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "relative flex flex-1 flex-col items-center justify-center gap-1 transition-colors duration-[var(--transition-fast)]",
                isActive ? "text-brand-400" : "text-text-muted active:text-text-secondary",
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                <span className="meta-mono text-[9px] leading-none">{item.name}</span>
                {isActive && (
                  <span className="absolute top-0 h-0.5 w-8 rounded-full bg-brand-500" />
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
