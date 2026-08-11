import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "../../lib/cn";
import { navigation } from "../../lib/navigation";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex h-16 items-center justify-between border-b border-border-secondary px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            A
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-text-primary">
              ATLAS
            </h1>
            <p className="text-[11px] text-text-tertiary">Productivity OS</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-elevated hover:text-text-secondary lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-text-muted">
          Menu
        </p>
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-[var(--transition-fast)]",
                  isActive
                    ? "bg-brand-600/10 text-brand-400"
                    : "text-text-secondary hover:bg-surface-elevated hover:text-text-primary",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    className={cn(
                      "shrink-0 transition-colors",
                      isActive
                        ? "text-brand-400"
                        : "text-text-tertiary group-hover:text-text-secondary",
                    )}
                  />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="ml-auto size-1.5 rounded-full bg-brand-400" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border-secondary px-5 py-4">
        <p className="text-[11px] text-text-muted">ATLAS v0.1.0</p>
      </div>
    </div>
  );
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-border-secondary bg-surface-primary lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-surface-primary lg:hidden"
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
