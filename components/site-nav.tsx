import { Button } from "@/components/ui/button"

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        <a href="#hero" className="flex items-center" aria-label="Seedr home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon19.png" alt="Seedr Logo" className="h-8 w-auto" />
        </a>
        <Button
          asChild
          size="sm"
          className="rounded-full border border-red-500/20 bg-white px-5 font-semibold tracking-tight text-black shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-shadow duration-500 hover:bg-white/90 hover:shadow-[0_0_24px_rgba(220,38,38,0.45)]"
        >
          <a href="#inner-circle">Request Access</a>
        </Button>
      </nav>
    </header>
  )
}
