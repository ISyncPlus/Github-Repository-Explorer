import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="fixed top-0 right-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-sky-600/20 blur-3xl" />
      <div className="fixed bottom-0 left-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-blue-900/30 blur-3xl" />

      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-sky-600/20 border border-sky-400/30 flex items-center justify-center text-sky-300 font-bold">
              G
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Explorer</p>
              <p className="font-semibold">GitHub Repository Explorer</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <span className="text-sky-300">Explore</span>
            <span>Recent</span>
            <span>Profile</span>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 md:py-14 space-y-8">{children}</main>
    </div>
  )
}
