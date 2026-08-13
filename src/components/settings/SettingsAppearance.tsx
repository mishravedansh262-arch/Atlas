import { useEffect, useState } from "react";
import { toast } from "sonner";

import SectionCard from "../ui/SectionCard";
import { cn } from "../../lib/cn";

const THEME_KEY = "atlas.prefs.theme";
const ACCENT_KEY = "atlas.prefs.accent";

export default function SettingsAppearance() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) ?? "dark");
  const [accent, setAccent] = useState(() => localStorage.getItem(ACCENT_KEY) ?? "#3b82f6");

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(ACCENT_KEY, accent);
  }, [accent]);

  function selectTheme(t: string) {
    setTheme(t);
    toast.success("Theme preference saved.");
  }

  function selectAccent(color: string) {
    setAccent(color);
    toast.success("Accent color saved.");
  }

  return (
    <div className="space-y-4">
      <SectionCard title="Theme" description="Choose your preferred visual theme.">
        <div className="flex gap-3">
          {[
            { id: "dark", label: "Dark" },
            { id: "light", label: "Light" },
            { id: "system", label: "System" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => selectTheme(t.id)}
              className={cn(
                "rounded-lg border px-4 py-2.5 text-xs font-medium transition-colors",
                theme === t.id
                  ? "border-brand-500 bg-brand-500/10 text-brand-400"
                  : "border-border-secondary bg-surface-tertiary text-text-secondary hover:border-border-hover hover:text-text-primary",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        {theme !== "dark" && (
          <p className="mt-3 text-[11px] text-text-muted">
            Note: Only Dark mode is currently available. Light and System modes are coming soon.
          </p>
        )}
      </SectionCard>

      <SectionCard title="Accent Color" description="Customize the UI accent color.">
        <div className="flex gap-2">
          {["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"].map((color) => (
            <button
              key={color}
              onClick={() => selectAccent(color)}
              className={cn(
                "size-8 rounded-full ring-2 ring-offset-2 ring-offset-surface-secondary transition-transform hover:scale-110",
                accent === color ? "ring-text-primary" : "ring-transparent",
              )}
              style={{ backgroundColor: color }}
              aria-label={`Select accent color`}
            />
          ))}
        </div>
        <p className="mt-3 text-[11px] text-text-muted">
          Accent color customization will apply in a future update.
        </p>
      </SectionCard>
    </div>
  );
}
