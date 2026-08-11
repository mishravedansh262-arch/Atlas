import SectionCard from "../ui/SectionCard";
import { cn } from "../../lib/cn";

export default function SettingsAppearance() {
  return (
    <div className="space-y-4">
      <SectionCard title="Theme" description="Choose your preferred visual theme.">
        <div className="flex gap-3">
          {[
            { id: "dark", label: "Dark", active: true },
            { id: "light", label: "Light", active: false },
            { id: "system", label: "System", active: false },
          ].map((theme) => (
            <button
              key={theme.id}
              className={cn(
                "rounded-lg border px-4 py-2.5 text-xs font-medium transition-colors",
                theme.active
                  ? "border-brand-500 bg-brand-600/10 text-brand-400"
                  : "border-border-secondary bg-surface-tertiary text-text-secondary hover:border-border-hover hover:text-text-primary",
              )}
            >
              {theme.label}
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Accent Color" description="Customize the UI accent color.">
        <div className="flex gap-2">
          {["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"].map((color) => (
            <button
              key={color}
              className={cn(
                "size-8 rounded-full ring-2 ring-offset-2 ring-offset-surface-secondary transition-transform hover:scale-110",
                color === "#3b82f6" ? "ring-text-primary" : "ring-transparent",
              )}
              style={{ backgroundColor: color }}
              aria-label={`Select ${color} accent`}
            />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
