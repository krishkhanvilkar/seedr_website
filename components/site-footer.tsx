"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlatinumCoin } from "@/components/platinum-coin"

const EASE = [0.16, 1, 0.3, 1] as const

const FOOTER_COLUMNS = [
  { heading: "Protocol", links: ["Proof of Work", "Liquidity", "Architecture"] },
  { heading: "Network", links: ["Operators", "Investors", "Cohort 01"] },
  { heading: "Legal", links: ["Privacy", "Terms", "Encryption"] },
]

const LINK_TARGETS: Record<string, string> = {
  "Proof of Work": "#ecosystem",
  Liquidity: "#signal",
  Architecture: "#architecture",
  Operators: "#ecosystem",
  Investors: "#signal",
  "Cohort 01": "#join",
}

export function SiteFooter() {
  return (
    <>
      <section
        id="join"
        aria-labelledby="join-title"
        className="relative overflow-hidden bg-[#050505] px-6 pt-32 pb-24 md:px-8 md:pt-48"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">05 — The Signal</span>
          <h2
            id="join-title"
            className="text-balance text-5xl font-semibold leading-[0.92] tracking-tighter text-white sm:text-6xl md:text-7xl"
          >
            Fortune favors the verified.
          </h2>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">
            Cohort 1 is capped. Applications are reviewed against shipped work, not pitch decks.
          </p>
          <Button
            asChild
            size="lg"
            className="h-14 rounded-full bg-white px-8 text-base font-semibold tracking-tight text-black shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all duration-500 hover:bg-white/85"
          >
            <a href="mailto:access@seedr.network?subject=Seedr%20Cohort%201%20Application">
              Join Cohort 1
              <ArrowUpRight aria-hidden="true" className="ml-1 size-4" />
            </a>
          </Button>
        </motion.div>
      </section>

      <footer className="relative overflow-hidden bg-[#050505] px-6 pt-16 pb-10 md:px-10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30, rotateY: -40 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.6, ease: EASE }}
            style={{ perspective: 800 }}
          >
            <PlatinumCoin />
          </motion.div>

          <p
            aria-hidden="true"
            className="pointer-events-none mt-6 w-full select-none text-center text-[15vw] font-black leading-[0.85] tracking-tighter text-white/5"
          >
            SEEDR
          </p>

          <nav aria-label="Footer" className="mt-16 w-full border-t border-white/10 pt-12">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.heading} className="flex flex-col gap-4">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white">{column.heading}</h3>
                  <ul className="flex flex-col gap-3">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a
                          href={LINK_TARGETS[link] ?? "#"}
                          className="text-sm text-zinc-500 transition-colors hover:text-white"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          <div className="mt-16 flex w-full flex-col gap-2 border-t border-white/5 pt-8 text-xs text-zinc-600 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Seedr. Code in production is absolute.</p>
            <p className="font-mono uppercase tracking-[0.2em]">Invite only</p>
          </div>
        </div>
      </footer>
    </>
  )
}
