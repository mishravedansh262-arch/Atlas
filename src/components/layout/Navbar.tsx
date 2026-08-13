import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "../../hooks/useAuth";
import { extractApiError } from "../../lib/api";

type NavbarProps = {
  onMenuToggle: () => void;
};

function Navbar({ onMenuToggle }: NavbarProps) {
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
    <header className="flex h-12 items-center justify-between border-b border-border-secondary bg-surface-primary/80 px-4 backdrop-blur-sm lg:px-6">
      <button
        onClick={onMenuToggle}
        className="rounded-md p-1.5 text-text-tertiary transition-colors hover:bg-surface-elevated hover:text-text-secondary lg:hidden"
        aria-label="Toggle menu"
      >
        <Menu size={18} />
      </button>

      <div className="lg:hidden" />

      <button
        onClick={handleLogout}
        aria-label="Log out"
        className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-elevated hover:text-text-secondary"
      >
        <LogOut size={15} />
      </button>
    </header>
  );
}

export default Navbar;
