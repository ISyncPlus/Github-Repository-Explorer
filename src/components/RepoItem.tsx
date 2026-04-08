import type { GitHubRepo } from '../types/github'

interface RepoItemProps {
  repo: GitHubRepo
}

export function RepoItem({ repo }: RepoItemProps) {
  return (
    <article className="border border-[#474747] bg-[#131313] p-5 md:p-6 hover:border-[#2f80ed] transition-colors">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#919191]">Repository Node</p>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-xl font-black uppercase tracking-[0.07em] text-[#e5e2e1] hover:text-[#2f80ed] transition-colors"
          >
            {repo.name}
          </a>
          <p className="text-[#c8c6c5]">{repo.description || 'No description provided.'}</p>
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 px-4 py-2 border border-[#474747] bg-[#0e0e0e] hover:border-[#2f80ed] text-xs font-bold uppercase tracking-[0.14em] text-[#c8c6c5] hover:text-white transition-colors"
        >
          Open Node
        </a>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 text-xs uppercase tracking-[0.12em] text-[#919191]">
        <span>Language: {repo.language || 'Unknown'}</span>
        <span>Stars: {repo.stargazers_count.toLocaleString()}</span>
        <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    </article>
  )
}
