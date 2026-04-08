import { Skeleton } from 'boneyard-js/react'
import type { GitHubUser } from '../types/github'

interface UserProfileProps {
  user: GitHubUser | null
  loading: boolean
}

export function UserProfile({ user, loading }: UserProfileProps) {
  return (
    <Skeleton
      name="user-profile"
      loading={loading}
      className="rounded-2xl"
      fixture={<UserProfileContent user={null} />}
      fallback={<UserProfileFallback />}
    >
      <UserProfileContent user={user} />
    </Skeleton>
  )
}

function UserProfileContent({ user }: { user: GitHubUser | null }) {
  if (!user) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
        <p className="text-slate-400">Search for a GitHub user to view profile details.</p>
      </div>
    )
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <img src={user.avatar_url} alt={user.login} className="h-24 w-24 rounded-2xl object-cover border border-slate-700" />
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{user.name || user.login}</h2>
          <p className="text-sky-300">@{user.login}</p>
          <p className="text-slate-300 max-w-2xl">{user.bio || 'No bio provided.'}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <Stat label="Followers" value={user.followers.toLocaleString()} />
        <Stat label="Public Repos" value={user.public_repos.toLocaleString()} />
        <Stat label="Profile" value="Open" asLink href={user.html_url} />
        <Stat label="Account" value="GitHub" />
      </div>
    </section>
  )
}

function Stat({
  label,
  value,
  asLink = false,
  href,
}: {
  label: string
  value: string
  asLink?: boolean
  href?: string
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-xs uppercase tracking-widest text-slate-400">{label}</p>
      {asLink && href ? (
        <a href={href} target="_blank" rel="noreferrer" className="text-xl font-bold text-sky-300 hover:text-sky-200">
          {value}
        </a>
      ) : (
        <p className="text-xl font-bold">{value}</p>
      )}
    </div>
  )
}

function UserProfileFallback() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <div className="h-24 w-24 rounded-2xl bg-slate-800" />
        <div className="space-y-3 flex-1">
          <div className="h-8 w-2/3 rounded bg-slate-800" />
          <div className="h-4 w-1/3 rounded bg-slate-800" />
          <div className="h-4 w-full rounded bg-slate-800" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <div className="h-20 rounded-xl bg-slate-800" />
        <div className="h-20 rounded-xl bg-slate-800" />
        <div className="h-20 rounded-xl bg-slate-800" />
        <div className="h-20 rounded-xl bg-slate-800" />
      </div>
    </section>
  )
}
