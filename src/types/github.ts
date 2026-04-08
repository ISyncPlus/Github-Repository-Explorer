export interface GitHubUser {
  id: number
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  followers: number
  public_repos: number
  html_url: string
}

export interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
}

export type RepoSortKey = 'stars' | 'updated' | 'name'
