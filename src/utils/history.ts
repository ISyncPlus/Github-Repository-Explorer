const STORAGE_KEY = 'github-repo-explorer-history'
const HISTORY_LIMIT = 5

export function readSearchHistory(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((item): item is string => typeof item === 'string').slice(0, HISTORY_LIMIT)
  } catch {
    return []
  }
}

export function writeSearchHistory(history: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, HISTORY_LIMIT)))
}

export function pushSearchHistory(history: string[], username: string) {
  const normalized = username.trim().toLowerCase()
  if (!normalized) {
    return history
  }

  const next = [normalized, ...history.filter((entry) => entry !== normalized)].slice(0, HISTORY_LIMIT)
  writeSearchHistory(next)
  return next
}
