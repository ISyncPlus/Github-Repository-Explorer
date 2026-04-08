import { useCallback, useMemo, useState } from 'react'
import { AppShell } from '../components/AppShell'
import { Filters } from '../components/Filters'
import { RepoList } from '../components/RepoList'
import { SearchBar } from '../components/SearchBar'
import { UserProfile } from '../components/UserProfile'
import { useGitHubUser } from '../hooks/useGitHubUser'
import type { RepoSortKey } from '../types/github'
import { pushSearchHistory, readSearchHistory } from '../utils/history'

export function ExplorerPage() {
  const { user, repos, loading, error, fetchUser } = useGitHubUser()
  const [hasSearched, setHasSearched] = useState(false)
  const [history, setHistory] = useState<string[]>(() => readSearchHistory())
  const [nameFilter, setNameFilter] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [sortBy, setSortBy] = useState<RepoSortKey>('updated')

  const languages = useMemo(() => {
    return Array.from(
      new Set(repos.map((repo) => repo.language).filter((language): language is string => Boolean(language))),
    ).sort((a, b) => a.localeCompare(b))
  }, [repos])

  const filteredAndSortedRepos = useMemo(() => {
    const normalizedNameFilter = nameFilter.trim().toLowerCase()

    const filtered = repos.filter((repo) => {
      const matchesName = repo.name.toLowerCase().includes(normalizedNameFilter)
      const matchesLanguage = selectedLanguage === 'all' || repo.language === selectedLanguage
      return matchesName && matchesLanguage
    })

    return filtered.sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count
      }

      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }

      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })
  }, [repos, nameFilter, selectedLanguage, sortBy])

  const performSearch = useCallback(
    async (username: string) => {
      const normalized = username.trim()
      if (!normalized) {
        return
      }

      setHasSearched(true)
      const success = await fetchUser(normalized)
      if (!success) {
        return
      }

      setHistory((prev) => pushSearchHistory(prev, normalized))
    },
    [fetchUser],
  )

  const handleSubmitSearch = useCallback(
    (username: string) => {
      void performSearch(username)
    },
    [performSearch],
  )

  const handleDebouncedSearch = useCallback(
    (username: string) => {
      const normalized = username.trim()
      if (!normalized) {
        return
      }

      void performSearch(normalized)
    },
    [performSearch],
  )

  const handleHistorySelect = useCallback(
    (username: string) => {
      void performSearch(username)
    },
    [performSearch],
  )

  const handleClearFilters = useCallback(() => {
    setNameFilter('')
    setSelectedLanguage('all')
    setSortBy('updated')
  }, [])

  return (
    <AppShell>
      <section className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none">
          Query the <span className="text-sky-400">Source</span>
        </h1>
        <p className="text-slate-300 max-w-2xl text-lg">
          Search by GitHub username to inspect profile metadata and repositories with fast client-side filtering.
        </p>
      </section>

      <SearchBar
        loading={loading}
        historyItems={history}
        onSearch={handleSubmitSearch}
        onDebouncedSearch={handleDebouncedSearch}
        onHistorySelect={handleHistorySelect}
      />

      {error ? (
        <section className="rounded-2xl border border-rose-700/60 bg-rose-950/40 p-5">
          <h2 className="text-lg font-bold text-rose-200">Search error</h2>
          <p className="text-rose-100/90 mt-1">{error}</p>
        </section>
      ) : null}

      <UserProfile user={user} loading={loading} />

      <Filters
        nameFilter={nameFilter}
        selectedLanguage={selectedLanguage}
        languages={languages}
        sortBy={sortBy}
        onNameFilterChange={setNameFilter}
        onLanguageChange={setSelectedLanguage}
        onSortChange={setSortBy}
        onClear={handleClearFilters}
      />

      <RepoList
        repos={filteredAndSortedRepos}
        loading={loading}
        hasSearched={hasSearched}
        totalRepoCount={repos.length}
      />
    </AppShell>
  )
}
