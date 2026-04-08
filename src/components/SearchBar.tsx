import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import debounce from 'lodash.debounce'

interface SearchBarProps {
  initialValue?: string
  loading: boolean
  historyItems: string[]
  onSearch: (username: string) => void
  onDebouncedSearch: (username: string) => void
  onHistorySelect: (username: string) => void
}

export function SearchBar({
  initialValue = '',
  loading,
  historyItems,
  onSearch,
  onDebouncedSearch,
  onHistorySelect,
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const recentHistory = useMemo(() => historyItems.slice(0, 5), [historyItems])
  const hasTypedValue = value.trim().length > 0
  const shouldShowDropdown = isDropdownOpen && recentHistory.length > 0 && (isFocused || hasTypedValue)

  const debouncedSearch = useMemo(
    () => debounce((query: string) => onDebouncedSearch(query), 550),
    [onDebouncedSearch],
  )

  const openDropdown = useCallback(() => {
    setIsDropdownOpen(true)
  }, [])

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false)
    setActiveIndex(-1)
  }, [])

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node
      if (!rootRef.current?.contains(target)) {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [closeDropdown])

  function handleChange(nextValue: string) {
    setValue(nextValue)
    setActiveIndex(-1)
    openDropdown()
    debouncedSearch(nextValue)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    debouncedSearch.cancel()
    onSearch(value)
    closeDropdown()
  }

  function selectHistoryItem(username: string) {
    debouncedSearch.cancel()
    setValue(username)
    onHistorySelect(username)
    closeDropdown()
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      closeDropdown()
      return
    }

    if (!shouldShowDropdown || recentHistory.length === 0) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((prev) => (prev + 1) % recentHistory.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((prev) => (prev <= 0 ? recentHistory.length - 1 : prev - 1))
      return
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      selectHistoryItem(recentHistory[activeIndex])
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <form onSubmit={handleSubmit} className="relative group">
      <div className="absolute inset-0 bg-sky-500/10 rounded-2xl blur-xl transition-opacity opacity-50 group-focus-within:opacity-100" />
      <div className="relative rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300">@</div>
        <input
          type="text"
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={() => {
            setIsFocused(true)
            openDropdown()
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleInputKeyDown}
          placeholder="Enter GitHub username"
          className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-500 px-2 py-2"
          aria-label="GitHub username"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 px-4 sm:px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-colors"
        >
          {loading ? 'Searching...' : 'Explore'}
        </button>
      </div>
      </form>

      {shouldShowDropdown ? (
        <div
          id="search-history-dropdown"
          role="listbox"
          aria-label="Recent searches"
          className="absolute z-50 mt-2 w-full overflow-y-auto max-h-64 rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-xl shadow-2xl"
        >
          {recentHistory.map((username, index) => {
            const isActive = index === activeIndex
            return (
              <button
                id={`search-history-item-${index}`}
                key={username}
                type="button"
                role="option"
                onMouseDown={(event) => {
                  event.preventDefault()
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectHistoryItem(username)}
                className={`w-full px-4 py-3 text-left transition-colors ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-200'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-sky-200'
                }`}
              >
                {username}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
