import SectionCard from "../ui/SectionCard";

type ToggleProps = {
  label: string;
  description: string;
  defaultChecked?: boolean;
};

function Toggle({ label, description, defaultChecked = false }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <p className="text-xs font-medium text-text-primary">{label}</p>
        <p className="text-[11px] text-text-tertiary">{description}</p>
      </div>
      <label className="relative inline-flex cursor-pointer">
        <input type="checkbox" className="peer sr-only" defaultChecked={defaultChecked} />
        <div className="h-5 w-9 rounded-full bg-surface-overlay transition-colors after:absolute after:left-[2px] after:top-[2px] after:size-4 after:rounded-full after:bg-text-muted after:transition-all peer-checked:bg-brand-600 peer-checked:after:translate-x-full peer-checked:after:bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500" />
      </label>
    </div>
  );
}

export default function SettingsNotifications() {
  return (
    <div className="space-y-4">
      <SectionCard title="Task Notifications">
        <div className="divide-y divide-border-secondary">
          <Toggle
            label="Due date reminders"
            description="Get notified when a task is due today"
            defaultChecked
          />
          <Toggle
            label="Task completion"
            description="Celebrate when you complete tasks"
            defaultChecked
          />
          <Toggle
            label="Overdue tasks"
            description="Alert when tasks pass their deadline"
            defaultChecked
          />
        </div>
      </SectionCard>

      <SectionCard title="Progress Notifications">
        <div className="divide-y divide-border-secondary">
          <Toggle
            label="Milestone reached"
            description="Notify when you reach a roadmap milestone"
            defaultChecked
          />
          <Toggle
            label="Weekly summary"
            description="Receive a weekly productivity summary"
          />
          <Toggle
            label="Streak alerts"
            description="Remind you to maintain your activity streak"
            defaultChecked
          />
        </div>
      </SectionCard>
    </div>
  );
}
