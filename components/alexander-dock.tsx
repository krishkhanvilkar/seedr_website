"use client"

import { useEffect } from "react"
import Image from "next/image"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"

const PARALLAX_RANGE_PX = 28

export function AlexanderDock() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 })

  // Present in the hook, gone through the mid-page descent, returns as a faint
  // ghost at the footer so it never competes with the coin or footer links.
  const opacity = useTransform(smoothProgress, [0, 0.08, 0.16, 0.88, 0.98], [1, 1, 0, 0, 0.3])
  const blur = useTransform(smoothProgress, [0.1, 0.2, 0.84, 0.97], [0, 8, 8, 0])
  const filter = useTransform(blur, (value) => `blur(${value}px)`)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 60, damping: 20, mass: 0.6 })
  const y = useSpring(pointerY, { stiffness: 60, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (prefersReducedMotion) return

    const handlePointerMove = (event: MouseEvent) => {
      const normalizedX = event.clientX / window.innerWidth - 0.5
      const normalizedY = event.clientY / window.innerHeight - 0.5
      pointerX.set(normalizedX * PARALLAX_RANGE_PX)
      pointerY.set(normalizedY * PARALLAX_RANGE_PX)
    }

    window.addEventListener("mousemove", handlePointerMove, { passive: true })
    return () => window.removeEventListener("mousemove", handlePointerMove)
  }, [prefersReducedMotion, pointerX, pointerY])

  return (
    <div
      aria-hidden="true"
      className="alexander-signal pointer-events-none fixed z-50 select-none leading-none mix-blend-screen"
    >
      <motion.div
        style={{ opacity, filter, x, y }}
        className="will-change-[opacity,transform,filter]"
      >
        <Image
          src="/images/alexander-marble.png"
          alt=""
          width={768}
          height={1376}
          priority
          sizes="(max-width: 768px) 220px, min(750px, 45vw)"
          className="alexander-signal__img block h-auto w-full"
        />
      </motion.div>
    </div>
  )
}
