import { Hero } from "@/components/ui/hero-1"
import { SiteNav } from "@/components/site-nav"
import { EcosystemSection } from "@/components/ecosystem-section"
import { ManifestoSection } from "@/components/manifesto-section"
import { PinnedGallery } from "@/components/pinned-gallery"
import { SignalDataSection } from "@/components/signal-data-section"
import { InnerCircleSection } from "@/components/inner-circle-section"
import { SiteFooter } from "@/components/site-footer"
import { AlexanderDock } from "@/components/alexander-dock"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#050505] text-zinc-400">
      <SiteNav />
      <Hero
        eyebrow="🟢 Private Beta Active"
        eyebrowHref="#ecosystem"
        title="Execution favors the verified."
        subtitle="A closed, Proof-of-Work network for elite technical operators. No pitches. No noise. Only what you have shipped."
        ctaLabel="Request Access"
        ctaHref="#ecosystem"
      />
      <EcosystemSection />
      <ManifestoSection />
      <PinnedGallery id="architecture" />
      <InnerCircleSection />
      <SignalDataSection />
      <SiteFooter />
      <AlexanderDock />
    </main>
  )
}
