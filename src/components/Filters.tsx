import type { RepoSortKey } from '../types/github'

interface FiltersProps {
  nameFilter: string
  selectedLanguage: string
  languages: string[]
  sortBy: RepoSortKey
  onNameFilterChange: (value: string) => void
  onLanguageChange: (value: string) => void
  onSortChange: (value: RepoSortKey) => void
  onClear: () => void
}

export function Filters({
  nameFilter,
  selectedLanguage,
  languages,
  sortBy,
  onNameFilterChange,
  onLanguageChange,
  onSortChange,
  onClear,
}: FiltersProps) {
  return (
    <section className="border border-[#474747] bg-[#131313] p-4 md:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#c6c6c6]">Navigation Archive</h2>
        <span className="text-[#2f80ed] text-xs uppercase tracking-[0.2em]">Filters</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#919191]">Filter By Repo Name</span>
          <input
            value={nameFilter}
            onChange={(event) => onNameFilterChange(event.target.value)}
            placeholder="API, CLI, WEB"
            className="w-full bg-[#0e0e0e] border border-[#474747] px-3 py-2.5 text-[#e5e2e1] placeholder:text-[#666] outline-none focus:border-[#2f80ed]"
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#919191]">Filter By Language</span>
          <select
            value={selectedLanguage}
            onChange={(event) => onLanguageChange(event.target.value)}
            className="w-full bg-[#0e0e0e] border border-[#474747] px-3 py-2.5 text-[#e5e2e1] outline-none focus:border-[#2f80ed]"
          >
            <option value="all">All languages</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#919191]">Sort Repositories</span>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as RepoSortKey)}
            className="w-full bg-[#0e0e0e] border border-[#474747] px-3 py-2.5 text-[#e5e2e1] outline-none focus:border-[#2f80ed]"
          >
            <option value="updated">Most Recently Updated</option>
            <option value="stars">Most Stars</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClear}
          className="px-4 py-2 border border-[#474747] bg-[#1b1b1b] text-[#c8c6c5] text-xs uppercase tracking-[0.18em] hover:border-[#2f80ed] hover:text-white transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </section>
  )
}
