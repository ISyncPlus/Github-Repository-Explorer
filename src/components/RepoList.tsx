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
      <div className="border border-[#474747] bg-[#131313] p-8 text-[#c8c6c5] uppercase tracking-[0.14em] text-xs">
        Search for a user to explore repositories.
      </div>
    )
  }

  if (filteredRepoCount === 0) {
    return (
      <div className="border border-[#474747] bg-[#131313] p-8 space-y-2">
        <h3 className="text-xl font-black uppercase tracking-[0.08em]">
          {totalRepoCount === 0 ? 'No public repositories found.' : 'No repositories match this view.'}
        </h3>
        <p className="text-[#c8c6c5]">
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
        <section className="border border-[#474747] bg-[#131313] p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-sm text-[#c8c6c5] uppercase tracking-[0.12em]">
            Page {currentPage} of {totalPages} ({filteredRepoCount} repositories)
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-[#474747] bg-[#0e0e0e] text-[#c8c6c5] disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#2f80ed] hover:text-white transition-colors uppercase tracking-[0.12em] text-xs"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-[#474747] bg-[#0e0e0e] text-[#c8c6c5] disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#2f80ed] hover:text-white transition-colors uppercase tracking-[0.12em] text-xs"
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
      <div className="border border-[#474747] bg-[#131313] p-6 h-32" />
      <div className="border border-[#474747] bg-[#131313] p-6 h-32" />
      <div className="border border-[#474747] bg-[#131313] p-6 h-32" />
    </section>
  )
}

function RepoListFallback() {
  return (
    <section className="space-y-4 animate-pulse">
      <div className="border border-[#474747] bg-[#131313] p-6 space-y-3">
        <div className="h-6 w-1/3 bg-[#2a2a2a]" />
        <div className="h-4 w-full bg-[#2a2a2a]" />
        <div className="h-4 w-2/3 bg-[#2a2a2a]" />
      </div>
      <div className="border border-[#474747] bg-[#131313] p-6 space-y-3">
        <div className="h-6 w-1/3 bg-[#2a2a2a]" />
        <div className="h-4 w-full bg-[#2a2a2a]" />
        <div className="h-4 w-2/3 bg-[#2a2a2a]" />
      </div>
      <div className="border border-[#474747] bg-[#131313] p-6 space-y-3">
        <div className="h-6 w-1/3 bg-[#2a2a2a]" />
        <div className="h-4 w-full bg-[#2a2a2a]" />
        <div className="h-4 w-2/3 bg-[#2a2a2a]" />
      </div>
    </section>
  )
}
