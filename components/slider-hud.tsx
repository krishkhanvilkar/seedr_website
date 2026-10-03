import { Activity, Lock, Shield, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

export type HudVariant = "signal" | "enclave" | "nodes" | "velocity" | "capital"

const HUD_SHELL =
  "gap-0 rounded-xl border-white/10 bg-black/60 p-6 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"

function HudLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{children}</p>
}

function LiveDot() {
  return (
    <span className="relative flex size-1.5" aria-hidden="true">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
    </span>
  )
}

function SignalHud() {
  return (
    <Card className={HUD_SHELL}>
      <div className="flex items-center justify-between">
        <HudLabel>Signal integrity</HudLabel>
        <LiveDot />
      </div>
      <div className="mt-4 flex items-end justify-between gap-6">
        <p className="text-5xl font-semibold leading-none tracking-tighter">
          100<span className="text-zinc-500">%</span>
        </p>
        <svg viewBox="0 0 160 56" className="h-14 w-40 overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="hud-spark-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 48 L18 44 L34 46 L50 36 L66 38 L82 26 L98 30 L114 18 L130 20 L146 8 L160 6 L160 56 L0 56 Z"
            fill="url(#hud-spark-fill)"
          />
          <path
            d="M0 48 L18 44 L34 46 L50 36 L66 38 L82 26 L98 30 L114 18 L130 20 L146 8 L160 6"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          />
          <circle cx="160" cy="6" r="3" fill="#fff" className="drop-shadow-[0_0_8px_rgba(255,255,255,1)]" />
        </svg>
      </div>
      <p className="mt-4 text-sm text-zinc-400">Zero casual noise. Every member verified by shipped work.</p>
    </Card>
  )
}

function EnclaveHud() {
  return (
    <Card className={HUD_SHELL}>
      <div className="flex items-center gap-5">
        <div className="relative flex size-14 shrink-0 rounded-full border border-white/15 before:absolute before:-inset-2 before:rounded-full before:border before:border-white/5">
          <Shield className="m-auto size-6" strokeWidth={1} aria-hidden="true" />
        </div>
        <div>
          <HudLabel>Secure enclave</HudLabel>
          <p className="mt-1.5 text-xl font-semibold tracking-tight">End-to-End Encrypted</p>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
        <span className="flex items-center gap-2">
          <Lock className="size-3" aria-hidden="true" />
          AES-256 / X25519
        </span>
        <span className="text-emerald-400">Sealed</span>
      </div>
    </Card>
  )
}

const OPERATORS = [
  { initials: "AK", tone: "from-zinc-200 to-zinc-500" },
  { initials: "MR", tone: "from-zinc-400 to-zinc-700" },
  { initials: "JL", tone: "from-zinc-300 to-zinc-600" },
]

function NodesHud() {
  return (
    <Card className={HUD_SHELL}>
      <div className="flex items-center justify-between">
        <HudLabel>Network nodes</HudLabel>
        <Users className="size-4 text-zinc-500" aria-hidden="true" />
      </div>
      <div className="mt-5 flex items-center gap-5">
        <div className="flex -space-x-3">
          {OPERATORS.map((operator) => (
            <span
              key={operator.initials}
              className={`flex size-11 items-center justify-center rounded-full border-2 border-black bg-gradient-to-br ${operator.tone} text-xs font-bold text-black`}
            >
              {operator.initials}
            </span>
          ))}
          <span className="flex size-11 items-center justify-center rounded-full border-2 border-black bg-zinc-900 font-mono text-[10px] text-zinc-300">
            +412
          </span>
        </div>
        <div>
          <p className="text-2xl font-semibold leading-none tracking-tighter">415</p>
          <p className="mt-1.5 flex items-center gap-2 text-xs text-zinc-400">
            <LiveDot />
            Live Operators
          </p>
        </div>
      </div>
    </Card>
  )
}

function VelocityHud() {
  return (
    <Card className={HUD_SHELL}>
      <div className="flex items-center justify-between">
        <HudLabel>Deployment velocity</HudLabel>
        <Activity className="size-4 text-zinc-500" aria-hidden="true" />
      </div>
      <svg viewBox="0 0 280 90" className="mt-4 h-20 w-full" aria-hidden="true">
        {[22, 45, 68].map((y) => (
          <line key={y} x1="0" x2="280" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" />
        ))}
        <path
          d="M0 78 C30 76 40 70 60 66 S100 60 120 50 S160 46 180 34 S230 20 280 8"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
          className="drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
        />
        <path
          d="M0 82 C40 82 70 80 100 78 S160 74 200 72 S250 70 280 68"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        {[
          [60, 66],
          [120, 50],
          [180, 34],
          [280, 8],
        ].map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="2.5" fill="#050505" stroke="#fff" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.15em]">
        <span className="text-zinc-500">MVP in 6 wks</span>
        <span className="text-white">4.2x baseline</span>
      </div>
    </Card>
  )
}

function CapitalHud() {
  return (
    <Card className={HUD_SHELL}>
      <HudLabel>Direct capital routing</HudLabel>
      <p className="mt-3 text-4xl font-semibold leading-none tracking-tighter">$48.6M</p>
      <div className="mt-5 flex h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <span className="h-full w-[62%] bg-white" />
        <span className="h-full w-[24%] bg-zinc-500" />
      </div>
      <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
        <span>Pre-seed 62%</span>
        <span>Seed 24%</span>
        <span>Other</span>
      </div>
    </Card>
  )
}

const HUDS: Record<HudVariant, () => React.JSX.Element> = {
  signal: SignalHud,
  enclave: EnclaveHud,
  nodes: NodesHud,
  velocity: VelocityHud,
  capital: CapitalHud,
}

export function SliderHud({ variant }: { variant: HudVariant }) {
  const Hud = HUDS[variant]
  return <Hud />
}
