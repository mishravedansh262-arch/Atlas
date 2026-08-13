import { useEffect, useState } from "react";
import { toast } from "sonner";

import SectionCard from "../ui/SectionCard";

type NotifPrefs = {
  dueReminders: boolean;
  taskCompletion: boolean;
  overdueAlerts: boolean;
  milestoneReached: boolean;
  weeklySummary: boolean;
  streakAlerts: boolean;
};

const STORAGE_KEY = "atlas.prefs.notifications";

function loadPrefs(): NotifPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDefaults();
  } catch {
    return getDefaults();
  }
}

function getDefaults(): NotifPrefs {
  return {
    dueReminders: true,
    taskCompletion: true,
    overdueAlerts: true,
    milestoneReached: true,
    weeklySummary: false,
    streakAlerts: true,
  };
}

type ToggleProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <p className="text-xs font-medium text-text-primary">{label}</p>
        <p className="text-[11px] text-text-tertiary">{description}</p>
      </div>
      <label className="relative inline-flex cursor-pointer">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="h-5 w-9 rounded-full bg-surface-overlay transition-colors after:absolute after:left-[2px] after:top-[2px] after:size-4 after:rounded-full after:bg-text-muted after:transition-all peer-checked:bg-brand-500 peer-checked:after:translate-x-full peer-checked:after:bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500" />
      </label>
    </div>
  );
}

export default function SettingsNotifications() {
  const [prefs, setPrefs] = useState<NotifPrefs>(loadPrefs);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  function update(key: keyof NotifPrefs, value: boolean) {
    setPrefs((prev) => ({ ...prev, [key]: value }));
    toast.success("Preference saved.");
  }

  return (
    <div className="space-y-4">
      <SectionCard title="Task Notifications">
        <div className="divide-y divide-border-secondary">
          <Toggle label="Due date reminders" description="Get notified when a task is due today" checked={prefs.dueReminders} onChange={(v) => update("dueReminders", v)} />
          <Toggle label="Task completion" description="Celebrate when you complete tasks" checked={prefs.taskCompletion} onChange={(v) => update("taskCompletion", v)} />
          <Toggle label="Overdue tasks" description="Alert when tasks pass their deadline" checked={prefs.overdueAlerts} onChange={(v) => update("overdueAlerts", v)} />
        </div>
      </SectionCard>

      <SectionCard title="Progress Notifications">
        <div className="divide-y divide-border-secondary">
          <Toggle label="Milestone reached" description="Notify when you reach a roadmap milestone" checked={prefs.milestoneReached} onChange={(v) => update("milestoneReached", v)} />
          <Toggle label="Weekly summary" description="Receive a weekly productivity summary" checked={prefs.weeklySummary} onChange={(v) => update("weeklySummary", v)} />
          <Toggle label="Streak alerts" description="Remind you to maintain your activity streak" checked={prefs.streakAlerts} onChange={(v) => update("streakAlerts", v)} />
        </div>
      </SectionCard>
    </div>
  );
}
