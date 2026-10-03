import { SeedrMark } from "@/components/seedr-mark"

export function PlatinumCoin() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 scale-150 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent)] blur-2xl"
      />
      <div
        role="img"
        aria-label="Seedr platinum seal"
        className="flex h-32 w-32 items-center justify-center rounded-full border border-zinc-300/50 bg-gradient-to-br from-gray-100 via-zinc-400 to-zinc-900 p-1 shadow-[inset_0_-4px_10px_rgba(0,0,0,0.6),0_10px_30px_rgba(255,255,255,0.1)]"
      >
        <div className="flex h-full w-full items-center justify-center rounded-full border border-white/40 bg-gradient-to-tl from-zinc-200 via-zinc-400 to-zinc-500 shadow-[inset_0_2px_6px_rgba(0,0,0,0.45),inset_0_-1px_2px_rgba(255,255,255,0.6)]">
          <div className="flex h-[70%] w-[70%] items-center justify-center rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.5)]">
            <SeedrMark className="h-9 w-9 text-[#111] drop-shadow-[0_1px_0_rgba(255,255,255,0.55)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
