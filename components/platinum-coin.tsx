import { Button } from '@/components/ui/button'

export function PlatinumCoin() {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10 scale-[1.8] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.14),transparent)] blur-2xl" />
      <div className="coin-float relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-zinc-300/50 bg-gradient-to-br from-gray-100 via-zinc-400 to-zinc-900 p-1 shadow-[inset_0_-4px_10px_rgba(0,0,0,0.6),0_0_40px_rgba(255,255,255,0.15)]">
        <div className="flex h-full w-full items-center justify-center rounded-full border border-white/40 bg-gradient-to-tl from-zinc-300 via-zinc-400 to-zinc-500 shadow-[inset_0_2px_6px_rgba(0,0,0,0.45),inset_0_-1px_2px_rgba(255,255,255,0.6)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon19.png" alt="Seedr seal" className="h-16 w-16 object-contain drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]" />
        </div>
        <span aria-hidden="true" className="coin-shine pointer-events-none absolute inset-0 rounded-full" />
      </div>
      <h2 className="mt-8 text-4xl font-semibold tracking-tight text-white">Join the Inner Circle</h2>
      <Button asChild className="mt-7 rounded-full bg-white px-6 text-black hover:bg-zinc-200"><a href="#request-access">Join Cohort 1</a></Button>
    </div>
  )
}
