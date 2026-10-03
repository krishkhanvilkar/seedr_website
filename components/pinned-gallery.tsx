"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  {
    index: "01",
    title: "Proof-of-Work Gate",
    description: "Entry is earned through shipped code, live products, and verifiable commits. Decks are not accepted.",
    metric: "Acceptance",
    value: "3.2%",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000",
  },
  {
    index: "02",
    title: "Signal Routing",
    description: "Every introduction is scored on execution overlap before it reaches you. Noise is filtered at the edge.",
    metric: "Noise filtered",
    value: "99.4%",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000",
  },
  {
    index: "03",
    title: "Operator Graph",
    description: "A private map of builders, designers, and technical founders weighted by what they have actually delivered.",
    metric: "Verified nodes",
    value: "1,204",
    image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2000",
  },
  {
    index: "04",
    title: "Capital Rails",
    description: "Direct lines to aligned capital. Investors see traction data first and the narrative second.",
    metric: "Median to term sheet",
    value: "19d",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2000",
  },
  {
    index: "05",
    title: "Encrypted Rooms",
    description: "Deal flow, cap tables, and roadmaps live in end-to-end encrypted rooms. Nothing leaves without consent.",
    metric: "Encryption",
    value: "E2E",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000",
  },
  {
    index: "06",
    title: "Deployment Velocity",
    description: "Teams formed inside Seedr ship their MVP in weeks. The network measures progress in deploys.",
    metric: "Idea to MVP",
    value: "6.5wk",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000",
  },
]

export function PinnedGallery({ id = "architecture" }: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`
            if (counterRef.current) {
              const current = Math.min(PANELS.length, Math.floor(self.progress * PANELS.length) + 1)
              counterRef.current.textContent = String(current).padStart(2, "0")
            }
          },
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative h-screen overflow-hidden bg-[#050505]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-20 z-20 mx-auto flex max-w-[1600px] items-end justify-between px-6 md:px-10">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">04 — The Architecture</span>
          <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tighter text-white md:text-3xl">
            Six layers. One standard.
          </h2>
        </div>
        <p className="font-mono text-xs tracking-[0.2em] text-zinc-500" aria-hidden="true">
          <span ref={counterRef} className="text-white">
            01
          </span>
          {" / "}
          {String(PANELS.length).padStart(2, "0")}
        </p>
      </div>

      <div
        ref={trackRef}
        className="flex h-full items-center gap-6 pr-[10vw] pl-6 pt-24 will-change-transform md:gap-10 md:pl-10"
      >
        {PANELS.map((panel) => (
          <article
            key={panel.index}
            className="group relative h-[62vh] w-[82vw] shrink-0 overflow-hidden rounded-sm border border-white/10 bg-zinc-950 md:w-[52vw] lg:w-[44vw]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={panel.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.92)_0%,rgba(5,5,5,0.2)_45%,rgba(5,5,5,0.55)_100%)]"
            />

            <span aria-hidden="true" className="absolute top-4 left-4 size-4 border-t border-l border-white/40" />
            <span aria-hidden="true" className="absolute top-4 right-4 size-4 border-t border-r border-white/40" />
            <span aria-hidden="true" className="absolute bottom-4 left-4 size-4 border-b border-l border-white/40" />
            <span aria-hidden="true" className="absolute right-4 bottom-4 size-4 border-r border-b border-white/40" />

            <div className="absolute top-8 left-8 right-8 flex items-start justify-between">
              <span className="font-mono text-5xl font-light tracking-tighter text-white/90 md:text-6xl">
                {panel.index}
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                Live
              </span>
            </div>

            <div className="absolute inset-x-6 bottom-6 flex flex-col gap-5 rounded-sm border border-white/10 bg-black/40 p-6 backdrop-blur-md md:inset-x-8 md:bottom-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold tracking-tighter text-white md:text-2xl">{panel.title}</h3>
                <p className="max-w-md text-pretty text-sm leading-relaxed text-zinc-400">{panel.description}</p>
              </div>
              <dl className="flex items-end justify-between border-t border-white/10 pt-4 font-mono text-[11px] uppercase tracking-[0.2em]">
                <div className="flex flex-col gap-1">
                  <dt className="text-zinc-500">{panel.metric}</dt>
                  <dd className="text-lg tracking-tight text-white">{panel.value}</dd>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <dt className="text-zinc-500">Layer</dt>
                  <dd className="text-zinc-300">L-{panel.index}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>

      <div className="absolute inset-x-6 bottom-8 z-20 h-px bg-white/10 md:inset-x-10">
        <div ref={progressRef} className="h-full origin-left scale-x-0 bg-white" />
      </div>
    </section>
  )
}
