import { Skeleton } from 'boneyard-js/react'
import type { GitHubRepo } from '../types/github'
import { RepoItem } from './RepoItem'

interface RepoListProps {
  repos: GitHubRepo[]
  loading: boolean
  hasSearched: boolean
  totalRepoCount: number
}

export function RepoList({ repos, loading, hasSearched, totalRepoCount }: RepoListProps) {
  return (
    <Skeleton
      name="repo-list"
      loading={loading}
      className="rounded-2xl"
      fixture={<RepoListFixture />}
      fallback={<RepoListFallback />}
    >
      <RepoListContent repos={repos} hasSearched={hasSearched} totalRepoCount={totalRepoCount} />
    </Skeleton>
  )
}

function RepoListContent({
  repos,
  hasSearched,
  totalRepoCount,
}: {
  repos: GitHubRepo[]
  hasSearched: boolean
  totalRepoCount: number
}) {
  if (!hasSearched) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-slate-300">
        Search for a user to explore repositories.
      </div>
    )
  }

  if (repos.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 space-y-2">
        <h3 className="text-xl font-bold">
          {totalRepoCount === 0 ? 'No public repositories found.' : 'No repositories match this view.'}
        </h3>
        <p className="text-slate-300">
          {totalRepoCount === 0
            ? 'This user has not published repositories yet.'
            : 'Try another filter or search for a different user.'}
        </p>
      </div>
    )
  }

  return (
    <section className="space-y-4">
      {repos.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </section>
  )
}

function RepoListFixture() {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 h-32" />
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 h-32" />
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 h-32" />
    </section>
  )
}

function RepoListFallback() {
  return (
    <section className="space-y-4 animate-pulse">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3">
        <div className="h-6 w-1/3 rounded bg-slate-800" />
        <div className="h-4 w-full rounded bg-slate-800" />
        <div className="h-4 w-2/3 rounded bg-slate-800" />
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3">
        <div className="h-6 w-1/3 rounded bg-slate-800" />
        <div className="h-4 w-full rounded bg-slate-800" />
        <div className="h-4 w-2/3 rounded bg-slate-800" />
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-3">
        <div className="h-6 w-1/3 rounded bg-slate-800" />
        <div className="h-4 w-full rounded bg-slate-800" />
        <div className="h-4 w-2/3 rounded bg-slate-800" />
      </div>
    </section>
  )
}
