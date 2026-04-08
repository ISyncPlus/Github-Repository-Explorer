import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1]">
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,rgba(47,128,237,0.14),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(47,128,237,0.08),transparent_35%)]" />
      <div className="fixed left-0 top-1/2 z-10 hidden -translate-y-1/2 px-2 md:block pointer-events-none">
        <div className="h-64 border-l border-[#474747] relative">
          <div className="absolute top-0 -left-px h-1 w-1 bg-[#2f80ed]" />
          <div className="absolute bottom-0 -left-px h-1 w-1 bg-[#2f80ed]" />
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#474747] bg-[#131313]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 uppercase">
            <div className="h-8 w-8 border border-[#474747] bg-[#1c1b1b] flex items-center justify-center text-[#2f80ed] text-xs font-black">
              G
            </div>
            <div>
              <p className="text-[10px] tracking-[0.28em] text-[#919191]">Core Protocol</p>
              <p className="text-sm tracking-[0.14em] font-bold">GitHub Archive Explorer</p>
            </div>
          </div>

          <span className="text-[#2f80ed] text-xs tracking-[0.25em] uppercase">Explore</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 md:py-14 space-y-8">{children}</main>
    </div>
  )
}
