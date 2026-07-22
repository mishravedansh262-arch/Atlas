import { Bell, Search, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="flex h-16 items-center justify-end border-b border-zinc-800 bg-zinc-950 px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl bg-zinc-900 px-3 py-2">
          <Search size={18} className="text-zinc-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </div>

        <button className="rounded-xl bg-zinc-900 p-2 transition hover:bg-zinc-800">
          <Bell size={20} />
        </button>

        <button className="rounded-full bg-zinc-900 p-1 transition hover:bg-zinc-800">
          <UserCircle size={34} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;