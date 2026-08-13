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
 */
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-base text-text-primary">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto px-4 py-5 pb-24 md:px-6 lg:px-6 lg:pb-6">
          <div className="page-enter">{children}</div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
