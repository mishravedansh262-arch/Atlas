import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { cn } from "../../lib/cn";
import { secondaryNavigation } from "../../lib/navigation";
import { useAuth } from "../../hooks/useAuth";
import { extractApiError } from "../../lib/api";

/**
 * Slim top bar.
 *
 * On desktop it carries the wordmark and the logout control — navigation
 * lives in the rail. On mobile it additionally carries Profile and
 * Settings, since the bottom bar holds only primary destinations.
 */
export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

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
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border-primary bg-surface-primary px-4 md:px-6">
      {/* Mobile wordmark */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="flex size-6 items-center justify-center rounded-lg bg-brand-500 text-[10px] font-bold text-white">
          A
        </div>
        <span className="label-mono text-text-secondary">Atlas</span>
      </div>

      <div className="hidden lg:block" />

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Profile + Settings, mobile only (bottom bar has no room) */}
        {secondaryNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              aria-label={item.name}
              className={({ isActive }) =>
                cn(
                  "rounded-lg p-2 transition-colors lg:hidden",
                  isActive
                    ? "text-brand-400"
                    : "text-text-muted hover:bg-surface-tertiary hover:text-text-secondary",
                )
              }
            >
              <Icon size={17} strokeWidth={1.5} />
            </NavLink>
          );
        })}

        <button
          onClick={handleLogout}
          aria-label="Log out"
          className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-tertiary hover:text-text-secondary"
        >
          <LogOut size={16} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
