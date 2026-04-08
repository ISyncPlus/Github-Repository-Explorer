import { Skeleton } from 'boneyard-js/react'
import type { GitHubRepo } from '../types/github'
import { RepoItem } from './RepoItem'

interface RepoListProps {
  repos: GitHubRepo[]
  loading: boolean
  hasSearched: boolean
  totalRepoCount: number
  filteredRepoCount: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function RepoList({
  repos,
  loading,
  hasSearched,
  totalRepoCount,
  filteredRepoCount,
  currentPage,
  totalPages,
  onPageChange,
}: RepoListProps) {
  return (
    <Skeleton
      name="repo-list"
      loading={loading}
      className="rounded-2xl"
      fixture={<RepoListFixture />}
      fallback={<RepoListFallback />}
    >
      <RepoListContent
        repos={repos}
        hasSearched={hasSearched}
        totalRepoCount={totalRepoCount}
        filteredRepoCount={filteredRepoCount}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Skeleton>
  )
}

function RepoListContent({
  repos,
  hasSearched,
  totalRepoCount,
  filteredRepoCount,
  currentPage,
  totalPages,
  onPageChange,
}: {
  repos: GitHubRepo[]
  hasSearched: boolean
  totalRepoCount: number
  filteredRepoCount: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (!hasSearched) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-slate-300">
        Search for a user to explore repositories.
      </div>
    )
  }

  if (filteredRepoCount === 0) {
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
    <div className="space-y-4">
      <section className="space-y-4">
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </section>

      {totalPages > 1 ? (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-300">
            Page {currentPage} of {totalPages} ({filteredRepoCount} repositories)
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-500 transition-colors"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-500 transition-colors"
            >
              Next
            </button>
          </div>
        </section>
      ) : null}
    </div>
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
