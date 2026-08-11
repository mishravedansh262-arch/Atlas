import SectionCard from "../ui/SectionCard";
import { useAuth } from "../../hooks/useAuth";

export default function SettingsAccount() {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <SectionCard title="Personal Information" description="Update your account details.">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={user?.name ?? ""}
              className="w-full rounded-lg border border-border-secondary bg-surface-tertiary px-3.5 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">
              Email
            </label>
            <input
              type="email"
              defaultValue={user?.email ?? ""}
              className="w-full rounded-lg border border-border-secondary bg-surface-tertiary px-3.5 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <button className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-700">
            Save Changes
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Danger Zone" description="Permanent account actions.">
        <button className="rounded-lg border border-error/30 bg-error/5 px-4 py-2 text-xs font-medium text-error transition-colors hover:bg-error/10">
          Delete Account
        </button>
      </SectionCard>
    </div>
  );
}
