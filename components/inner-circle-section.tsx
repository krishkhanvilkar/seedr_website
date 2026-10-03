"use client"

import { useState, type FormEvent } from "react"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { PlatinumCoin } from "@/components/platinum-coin"

const EASE = [0.16, 1, 0.3, 1] as const
const INBOX = "access@seedr.network"

export function InnerCircleSection() {
  const [email, setEmail] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subject = encodeURIComponent("Seedr Inner Circle")
    const body = encodeURIComponent(`Add me to the inner circle: ${email}`)
    window.location.href = `mailto:${INBOX}?subject=${subject}&body=${body}`
  }

  return (
    <section
      id="inner-circle"
      aria-labelledby="inner-circle-title"
      className="relative overflow-hidden bg-[#050505] px-6 pt-32 pb-28 md:pt-44"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-start justify-center pt-20">
        <div className="relative h-[420px] w-full max-w-4xl">
          <span className="absolute top-0 left-[8%] size-[420px] rounded-full border border-white/[0.05]" />
          <span className="absolute top-0 right-[8%] size-[420px] rounded-full border border-white/[0.05]" />
          <span className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="relative mx-auto flex max-w-md flex-col items-center text-center"
      >
        <PlatinumCoin />

        <h2
          id="inner-circle-title"
          className="mt-12 text-balance text-5xl font-bold leading-[0.95] tracking-tighter text-white md:text-6xl"
        >
          join the inner circle
        </h2>
        <p className="mt-6 max-w-xs font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-zinc-600">
          Protocols, deployments, and the occasional transmission.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex w-full items-stretch gap-3">
          <label htmlFor="inner-circle-email" className="sr-only">
            Email address
          </label>
          <input
            id="inner-circle-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="YOUR EMAIL"
            className="h-12 min-w-0 flex-1 rounded-none border border-zinc-800 bg-[#111] px-4 font-mono text-sm uppercase tracking-[0.12em] text-white placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Join the inner circle"
            className="flex size-12 shrink-0 items-center justify-center border border-zinc-700 text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronRight aria-hidden="true" className="size-4" />
          </button>
        </form>
      </motion.div>
    </section>
  )
}
