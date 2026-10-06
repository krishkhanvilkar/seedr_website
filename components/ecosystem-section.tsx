"use client"

import LiquidMetalHero from "@/components/ui/liquid-metal-hero"
import { useRequestAccess } from "@/components/request-access-dialog"

export function EcosystemSection() {
  const { open: openRequestAccess } = useRequestAccess()
  return (
    <LiquidMetalHero
      id="ecosystem"
      badge="✨ Pure Alignment"
      title="Instant Leverage. Direct Access."
      subtitle="No more scrolling through unverified portfolios. Connect exclusively with operators whose ambition and execution match your own to ship your MVP in weeks, not months."
      primaryCtaLabel="Join Cohort 1"
      onPrimaryCtaClick={openRequestAccess}
      features={[
        {
          title: "The High-Signal Network.",
          description:
            "The most crucial reality of the tech industry is that the best co-founder matches and earliest angel checks never happen on public job boards or LinkedIn feeds. They happen in quiet DMs, private group chats, and closed alumni networks. Most builders are locked out of this invisible layer. Seedr digitizes this backchannel. It’s a dedicated, high-intent environment where those pivotal, closed-door conversations happen naturally for anyone who is actively building.",
        },
        {
          title: "The Metric of Momentum.",
          description:
            "There is a secret metric that elite operators and investors quietly look for before they ever decide to work with you: your shipping cadence. The industry has silently moved away from pitch decks and static resumes; today, people only invest their time and money into velocity. Seedr is built for this exact shift. By tying your profile to your live builds and real-time product iterations, you never have to convince anyone you’re a builder. Your momentum does the talking.",
        },
      ]}
    />
  )
}
