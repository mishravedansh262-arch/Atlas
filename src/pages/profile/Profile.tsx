import { Calendar, FolderKanban, CheckSquare, Target, Flame } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import { mockProfile } from "../../data/profile";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const profile = { ...mockProfile, name: user?.name ?? mockProfile.name, email: user?.email ?? mockProfile.email };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader title="Profile" />

      {/* Hero card */}
      <div className="rounded-xl border border-border-secondary bg-surface-secondary p-6">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <img
            src={user?.avatar ?? profile.avatar}
            alt={profile.name}
            className="size-16 rounded-full ring-2 ring-border-secondary"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-text-primary">{profile.name}</h2>
            <p className="text-sm text-text-secondary">{profile.email}</p>
            <p className="mt-1 text-xs text-text-tertiary">
              {profile.branch} — Year {profile.year}, Semester {profile.semester}
            </p>
            <p className="text-xs text-text-tertiary">{profile.university}</p>
          </div>
          <button className="shrink-0 rounded-lg border border-border-secondary bg-surface-tertiary px-3.5 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary">
            Edit Profile
          </button>
        </div>

        {profile.bio && (
          <p className="mt-4 border-t border-border-secondary pt-4 text-xs leading-relaxed text-text-secondary">
            {profile.bio}
          </p>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: FolderKanban, label: "Projects", value: profile.stats.projectsCompleted },
          { icon: CheckSquare, label: "Tasks Done", value: profile.stats.tasksCompleted },
          { icon: Target, label: "Milestones", value: profile.stats.milestonesReached },
          { icon: Flame, label: "Day Streak", value: profile.stats.currentStreak },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-border-secondary bg-surface-secondary p-4"
            >
              <div className="rounded-lg bg-surface-elevated p-2 text-text-tertiary">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                <p className="text-[11px] text-text-muted">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Skills */}
        <SectionCard title="Technical Skills">
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border-secondary bg-surface-tertiary px-2.5 py-1 text-xs text-text-secondary"
              >
                {skill}
              </span>
            ))}
          </div>
        </SectionCard>

        {/* Interests */}
        <SectionCard title="Interests & Focus Areas">
          <div className="flex flex-wrap gap-1.5">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-md border border-brand-500/20 bg-brand-600/5 px-2.5 py-1 text-xs text-brand-400"
              >
                {interest}
              </span>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Journey info */}
      <SectionCard title="Journey">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <Calendar size={13} className="text-text-muted" />
          <span>
            Joined ATLAS on{" "}
            {new Date(profile.joinedAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </SectionCard>
    </div>
  );
}
