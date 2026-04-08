import { useCallback, useRef, useState } from 'react'
import axios from 'axios'
import { getGitHubRepos, getGitHubUser } from '../services/githubApi'
import type { GitHubRepo, GitHubUser } from '../types/github'

interface UseGitHubUserState {
  user: GitHubUser | null
  repos: GitHubRepo[]
  loading: boolean
  error: string | null
}

export function useGitHubUser() {
  const [state, setState] = useState<UseGitHubUserState>({
    user: null,
    repos: [],
    loading: false,
    error: null,
  })
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchUser = useCallback(async (username: string) => {
    const normalized = username.trim()
    if (!normalized) {
      setState((prev) => ({
        ...prev,
        user: null,
        repos: [],
        error: 'Please enter a GitHub username.',
        loading: false,
      }))
      return false
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }))

    try {
      const [user, repos] = await Promise.all([
        getGitHubUser(normalized, controller.signal),
        getGitHubRepos(normalized, controller.signal),
      ])

      setState({
        user,
        repos,
        loading: false,
        error: null,
      })

      return true
    } catch (error) {
      if (axios.isCancel(error)) {
        return false
      }

      const status = axios.isAxiosError(error) ? error.response?.status : undefined
      const message =
        status === 404
          ? `User "${normalized}" was not found.`
          : 'Unable to fetch GitHub data. Please try again.'

      setState((prev) => ({
        ...prev,
        loading: false,
        error: message,
      }))
      return false
    }
  }, [])

  return {
    ...state,
    fetchUser,
  }
}
