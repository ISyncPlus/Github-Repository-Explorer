interface SearchHistoryProps {
  items: string[]
  onSelect: (username: string) => void
}

export function SearchHistory({ items, onSelect }: SearchHistoryProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-[0.2em] text-slate-400">Recent Searches</h2>
        <span className="h-px w-12 bg-slate-700" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {items.map((username) => (
          <button
            key={username}
            type="button"
            onClick={() => onSelect(username)}
            className="px-3 py-2 rounded-xl text-left bg-slate-900 border border-slate-800 hover:border-sky-600 hover:text-sky-300 transition-colors"
          >
            {username}
          </button>
        ))}
      </div>
    </section>
  )
}
