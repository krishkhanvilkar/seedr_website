"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from "recharts"
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

const signalData = [
  { week: "W01", seedr: 61, legacy: 19 },
  { week: "W04", seedr: 68, legacy: 17 },
  { week: "W08", seedr: 74, legacy: 16 },
  { week: "W12", seedr: 79, legacy: 14 },
  { week: "W16", seedr: 83, legacy: 13 },
  { week: "W20", seedr: 87, legacy: 11 },
  { week: "W24", seedr: 90, legacy: 10 },
  { week: "W28", seedr: 92, legacy: 9 },
  { week: "W32", seedr: 94, legacy: 8 },
]

function SignalTooltip({ active, payload, label }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null

  return (
    <div className="min-w-44 rounded-lg border border-white/10 bg-black/90 px-4 py-3 font-mono text-xs backdrop-blur-xl">
      <p className="mb-2 tracking-[0.2em] text-white/40">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey as string} className="flex items-center justify-between gap-6 py-0.5">
          <span className="flex items-center gap-2 text-white/60">
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${entry.dataKey === "seedr" ? "bg-white" : "bg-white/30"}`}
            />
            {entry.dataKey === "seedr" ? "Seedr" : "Legacy"}
          </span>
          <span className="tabular-nums text-white">{entry.value}%</span>
        </div>
      ))}
    </div>
  )
}

export function SignalNoiseChart() {
  return (
    <figure className="flex flex-col gap-8">
      <figcaption className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs tracking-[0.25em] text-white/40 uppercase">Fig. 01 / Live Cohort Data</span>
          <h3 className="text-2xl font-semibold tracking-tighter text-white md:text-3xl">
            Signal-to-Noise Ratio: Seedr vs Legacy Networks
          </h3>
        </div>
        <ul className="flex items-center gap-6 font-mono text-xs text-white/60">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-px w-6 bg-white" />
            Seedr
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-px w-6 border-t border-dashed border-white/40" />
            Legacy Networks
          </li>
        </ul>
      </figcaption>

      <div
        className="h-[320px] w-full md:h-[400px]"
        role="img"
        aria-label="Area chart: Seedr signal-to-noise ratio rises from 61% to 94% over 32 weeks, while legacy networks fall from 19% to 8%."
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={signalData} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="seedrFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="legacyFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.05} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
              dy={10}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(value: number) => `${value}%`}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
            />
            <Tooltip
              content={SignalTooltip}
              cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="legacy"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="url(#legacyFill)"
              animationDuration={1800}
            />
            <Area
              type="monotone"
              dataKey="seedr"
              stroke="#ffffff"
              strokeWidth={2}
              fill="url(#seedrFill)"
              activeDot={{ r: 4, fill: "#000", stroke: "#fff", strokeWidth: 2 }}
              animationDuration={1800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </figure>
  )
}
