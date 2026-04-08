import { useCallback, useEffect, useMemo, useState } from 'react'
import { AppShell } from '../components/AppShell'
import { Filters } from '../components/Filters'
import { RepoList } from '../components/RepoList'
import { SearchBar } from '../components/SearchBar'
import { UserProfile } from '../components/UserProfile'
import { useGitHubUser } from '../hooks/useGitHubUser'
import type { RepoSortKey } from '../types/github'
import { pushSearchHistory, readSearchHistory } from '../utils/history'

const REPOS_PER_PAGE = 6

export function ExplorerPage() {
  const { user, repos, loading, error, fetchUser } = useGitHubUser()
  const [hasSearched, setHasSearched] = useState(false)
  const [history, setHistory] = useState<string[]>(() => readSearchHistory())
  const [nameFilter, setNameFilter] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [sortBy, setSortBy] = useState<RepoSortKey>('updated')
  const [currentPage, setCurrentPage] = useState(1)

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

  const totalFilteredRepos = filteredAndSortedRepos.length
  const totalPages = Math.max(1, Math.ceil(totalFilteredRepos / REPOS_PER_PAGE))

  const paginatedRepos = useMemo(() => {
    const start = (currentPage - 1) * REPOS_PER_PAGE
    const end = start + REPOS_PER_PAGE
    return filteredAndSortedRepos.slice(start, end)
  }, [filteredAndSortedRepos, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [repos, nameFilter, selectedLanguage, sortBy])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

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
      <section className="space-y-4 md:space-y-6 border-l border-[#474747] pl-5 md:pl-7">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#c6c6c6]">Initialize Query</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] uppercase">
          Expose The <span className="text-[#2f80ed]">Archive</span>
        </h1>
        <p className="text-[#c6c6c6] max-w-2xl text-base md:text-lg leading-relaxed">
          Query GitHub identities, inspect metadata, and audit repositories through a compact terminal-inspired surface.
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
        <section className="border border-[#93000a] bg-[#2b1113] px-5 py-4">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#ffb4ab]">Search Error</h2>
          <p className="text-[#ffdad6] mt-2">{error}</p>
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
        repos={paginatedRepos}
        loading={loading}
        hasSearched={hasSearched}
        totalRepoCount={repos.length}
        filteredRepoCount={totalFilteredRepos}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </AppShell>
  )
}
