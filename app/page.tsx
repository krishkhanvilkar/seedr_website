import { Hero } from "@/components/ui/hero-1"
import { SiteNav } from "@/components/site-nav"
import { EcosystemSection } from "@/components/ecosystem-section"
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
        title="The network to build the next big thing."
        subtitle="A Highly curated network for like-minded, ambitious builders and investors. No pitches. No noise. Just people serious about what they are building."
        ctaLabel="Request Access"
        ctaHref="#request-access"
      />
      <EcosystemSection />
      <ZoomSlider
        id="architecture"
        title="The Architecture"
        subheading="Scroll to inspect the app preview"
      />
      <section aria-label="Platinum access marker" className="flex justify-center px-6 py-28 md:py-40">
        <PlatinumCoin />
      </section>
      <SiteFooter />
      <AlexanderDock />
    </main>
  )
}
