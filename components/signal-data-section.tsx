"use client"

import { motion } from "framer-motion"
import { SignalNoiseChart } from "@/components/signal-noise-chart"

const EASE = [0.16, 1, 0.3, 1] as const

const stats = [
  { value: "94.2%", label: "Signal ratio", detail: "Intros that convert to a working session" },
  { value: "<2%", label: "Acceptance", detail: "Of applicants pass proof-of-work review" },
  { value: "6.3 wks", label: "Median to MVP", detail: "From first match to shipped product" },
  { value: "11×", label: "Less outreach", detail: "Messages sent per qualified partner" },
]

const caseStudies = [
  {
    id: "Case 014",
    title: "Infra founder × distributed systems lead",
    body: "Matched on week one. Shipped a usage-metered API in 5 weeks and closed a pre-seed round routed through the network.",
    metric: "5 wks",
    metricLabel: "Idea to production",
  },
  {
    id: "Case 027",
    title: "Product visionary × ML engineer",
    body: "Zero cold outreach. A single verified intro became a co-founding team with paying design partners by day 40.",
    metric: "1",
    metricLabel: "Intro required",
  },
  {
    id: "Case 031",
    title: "Solo operator × growth architect",
    body: "Verified revenue data unlocked direct capital routing. Term sheet signed before the first public launch.",
    metric: "$1.2M",
    metricLabel: "Routed capital",
  },
]

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
}

export function SignalDataSection() {
  return (
    <section
      id="signal"
      aria-labelledby="signal-heading"
      className="relative bg-black px-6 py-32 md:px-8 md:py-48"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-24 md:gap-32">
        <motion.header {...reveal} transition={{ duration: 1.2, ease: EASE }} className="flex flex-col gap-10">
          <span className="font-mono text-xs tracking-[0.25em] text-white/40 uppercase">
            03 — Signal / Noise
          </span>
          <h2
            id="signal-heading"
            className="max-w-6xl text-balance text-5xl font-semibold leading-[0.92] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            The industry is drowning in casual noise.{" "}
            <span className="text-white/35">We engineered a filter for execution.</span>
          </h2>
        </motion.header>

        <motion.dl
          {...reveal}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          className="grid grid-cols-2 border-t border-l border-white/10 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-3 border-r border-b border-white/10 p-6 md:p-8">
              <dt className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">{stat.label}</dt>
              <dd className="flex flex-col gap-2">
                <span className="text-4xl font-semibold tracking-tighter text-white tabular-nums md:text-5xl">
                  {stat.value}
                </span>
                <span className="text-pretty text-sm leading-relaxed text-white/50">{stat.detail}</span>
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          {...reveal}
          transition={{ duration: 1.2, ease: EASE }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10"
        >
          <SignalNoiseChart />
        </motion.div>

        <div className="flex flex-col gap-10">
          <motion.div
            {...reveal}
            transition={{ duration: 1.2, ease: EASE }}
            className="flex items-end justify-between gap-6 border-b border-white/10 pb-6"
          >
            <h3 className="text-3xl font-semibold tracking-tighter text-white md:text-4xl">Case Studies</h3>
            <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">Cohort 0 / Anonymized</span>
          </motion.div>

          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            {caseStudies.map((study, index) => (
              <motion.li
                key={study.id}
                {...reveal}
                transition={{ duration: 1, ease: EASE, delay: index * 0.12 }}
                className="group flex flex-col justify-between gap-12 bg-black p-8 transition-colors duration-700 hover:bg-white/[0.03] md:p-10"
              >
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">{study.id}</span>
                  <h4 className="text-xl font-semibold tracking-tight text-white">{study.title}</h4>
                  <p className="text-pretty text-sm leading-relaxed text-white/55">{study.body}</p>
                </div>
                <div className="flex items-baseline justify-between border-t border-white/10 pt-6">
                  <span className="text-4xl font-semibold tracking-tighter text-white tabular-nums">{study.metric}</span>
                  <span className="font-mono text-xs tracking-[0.15em] text-white/40 uppercase">{study.metricLabel}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
