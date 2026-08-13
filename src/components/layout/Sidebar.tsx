import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "../../lib/cn";
import { navigation } from "../../lib/navigation";
import { useAuth } from "../../hooks/useAuth";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const { user } = useAuth();

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-md bg-brand-600 text-xs font-bold text-white">
            A
          </div>
          <span className="text-[13px] font-semibold tracking-tight text-text-primary">
            ATLAS
          </span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-text-tertiary transition-colors hover:bg-surface-elevated hover:text-text-secondary lg:hidden"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-2 py-3">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-[var(--transition-fast)]",
                  isActive
                    ? "bg-surface-elevated text-text-primary"
                    : "text-text-tertiary hover:bg-surface-tertiary hover:text-text-secondary",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={16}
                    strokeWidth={isActive ? 2 : 1.5}
                    className={cn(
                      "shrink-0 transition-colors",
                      isActive ? "text-brand-400" : "text-text-muted group-hover:text-text-tertiary",
                    )}
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User identity */}
      <div className="border-t border-border-secondary p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
          {user ? (
            <img src={user.avatar} alt={user.name} className="size-7 rounded-full" />
          ) : (
            <div className="size-7 rounded-full bg-surface-overlay" />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-text-primary">{user?.name}</p>
            <p className="truncate text-[11px] text-text-muted">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-56 shrink-0 border-r border-border-secondary bg-surface-primary lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/70 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 left-0 z-50 w-60 border-r border-border-secondary bg-surface-primary lg:hidden"
            >
              <SidebarContent onClose={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
