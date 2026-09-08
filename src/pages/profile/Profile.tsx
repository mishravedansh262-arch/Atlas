import { useState } from "react";
import {
  CalendarDays,
  CheckSquare,
  FolderKanban,
  GraduationCap,
  Lightbulb,
  Pencil,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";

import PageHeader from "../../components/ui/PageHeader";
import PageContainer from "../../components/ui/PageContainer";
import SectionCard from "../../components/ui/SectionCard";
import Spinner from "../../components/ui/Spinner";
import Skeleton from "../../components/ui/Skeleton";
import WidgetError from "../../components/ui/WidgetError";
import ProgressRing from "../../components/ui/ProgressRing";
import { useAuth } from "../../hooks/useAuth";
import { useProfile, useUpdateProfile } from "../../hooks/useProfile";
import { useProjects } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";
import { extractApiError } from "../../lib/api";
import { buttonClasses } from "../../lib/buttonStyles";
import { inputClasses, fieldLabelClasses } from "../../lib/inputStyles";
import { ICON } from "../../lib/iconSizes";
import { cn } from "../../lib/cn";

/** Initials fallback for the avatar. Never renders an empty `src`. */
function initialsOf(name?: string): string {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Academic context, rendered as discrete chips rather than a run-on sentence.
 *
 * The previous "{branch} — Year {n}, Sem {n}" string collapsed to confusing
 * fragments when only some fields were set (a bare "— Year 3", or a trailing
 * comma). Chips degrade cleanly: each is present only if it has a value.
 */
function ContextChips({
  branch,
  year,
  semester,
  university,
}: {
  branch?: string;
  year?: number | null;
  semester?: number | null;
  university?: string;
}) {
  const chips = [
    branch,
    year ? `Year ${year}` : null,
    semester ? `Sem ${semester}` : null,
    university,
  ].filter((v): v is string => !!v);

  if (chips.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <span
          key={chip}
          className="meta-mono rounded-sm border border-border-primary bg-surface-tertiary px-2 py-1 text-text-tertiary"
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

/**
 * A tag list with an explicit empty state.
 *
 * Previously these two cards were unmounted entirely when the arrays were
 * empty, so a user with no skills recorded had no way to discover that the
 * field existed at all.
 */
function TagCard({
  title,
  icon: Icon,
  tags,
  tone,
  emptyHint,
}: {
  title: string;
  icon: typeof Wrench;
  tags: string[];
  tone: "neutral" | "accent";
  emptyHint: string;
}) {
  return (
    <SectionCard
      title={title}
      action={
        <Icon
          size={ICON.sm}
          strokeWidth={1.5}
          className="text-text-muted"
          aria-hidden="true"
        />
      }
    >
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "meta-mono rounded-sm px-2 py-1",
                tone === "accent"
                  ? "border border-brand-500/20 bg-brand-500/10 text-brand-400"
                  : "border border-border-primary bg-surface-tertiary text-text-tertiary",
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs leading-relaxed text-text-muted">{emptyHint}</p>
      )}
    </SectionCard>
  );
}

export default function Profile() {
  const { user } = useAuth();
  const {
    data: profile,
    isPending,
    isError,
    refetch: refetchProfile,
  } = useProfile();
  const {
    data: projects,
    isPending: projectsPending,
    isError: projectsError,
  } = useProjects();
  const {
    data: tasks,
    isPending: tasksPending,
    isError: tasksError,
  } = useTasks();
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

  /** Comma-separated field -> trimmed, de-duplicated, non-empty list. */
  function parseList(value: string): string[] | undefined {
    if (!value.trim()) return undefined;
    return [
      ...new Set(
        value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      ),
    ];
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({
        name: form.name || undefined,
        bio: form.bio || undefined,
        branch: form.branch || undefined,
        university: form.university || undefined,
        year: form.year ? Number(form.year) : undefined,
        semester: form.semester ? Number(form.semester) : undefined,
        skills: parseList(form.skills),
        interests: parseList(form.interests),
      });
      toast.success("Profile updated!");
      setEditing(false);
    } catch (error) {
      toast.error(extractApiError(error).message);
    }
  }

  // Track-record figures. Kept undefined while in flight so a loading query
  // never renders as a real zero.
  const statsPending = projectsPending || tasksPending;
  const statsError = projectsError || tasksError;
  const totalProjects = projects?.length ?? 0;
  const completedProjects =
    projects?.filter((p) => p.status === "completed").length ?? 0;
  const completedTasks =
    tasks?.filter((t) => t.status === "completed").length ?? 0;
  const totalTasks = tasks?.length ?? 0;

  if (isPending) {
    return (
      <PageContainer>
        <PageHeader title="Profile" />
        <Skeleton className="h-[168px] w-full rounded-xl" />
        <Skeleton className="h-[120px] w-full rounded-xl" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-[104px] w-full rounded-xl" />
          <Skeleton className="h-[104px] w-full rounded-xl" />
        </div>
      </PageContainer>
    );
  }

  // A failed profile fetch previously fell through to the rendered page, where
  // the `?? user?.name` fallbacks made an outage look like a blank account.
  if (isError || !profile) {
    return (
      <PageContainer>
        <PageHeader title="Profile" />
        <WidgetError
          variant="card"
          message="Couldn't load your profile."
          onRetry={() => void refetchProfile()}
        />
      </PageContainer>
    );
  }

  const joined = new Date(profile.createdAt);
  const joinedLabel = Number.isNaN(joined.valueOf())
    ? null
    : joined.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return (
    <PageContainer>
      <PageHeader
        title="Profile"
        description="Your identity and track record on ATLAS."
        action={
          !editing && (
            <button onClick={startEdit} className={buttonClasses({ variant: "secondary" })}>
              <Pencil size={ICON.sm} strokeWidth={1.5} aria-hidden="true" />
              Edit profile
            </button>
          )
        }
      />

      {/* Identity. The edit form replaces this card rather than stacking below
          it: showing both meant the old and the pending values were on screen
          at once, with two competing "name" fields. */}
      {editing ? (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-brand-500/30 bg-surface-secondary p-5 sm:p-6"
        >
          <h2 className="label-mono text-text-secondary">Edit profile</h2>

          <div className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="profile-name" className={fieldLabelClasses()}>
                  Name
                </label>
                <input
                  id="profile-name"
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className={inputClasses()}
                />
              </div>
              <div>
                <label
                  htmlFor="profile-university"
                  className={fieldLabelClasses()}
                >
                  University
                </label>
                <input
                  id="profile-university"
                  type="text"
                  value={form.university}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, university: e.target.value }))
                  }
                  placeholder="Your university"
                  className={inputClasses()}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <label htmlFor="profile-branch" className={fieldLabelClasses()}>
                  Branch
                </label>
                <input
                  id="profile-branch"
                  type="text"
                  value={form.branch}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, branch: e.target.value }))
                  }
                  placeholder="e.g. Computer Science"
                  className={inputClasses()}
                />
              </div>
              <div>
                <label htmlFor="profile-year" className={fieldLabelClasses()}>
                  Year
                </label>
                <input
                  id="profile-year"
                  type="number"
                  min={1}
                  max={6}
                  value={form.year}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, year: e.target.value }))
                  }
                  className={inputClasses()}
                />
              </div>
              <div>
                <label
                  htmlFor="profile-semester"
                  className={fieldLabelClasses()}
                >
                  Semester
                </label>
                <input
                  id="profile-semester"
                  type="number"
                  min={1}
                  max={12}
                  value={form.semester}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, semester: e.target.value }))
                  }
                  className={inputClasses()}
                />
              </div>
            </div>

            <div>
              <label htmlFor="profile-bio" className={fieldLabelClasses()}>
                Bio
              </label>
              <textarea
                id="profile-bio"
                value={form.bio}
                onChange={(e) =>
                  setForm((f) => ({ ...f, bio: e.target.value }))
                }
                rows={3}
                placeholder="A short bio about yourself..."
                className={inputClasses({ className: "resize-none" })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="profile-skills" className={fieldLabelClasses()}>
                  Skills
                </label>
                <input
                  id="profile-skills"
                  type="text"
                  value={form.skills}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, skills: e.target.value }))
                  }
                  placeholder="React, TypeScript, Python"
                  aria-describedby="profile-skills-hint"
                  className={inputClasses()}
                />
                <p
                  id="profile-skills-hint"
                  className="meta-mono mt-1.5 text-text-muted"
                >
                  Separate with commas
                </p>
              </div>
              <div>
                <label
                  htmlFor="profile-interests"
                  className={fieldLabelClasses()}
                >
                  Interests
                </label>
                <input
                  id="profile-interests"
                  type="text"
                  value={form.interests}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, interests: e.target.value }))
                  }
                  placeholder="System Design, Open Source, ML"
                  aria-describedby="profile-interests-hint"
                  className={inputClasses()}
                />
                <p
                  id="profile-interests-hint"
                  className="meta-mono mt-1.5 text-text-muted"
                >
                  Separate with commas
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2 border-t border-border-secondary pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setEditing(false)}
              // Cancelling mid-flight would hide the form while the request
              // was still in progress.
              disabled={updateMutation.isPending}
              className={buttonClasses({ variant: "ghost" })}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className={buttonClasses()}
            >
              {updateMutation.isPending && <Spinner />}
              Save changes
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-xl border border-border-primary bg-surface-secondary p-5 sm:p-6">
          <div className="flex flex-col items-start gap-5 sm:flex-row">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className="size-20 shrink-0 rounded-full border border-border-primary bg-surface-tertiary"
              />
            ) : (
              // Guards against the previous `src=""`, which made the browser
              // re-request the current URL and render a broken-image glyph.
              <div
                className="flex size-20 shrink-0 items-center justify-center rounded-full border border-border-primary bg-surface-tertiary text-xl font-semibold text-text-secondary"
                aria-hidden="true"
              >
                {initialsOf(profile.name)}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-xl font-semibold tracking-tight text-text-primary">
                {profile.name}
              </h2>
              <p className="meta-mono mt-1 truncate text-text-tertiary">
                {profile.email}
              </p>
              <ContextChips
                branch={profile.branch}
                year={profile.year}
                semester={profile.semester}
                university={profile.university}
              />
            </div>
          </div>

          {profile.bio ? (
            <p className="mt-5 border-t border-border-secondary pt-5 text-sm leading-relaxed text-text-secondary">
              {profile.bio}
            </p>
          ) : (
            <p className="mt-5 border-t border-border-secondary pt-5 text-xs leading-relaxed text-text-muted">
              No bio yet. Add one so your profile reads as more than a name.
            </p>
          )}
        </div>
      )}

      {/* Track record. Absorbs the former single-line "Journey" card, which
          spent a full surface on one sentence. */}
      <SectionCard
        title="Track record"
        description={
          joinedLabel ? `Member since ${joinedLabel}` : undefined
        }
      >
        {statsError ? (
          <WidgetError message="Couldn't load your activity totals." />
        ) : statsPending ? (
          <div className="flex flex-wrap items-center gap-6">
            <Skeleton className="size-[68px] rounded-full" />
            <Skeleton className="size-[68px] rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-12" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ) : (
          <dl className="flex flex-wrap items-center gap-x-8 gap-y-6">
            {/* Rings encode completed *and* total, so the old separate
                "Projects" / "Completed Projects" tiles are one figure. */}
            <div className="flex items-center gap-3">
              {/* Hidden from assistive tech: the ring would announce a bare
                  "37 percent" ahead of its own label, and the <dd> below
                  already states the ratio in words. */}
              <div aria-hidden="true">
                <ProgressRing
                  value={
                    totalProjects > 0
                      ? (completedProjects / totalProjects) * 100
                      : 0
                  }
                  size={68}
                  tone="accent"
                  label={totalProjects > 0 ? undefined : "—"}
                  glow={totalProjects > 0}
                />
              </div>
              <div>
                <dt className="meta-mono flex items-center gap-1.5 text-text-tertiary">
                  <FolderKanban
                    size={ICON.xs}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  Projects
                </dt>
                <dd className="mt-1 text-sm font-semibold text-text-primary">
                  {totalProjects > 0
                    ? `${completedProjects} of ${totalProjects} done`
                    : "None yet"}
                </dd>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div aria-hidden="true">
                <ProgressRing
                  value={
                    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
                  }
                  size={68}
                  tone="success"
                  label={totalTasks > 0 ? undefined : "—"}
                  glow={totalTasks > 0}
                />
              </div>
              <div>
                <dt className="meta-mono flex items-center gap-1.5 text-text-tertiary">
                  <CheckSquare
                    size={ICON.xs}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  Tasks
                </dt>
                <dd className="mt-1 text-sm font-semibold text-text-primary">
                  {totalTasks > 0
                    ? `${completedTasks} of ${totalTasks} done`
                    : "None yet"}
                </dd>
              </div>
            </div>

            {joinedLabel && (
              <div>
                <dt className="meta-mono flex items-center gap-1.5 text-text-tertiary">
                  <CalendarDays
                    size={ICON.xs}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  Joined
                </dt>
                <dd className="mt-1 text-stat text-text-primary">
                  {joinedLabel}
                </dd>
              </div>
            )}
          </dl>
        )}
      </SectionCard>

      {/* Both cards always render. Unmounting them when empty hid the fields
          from anyone who had not filled them in. */}
      <div className="grid gap-4 lg:grid-cols-2">
        <TagCard
          title="Technical skills"
          icon={Wrench}
          tags={profile.skills}
          tone="neutral"
          emptyHint="No skills listed yet. Add them from Edit profile."
        />
        <TagCard
          title="Interests"
          icon={Lightbulb}
          tags={profile.interests}
          tone="accent"
          emptyHint="No interests listed yet. Add them from Edit profile."
        />
      </div>

      {!profile.branch && !profile.university && (
        <div className="flex items-start gap-3 rounded-xl border border-dashed border-border-primary bg-surface-secondary/40 p-4">
          <GraduationCap
            size={ICON.md}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0 text-text-muted"
            aria-hidden="true"
          />
          <p className="text-xs leading-relaxed text-text-tertiary">
            Add your branch, year and university so ATLAS can frame your
            roadmap around where you actually are in your degree.
          </p>
        </div>
      )}
    </PageContainer>
  );
}
