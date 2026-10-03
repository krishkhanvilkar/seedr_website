import { Button } from "@/components/ui/button"

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        <a href="#hero" className="flex items-center" aria-label="Seedr home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon19.png" alt="Seedr Logo" className="h-8 w-auto mix-blend-luminosity" />
          <span className="ml-3 text-sm font-bold uppercase tracking-[0.2em] text-white">Seedr</span>
        </a>
        <Button
          asChild
          size="sm"
          className="rounded-full border border-white/20 bg-white px-5 font-semibold tracking-tight text-black shadow-[0_0_15px_rgba(255,255,255,0.12)] transition-shadow duration-500 hover:bg-zinc-100 hover:shadow-[0_0_28px_rgba(255,255,255,0.35),0_0_60px_rgba(251,146,60,0.18)]"
        >
          <a href="#request-access">Request Access</a>
        </Button>
      </nav>
    </header>
  )
}
