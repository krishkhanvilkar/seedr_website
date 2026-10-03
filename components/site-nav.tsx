import { Button } from "@/components/ui/button"
import { SeedrMark } from "@/components/seedr-mark"

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        <a href="#hero" className="flex items-center gap-2.5" aria-label="Seedr home">
          <span className="flex size-7 items-center justify-center rounded-full border border-zinc-300/50 bg-gradient-to-br from-gray-100 via-zinc-400 to-zinc-900 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]">
            <SeedrMark className="size-3.5 text-[#0a0a0a]" />
          </span>
          <span className="text-base font-semibold tracking-tighter text-white">Seedr</span>
        </a>
        <Button
          asChild
          size="sm"
          className="rounded-full border border-red-500/20 bg-white px-5 font-semibold tracking-tight text-black shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-shadow duration-500 hover:bg-white/90 hover:shadow-[0_0_24px_rgba(220,38,38,0.45)]"
        >
          <a href="#ecosystem">Request Access</a>
        </Button>
      </nav>
    </header>
  )
}
