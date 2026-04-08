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
        <div className="absolute -inset-3 -z-10 border border-[#2f80ed]/25 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100" />
        <div className="relative border border-[#474747] bg-[#131313] p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex h-10 w-10 items-center justify-center border border-[#474747] bg-[#1c1b1b] text-[#2f80ed] text-sm font-bold">
            @
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#919191] mb-1">Query The Source</p>
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
              placeholder="Type here..."
              className="w-full bg-transparent border-none outline-none text-[#e5e2e1] placeholder:text-[#666] text-sm md:text-base"
              aria-label="GitHub username"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 px-4 sm:px-6 py-3 border border-[#474747] bg-white text-black hover:bg-[#2f80ed] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed text-xs sm:text-sm font-black uppercase tracking-[0.14em] transition-colors"
          >
            {loading ? 'Scanning...' : 'Explore'}
          </button>
        </div>
      </form>

      {shouldShowDropdown ? (
        <div
          id="search-history-dropdown"
          role="listbox"
          aria-label="Recent searches"
          className="absolute z-50 mt-2 w-full overflow-y-auto max-h-64 border border-[#474747] bg-[#131313] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
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
                className={`w-full px-4 py-3 text-left transition-colors border-b border-[#2a2a2a] last:border-b-0 ${
                  isActive
                    ? 'bg-[#152437] text-[#d7e3ff]'
                    : 'text-[#c8c6c5] hover:bg-[#1c1b1b] hover:text-[#2f80ed]'
                }`}
              >
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#919191] mr-3">{String(index + 1).padStart(2, '0')}</span>
                <span className="uppercase tracking-[0.12em] text-xs sm:text-sm font-semibold">{username}</span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
