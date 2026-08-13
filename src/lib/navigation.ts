import {
  LayoutDashboard,
  Map,
  FolderKanban,
  CheckSquare,
  BarChart3,
  User,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

/** Full navigation — used by the desktop rail. */
export const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Roadmap", href: "/roadmap", icon: Map },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

/**
 * Primary work destinations — used by the mobile bottom bar.
 * Profile and Settings stay reachable from the mobile top bar so the
 * bottom bar keeps comfortable touch targets.
 */
export const primaryNavigation: NavItem[] = navigation.slice(0, 5);

/** Secondary destinations, surfaced in the mobile top bar. */
export const secondaryNavigation: NavItem[] = navigation.slice(5);
