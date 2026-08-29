import type { ReactNode } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

type AppLayoutProps = {
  children: ReactNode;
};

/**
 * Authenticated application shell.
 *
 * Desktop: hover-expanding navigation rail + slim top bar.
 * Mobile:  top bar + fixed bottom navigation.
 *
 * The skip link is the first focusable element in the DOM so keyboard users
 * can bypass the seven rail destinations on every page.
 */
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-base text-text-primary">
      <a href="#main-content" className="skip-link label-mono">
        Skip to content
      </a>

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Navbar />

        {/*
          tabIndex={-1} makes this programmatically focusable so the skip link
          actually moves focus here. No visible ring — it's a container, and
          the user's intent was to arrive, not to act on it.
        */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto px-4 py-5 pb-24 focus:outline-none md:px-6 lg:px-6 lg:pb-6"
        >
          <div className="page-enter">{children}</div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
