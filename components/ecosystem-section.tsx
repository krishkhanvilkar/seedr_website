"use client"

import LiquidMetalHero from "@/components/ui/liquid-metal-hero"

export function EcosystemSection() {
  return (
    <LiquidMetalHero
      id="ecosystem"
      badge="✨ Pure Alignment"
      title="Instant Leverage. Direct Access."
      subtitle="No more scrolling through unverified portfolios. Connect exclusively with operators whose ambition and execution match your own to ship your MVP in weeks, not months."
      primaryCtaLabel="Join Cohort 1"
      onPrimaryCtaClick={() => {
        window.location.href = "mailto:access@seedr.network?subject=Seedr%20Cohort%201%20Application"
      }}
      features={[
        {
          title: "The Velvet Rope Mechanic.",
          description:
            "Algorithmically restricted access. You only see operators whose output cadence and stack match your immediate requirements. Everyone else stays outside.",
        },
        {
          title: "Proof of Work Verification.",
          description:
            "No theoretical resumes. Authentication requires active GitHub commits, live production URLs, or verified revenue data before the door opens.",
        },
      ]}
    />
  )
}
