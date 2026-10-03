"use client"

import { motion } from "framer-motion"

const EASE = [0.16, 1, 0.3, 1] as const

export function ManifestoSection() {
  return (
    <section
      id="protocol"
      aria-labelledby="manifesto-title"
      className="relative overflow-hidden bg-[#050505] px-6 pt-40 pb-24 md:px-8 md:pt-56 md:pb-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(220,38,38,0.12),transparent)] blur-2xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 text-center"
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">02 — The Protocol</span>
        <h2
          id="manifesto-title"
          className="text-balance text-5xl font-semibold leading-[0.95] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Resumes are theoretical.{" "}
          <span className="bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-700 bg-clip-text text-transparent">
            Proof is absolute.
          </span>
        </h2>
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">
          Six primitives govern who enters, who builds, and who gets funded. Nothing else is negotiable.
        </p>
      </motion.div>
    </section>
  )
}
