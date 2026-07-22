export default function QuickActions() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <h2 className="mb-4 text-lg font-semibold">
        Quick Actions
      </h2>

      <div className="space-y-3">
        <button className="w-full rounded-lg bg-blue-600 py-2">
          Create Project
        </button>

        <button className="w-full rounded-lg bg-zinc-800 py-2">
          New Task
        </button>
      </div>
    </div>
  );
}