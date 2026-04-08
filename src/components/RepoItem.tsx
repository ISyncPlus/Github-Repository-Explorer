import type { GitHubRepo } from '../types/github'

interface RepoItemProps {
  repo: GitHubRepo
}

export function RepoItem({ repo }: RepoItemProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:p-6 hover:border-sky-700 transition-colors">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-xl font-bold text-slate-100 hover:text-sky-300 transition-colors"
          >
            {repo.name}
          </a>
          <p className="text-slate-300">{repo.description || 'No description provided.'}</p>
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-semibold"
        >
          View on GitHub
        </a>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-400">
        <span>Language: {repo.language || 'Unknown'}</span>
        <span>Stars: {repo.stargazers_count.toLocaleString()}</span>
        <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    </article>
  )
}
