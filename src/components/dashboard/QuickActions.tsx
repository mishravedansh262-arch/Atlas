import { Link } from "react-router-dom";
import { Map, FolderKanban, CheckSquare, BarChart3 } from "lucide-react";

import SectionCard from "../ui/SectionCard";
import { buttonClasses } from "../../lib/buttonStyles";

const links = [
  { label: "Roadmap", href: "/roadmap", icon: Map },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

/**
 * Jump-off points to the main sections.
 *
 * Tiles adopt the shared secondary-button styling via `buttonClasses`, so
 * hover, active and focus behaviour match every other control in the app.
 */
export default function QuickActions() {
  return (
    <SectionCard title="Jump to">
      <div className="grid grid-cols-2 gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.label}
              to={link.href}
              className={buttonClasses({
                variant: "secondary",
                size: "sm",
                className: "justify-start",
              })}
            >
              <Icon size={14} strokeWidth={1.5} aria-hidden="true" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </SectionCard>
  );
}
