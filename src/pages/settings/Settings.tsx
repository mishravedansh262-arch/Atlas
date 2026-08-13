import { useState } from "react";
import { UserCircle, Palette, Bell, Shield } from "lucide-react";

import { cn } from "../../lib/cn";
import PageHeader from "../../components/ui/PageHeader";
import SettingsAccount from "../../components/settings/SettingsAccount";
import SettingsAppearance from "../../components/settings/SettingsAppearance";
import SettingsNotifications from "../../components/settings/SettingsNotifications";
import SettingsSecurity from "../../components/settings/SettingsSecurity";

type SettingsSection = "account" | "appearance" | "notifications" | "security";

const sections: { id: SettingsSection; label: string; icon: typeof UserCircle }[] = [
  { id: "account", label: "Account", icon: UserCircle },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

export default function Settings() {
  const [active, setActive] = useState<SettingsSection>("account");

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account preferences and application settings."
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Navigation */}
        <nav className="w-full shrink-0 lg:w-48">
          <div className="flex gap-1 overflow-x-auto lg:flex-col">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActive(section.id)}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                    active === section.id
                      ? "bg-brand-500/10 text-brand-400"
                      : "text-text-secondary hover:bg-surface-elevated hover:text-text-primary",
                  )}
                >
                  <Icon size={15} />
                  {section.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {active === "account" && <SettingsAccount />}
          {active === "appearance" && <SettingsAppearance />}
          {active === "notifications" && <SettingsNotifications />}
          {active === "security" && <SettingsSecurity />}
        </div>
      </div>
    </div>
  );
}
