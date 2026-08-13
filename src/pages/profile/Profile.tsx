import { useState } from "react";
import { Calendar, FolderKanban, CheckSquare, Target } from "lucide-react";
import { toast } from "sonner";

import PageHeader from "../../components/ui/PageHeader";
import SectionCard from "../../components/ui/SectionCard";
import Spinner from "../../components/ui/Spinner";
import { useAuth } from "../../hooks/useAuth";
import { useProfile, useUpdateProfile } from "../../hooks/useProfile";
import { useProjects } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";
import { extractApiError } from "../../lib/api";

export default function Profile() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const { data: projects } = useProjects();
  const { data: tasks } = useTasks();
  const updateMutation = useUpdateProfile();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    branch: "",
    university: "",
    year: "",
    semester: "",
    skills: "",
    interests: "",
  });

  function startEdit() {
    if (!profile) return;
    setForm({
      name: profile.name,
      bio: profile.bio,
      branch: profile.branch,
      university: profile.university,
      year: profile.year?.toString() ?? "",
      semester: profile.semester?.toString() ?? "",
      skills: profile.skills.join(", "),
      interests: profile.interests.join(", "),
    });
    setEditing(true);
  }

  async function handleSave() {
    try {
      await updateMutation.mutateAsync({
        name: form.name || undefined,
        bio: form.bio || undefined,
        branch: form.branch || undefined,
        university: form.university || undefined,
        year: form.year ? Number(form.year) : undefined,
        semester: form.semester ? Number(form.semester) : undefined,
        skills: form.skills ? form.skills.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
        interests: form.interests ? form.interests.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
      });
      toast.success("Profile updated!");
      setEditing(false);
    } catch (error) {
      toast.error(extractApiError(error).message);
    }
  }

  const completedProjects = projects?.filter((p) => p.status === "completed").length ?? 0;
  const completedTasks = tasks?.filter((t) => t.status === "completed").length ?? 0;
  const totalProjects = projects?.length ?? 0;

  const inputClass = "w-full rounded-lg border border-border-secondary bg-surface-tertiary px-3 py-2 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-500 focus:ring-1 focus:ring-brand-500";
  const labelClass = "mb-1.5 block text-xs font-medium text-text-secondary";

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHeader title="Profile" />
        <div className="flex justify-center py-16"><Spinner size={24} className="text-brand-400" /></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader title="Profile" />

      {/* Hero card */}
      <div className="rounded-xl border border-border-secondary bg-surface-secondary p-6">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <img
            src={user?.avatar ?? ""}
            alt={user?.name ?? "User"}
            className="size-16 rounded-full ring-2 ring-border-secondary"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-text-primary">{profile?.name ?? user?.name}</h2>
            <p className="text-sm text-text-secondary">{profile?.email ?? user?.email}</p>
            {profile?.branch && (
              <p className="mt-1 text-xs text-text-tertiary">
                {profile.branch}{profile.year ? ` — Year ${profile.year}` : ""}{profile.semester ? `, Sem ${profile.semester}` : ""}
              </p>
            )}
            {profile?.university && <p className="text-xs text-text-tertiary">{profile.university}</p>}
          </div>
          {!editing && (
            <button
              onClick={startEdit}
              className="shrink-0 rounded-lg border border-border-secondary bg-surface-tertiary px-3.5 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
            >
              Edit Profile
            </button>
          )}
        </div>

        {profile?.bio && !editing && (
          <p className="mt-4 border-t border-border-secondary pt-4 text-xs leading-relaxed text-text-secondary">
            {profile.bio}
          </p>
        )}
      </div>

      {/* Edit form */}
      {editing && (
        <div className="rounded-xl border border-brand-500/20 bg-surface-secondary p-6">
          <h3 className="mb-4 text-sm font-semibold text-text-primary">Edit Profile</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>University</label>
                <input type="text" value={form.university} onChange={(e) => setForm((f) => ({ ...f, university: e.target.value }))} placeholder="Your university" className={inputClass} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Branch</label>
                <input type="text" value={form.branch} onChange={(e) => setForm((f) => ({ ...f, branch: e.target.value }))} placeholder="e.g. Computer Science" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Year</label>
                <input type="number" min={1} max={6} value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Semester</label>
                <input type="number" min={1} max={12} value={form.semester} onChange={(e) => setForm((f) => ({ ...f, semester: e.target.value }))} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Bio</label>
              <textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} rows={3} placeholder="A short bio about yourself..." className={inputClass + " resize-none"} />
            </div>
            <div>
              <label className={labelClass}>Skills (comma-separated)</label>
              <input type="text" value={form.skills} onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))} placeholder="React, TypeScript, Python" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Interests (comma-separated)</label>
              <input type="text" value={form.interests} onChange={(e) => setForm((f) => ({ ...f, interests: e.target.value }))} placeholder="System Design, Open Source, ML" className={inputClass} />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSave}
                disabled={updateMutation.isPending}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
              >
                {updateMutation.isPending && <Spinner />}
                Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="rounded-lg px-4 py-2 text-xs font-medium text-text-secondary hover:text-text-primary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { icon: FolderKanban, label: "Projects", value: totalProjects },
          { icon: CheckSquare, label: "Tasks Done", value: completedTasks },
          { icon: Target, label: "Completed Projects", value: completedProjects },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-border-secondary bg-surface-secondary p-4">
              <div className="rounded-lg bg-surface-elevated p-2 text-text-tertiary"><Icon size={16} /></div>
              <div>
                <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                <p className="text-[11px] text-text-muted">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skills & Interests */}
      {!editing && (
        <div className="grid gap-4 lg:grid-cols-2">
          {(profile?.skills?.length ?? 0) > 0 && (
            <SectionCard title="Technical Skills">
              <div className="flex flex-wrap gap-1.5">
                {profile!.skills.map((skill) => (
                  <span key={skill} className="rounded-md border border-border-secondary bg-surface-tertiary px-2.5 py-1 text-xs text-text-secondary">{skill}</span>
                ))}
              </div>
            </SectionCard>
          )}
          {(profile?.interests?.length ?? 0) > 0 && (
            <SectionCard title="Interests">
              <div className="flex flex-wrap gap-1.5">
                {profile!.interests.map((interest) => (
                  <span key={interest} className="rounded-md border border-brand-500/20 bg-brand-600/5 px-2.5 py-1 text-xs text-brand-400">{interest}</span>
                ))}
              </div>
            </SectionCard>
          )}
        </div>
      )}

      {/* Journey */}
      {profile?.createdAt && (
        <SectionCard title="Journey">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Calendar size={13} className="text-text-muted" />
            <span>Joined ATLAS on {new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
