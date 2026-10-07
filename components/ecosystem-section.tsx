"use client"

import LiquidMetalHero from "@/components/ui/liquid-metal-hero"
import { useRequestAccess } from "@/components/request-access-dialog"

export function EcosystemSection() {
  const { open: openRequestAccess } = useRequestAccess()
  return (
    <LiquidMetalHero
      id="protocol"
      badge="THE ECOSYSTEM"
      title="Your network is your leverage"
      subtitle="You’ve built the Product. Now, leverage the network. Validation is just the baseline. Scaling a generational product requires capital, distribution, and talent that you cannot code yourself. Seedr plugs your momentum into a high-density ecosystem of elite operators and strategic backers. Align with partners who match your execution speed. Shape the trajectory, ship the product, and sync with the market."
      primaryCtaLabel="Join Cohort 1"
      onPrimaryCtaClick={openRequestAccess}
      features={[]}
    />
  )
}
