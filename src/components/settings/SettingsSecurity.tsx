import SectionCard from "../ui/SectionCard";

export default function SettingsSecurity() {
  return (
    <div className="space-y-4">
      <SectionCard title="Change Password" description="Update your account password.">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-border-secondary bg-surface-tertiary px-3.5 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-border-secondary bg-surface-tertiary px-3.5 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-border-secondary bg-surface-tertiary px-3.5 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <button className="rounded-lg bg-brand-500 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-600">
            Update Password
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Sessions" description="Manage your active sessions.">
        <div className="rounded-lg border border-border-secondary bg-surface-tertiary px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-text-primary">Current Session</p>
              <p className="text-[11px] text-text-tertiary">macOS — Chrome — Active now</p>
            </div>
            <span className="size-2 rounded-full bg-success" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
