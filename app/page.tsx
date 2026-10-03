import { Hero } from "@/components/ui/hero-1"
import { SiteNav } from "@/components/site-nav"
import { EcosystemSection } from "@/components/ecosystem-section"
import { ManifestoSection } from "@/components/manifesto-section"
import ZoomSlider from "@/components/ui/zoom-slider"
import { SiteFooter } from "@/components/site-footer"
import { AlexanderDock } from "@/components/alexander-dock"
import { PlatinumCoin } from "@/components/platinum-coin"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#050505] text-zinc-400">
      <SiteNav />
      <Hero
        eyebrow="🟢 Private Beta Active"
        eyebrowHref="#ecosystem"
        title="Execution favors the proven."
        subtitle="A closed, Proof-of-Work network for elite technical operators. No pitches. No noise. Only what you have shipped."
        ctaLabel="Request Access"
        ctaHref="#request-access"
      />
      <EcosystemSection />
      <ManifestoSection />
      <ZoomSlider
        id="architecture"
        title="The Architecture"
        subheading="Scroll to inspect the protocol"
      />
      <section aria-label="Platinum access marker" className="flex justify-center px-6 py-28 md:py-40">
        <PlatinumCoin />
      </section>
      <SiteFooter />
      <AlexanderDock />
    </main>
  )
}
