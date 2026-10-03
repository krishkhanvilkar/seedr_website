"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
  eyebrow?: string
  eyebrowHref?: string
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
}

export function Hero({
  eyebrow = "Innovate Without Limits",
  eyebrowHref = "#",
  title,
  subtitle,
  ctaLabel = "Explore Now",
  ctaHref = "#",
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const backdropOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.7], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate mx-auto w-full pt-40 px-6 text-center md:px-8 
      min-h-[calc(100vh-40px)] overflow-hidden bg-[#000000]"
    >
      {/* Scroll-linked backdrop: grid + radial accent dissolve into pure black */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: backdropOpacity }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
      {/* Grid BG */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80 h-[600px] w-full 
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]
        dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)]
        bg-[size:6rem_5rem] 
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* Radial Accent */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)] 
        h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[140%] 
        -translate-x-1/2 rounded-[100%] border-t border-white/10 
        bg-transparent dark:bg-[radial-gradient(closest-side,#111_50%,#000_100%)] 
        shadow-[0_-30px_120px_-40px_rgba(255,255,255,0.12)] 
        animate-fade-up"
      />
      </motion.div>

      <motion.div style={{ opacity: contentOpacity, y: contentY }}>
      {/* Eyebrow */}
      {eyebrow && (
        <a href={eyebrowHref} className="group inline-block">
          <span
            className="text-sm text-gray-600 dark:text-gray-400 font-geist mx-auto px-5 py-2 
            bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent  
            border-[2px] border-gray-300/20 dark:border-white/5 
            rounded-3xl w-fit tracking-tight uppercase flex items-center justify-center"
          >
            {eyebrow}
            <ChevronRight
              aria-hidden="true"
              className="inline w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </a>
      )}

      {/* Title */}
      <h1
        className="animate-fade-in -translate-y-4 text-balance 
        bg-gradient-to-br from-black from-30% to-black/40 
        bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter 
        text-transparent opacity-0 sm:text-6xl md:text-7xl lg:text-8xl 
        dark:from-white dark:to-white/40"
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        className="animate-fade-in mx-auto mb-12 max-w-3xl -translate-y-4 text-balance 
        text-lg tracking-tight text-gray-600 dark:text-gray-400 
        opacity-0 [--animation-delay:200ms] md:text-xl"
      >
        {subtitle}
      </p>

      {/* CTA */}
      {ctaLabel && (
        <div className="flex justify-center">
          <Button
            asChild
            className="mt-[-20px] w-fit md:w-52 z-20 font-geist tracking-tighter text-center text-lg"
          >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      )}
      </motion.div>

      {/* Bottom Fade */}
      <div
        aria-hidden="true"
        className="animate-fade-up relative mt-32 opacity-0 [perspective:2000px] 
        after:absolute after:inset-0 after:z-50 
        after:[background:linear-gradient(to_top,#000_10%,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-black via-black/80 to-transparent"
      />
    </section>
  )
}
