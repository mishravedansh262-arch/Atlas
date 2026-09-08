import { LogOut } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { cn } from "../../lib/cn";
import { navigation, secondaryNavigation } from "../../lib/navigation";
import { useAuth } from "../../hooks/useAuth";
import { extractApiError } from "../../lib/api";

/** Longest-prefix match so nested routes still resolve to their section. */
function useCurrentSection(): string | null {
  const { pathname } = useLocation();

  const match = navigation
    .filter(
      (item) =>
        pathname === item.href || pathname.startsWith(`${item.href}/`),
    )
    .sort((a, b) => b.href.length - a.href.length)[0];

  return match?.name ?? null;
}

/**
 * Slim top bar.
 *
 * Desktop: names the current section — previously this bar held only a spacer
 * and a logout button, so the sole indicator of location was the rail
 * highlight, which is icon-only unless expanded.
 *
 * Mobile: also carries Profile and Settings, since the bottom bar holds only
 * the primary destinations.
 */
export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const section = useCurrentSection();

  async function handleLogout() {
    try {
      await logout();
      toast.success("You have been logged out.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(extractApiError(error).message);
    }
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border-primary bg-surface-primary px-4 md:px-6">
      {/* Mobile wordmark */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="flex size-6 items-center justify-center rounded-lg bg-brand-500 text-micro font-bold text-white">
          A
        </div>
        <span className="label-mono text-text-secondary">Atlas</span>
      </div>

      {/* Desktop page context */}
      <div className="hidden min-w-0 items-center gap-2 lg:flex">
        <span className="size-1 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
        <span className="label-mono truncate text-text-secondary">
          {section ?? "Atlas"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1">
        {secondaryNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              aria-label={item.name}
              className={({ isActive }) =>
                cn(
                  // 44px touch target on mobile; icon size unchanged so
                  // visual density holds.
                  "focus-ring flex size-11 items-center justify-center rounded-lg transition-colors lg:hidden",
                  isActive
                    ? "text-brand-400"
                    : "text-text-muted hover:bg-surface-tertiary hover:text-text-secondary",
                )
              }
            >
              <Icon size={16} strokeWidth={1.5} />
            </NavLink>
          );
        })}

        <button
          onClick={handleLogout}
          aria-label="Log out"
          className="focus-ring flex size-11 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-tertiary hover:text-text-secondary lg:size-9"
        >
          <LogOut size={16} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
