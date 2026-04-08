import { http } from './http'
import type { GitHubRepo, GitHubUser } from '../types/github'

export async function getGitHubUser(username: string, signal?: AbortSignal) {
  const response = await http.get<GitHubUser>(`/users/${username}`, { signal })
  return response.data
}

export async function getGitHubRepos(username: string, signal?: AbortSignal) {
  const response = await http.get<GitHubRepo[]>(
    `/users/${username}/repos?per_page=30&sort=updated`,
    { signal },
  )
  return response.data
} 
