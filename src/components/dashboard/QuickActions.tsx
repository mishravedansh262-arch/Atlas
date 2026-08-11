import { Link } from "react-router-dom";
import { Map, FolderKanban, CheckSquare, BarChart3 } from "lucide-react";

const links = [
  { label: "Roadmap", href: "/roadmap", icon: Map },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

export default function QuickActions() {
  return (
    <div className="rounded-xl border border-border-secondary bg-surface-secondary p-5">
      <h2 className="mb-4 text-sm font-semibold text-text-primary">
        Quick Navigation
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.label}
              to={link.href}
              className="flex items-center gap-2 rounded-lg border border-border-secondary bg-surface-tertiary px-3 py-2.5 text-xs font-medium text-text-secondary transition-all duration-[var(--transition-fast)] hover:border-border-hover hover:bg-surface-elevated hover:text-text-primary active:scale-[0.97]"
            >
              <Icon size={14} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
