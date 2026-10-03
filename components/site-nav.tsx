import { Button } from "@/components/ui/button"

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        <a href="#hero" className="flex items-center" aria-label="Seedr home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon19.png" alt="Seedr Logo" className="h-9 w-auto object-contain drop-shadow-[0_0_10px_rgba(74,222,128,0.16)]" />
          <span className="ml-3 bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-[1.65rem] font-semibold leading-none tracking-[-0.08em] text-transparent">seedr</span>
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
