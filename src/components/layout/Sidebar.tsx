import { NavLink } from "react-router-dom";
import { navigation } from "../../lib/navigation";

function Sidebar() {
  return (
    <aside className="flex h-[calc(100vh-64px)] w-64 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-6">
        <h2 className="text-2xl font-bold tracking-wide text-white">
          🚀 ATLAS
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          AI Productivity OS
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-zinc-800 p-4">
        <p className="text-xs text-zinc-500">
          ATLAS v0.1.0
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;