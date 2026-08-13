import { NavLink } from "react-router-dom";

import { cn } from "../../lib/cn";
import { navigation } from "../../lib/navigation";
import { useAuth } from "../../hooks/useAuth";

/**
 * Desktop navigation rail.
 *
 * Per the design spec: 72px slim rail that expands to 240px on hover.
 * Active route is marked by a 2px vertical accent line on the far left
 * plus a tinted surface — no pill, no shadow.
 */
export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside
      className={cn(
        "group hidden shrink-0 overflow-hidden border-r border-border-primary bg-surface-primary",
        "w-[72px] transition-[width] duration-300 ease-in-out hover:w-[240px] lg:flex lg:flex-col",
      )}
    >
      {/* Brand */}
      <div className="flex h-14 w-[240px] shrink-0 items-center border-b border-border-primary px-[22px]">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-[11px] font-bold text-white">
          A
        </div>
        <div className="ml-4 flex flex-col whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="text-sm font-bold tracking-tight text-text-primary">
            ATLAS
          </span>
          <span className="meta-mono text-[10px] text-text-muted">
            Command Center
          </span>
        </div>
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
                  "flex h-10 shrink-0 items-center border-l-2 pl-[22px] pr-4 transition-colors duration-[var(--transition-fast)]",
                  isActive
                    ? "border-brand-500 bg-brand-500/10 text-brand-400"
                    : "border-transparent text-text-tertiary hover:bg-surface-tertiary hover:text-text-secondary",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className={cn(
                      "-ml-0.5 shrink-0",
                      isActive ? "text-brand-400" : "text-current",
                    )}
                  />
                  <span className="label-mono ml-4 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
          <div className="ml-4 min-w-0 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
