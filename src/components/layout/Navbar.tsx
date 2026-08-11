import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { cn } from "../../lib/cn";
import { useAuth } from "../../hooks/useAuth";
import { extractApiError } from "../../lib/api";

type NavbarProps = {
  onMenuToggle: () => void;
};

function Navbar({ onMenuToggle }: NavbarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      toast.success("You have been logged out.");
      navigate("/login", { replace: true });
    } catch (error) {
      const apiError = extractApiError(error);
      toast.error(apiError.message);
    }
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-border-secondary bg-surface-primary px-4 lg:px-6">
      {/* Left: Mobile menu + Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-lg p-2 text-text-tertiary transition-colors hover:bg-surface-elevated hover:text-text-secondary lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        <div className="hidden items-center gap-2 rounded-lg border border-border-secondary bg-surface-secondary px-3 py-1.5 sm:flex">
          <Search size={14} className="text-text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="w-40 bg-transparent text-xs text-text-primary outline-none placeholder:text-text-muted lg:w-56"
          />
          <kbd className="hidden rounded border border-border-primary bg-surface-tertiary px-1.5 py-0.5 text-[10px] text-text-muted md:inline-block">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          className="relative rounded-lg p-2 text-text-tertiary transition-colors hover:bg-surface-elevated hover:text-text-secondary"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-brand-500" />
        </button>

        {/* Avatar */}
        <button
          className={cn(
            "flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-surface-elevated",
          )}
        >
          {user ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="size-7 rounded-full ring-1 ring-border-primary"
            />
          ) : (
            <div className="size-7 rounded-full bg-surface-overlay" />
          )}
          <span className="hidden text-xs font-medium text-text-secondary md:block">
            {user?.name?.split(" ")[0]}
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          aria-label="Log out"
          className="rounded-lg p-2 text-text-tertiary transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
