import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
type AppLayoutProps = {
  children: ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
<div className="min-h-screen bg-zinc-950 text-zinc-100">      
  <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;