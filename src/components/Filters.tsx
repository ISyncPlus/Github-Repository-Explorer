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
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-slate-400">Filter by repo name</span>
          <input
            value={nameFilter}
            onChange={(event) => onNameFilterChange(event.target.value)}
            placeholder="e.g. api, cli, web"
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-slate-400">Filter by language</span>
          <select
            value={selectedLanguage}
            onChange={(event) => onLanguageChange(event.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
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
          <span className="text-xs uppercase tracking-widest text-slate-400">Sort repositories</span>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as RepoSortKey)}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
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
          className="px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </section>
  )
}
