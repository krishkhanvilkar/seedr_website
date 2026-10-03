import { Hero } from "@/components/ui/hero-1"
import ZoomSlider from "@/components/ui/zoom-slider"
import { SiteNav } from "@/components/site-nav"
import { EcosystemSection } from "@/components/ecosystem-section"
import { ManifestoSection } from "@/components/manifesto-section"
import { SignalDataSection } from "@/components/signal-data-section"
import { SiteFooter } from "@/components/site-footer"
import { AlexanderDock } from "@/components/alexander-dock"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#050505]">
      <SiteNav />
      <Hero
        eyebrow="🟢 Private Beta Active"
        eyebrowHref="#ecosystem"
        title="The Verified Room for Relentless Operators."
        subtitle="You have the vision for the next big thing. Stop hitting a wall of casual noise. Seedr is the closed network where elite technical talent, product visionaries, and capital converge."
        ctaLabel="Request Access"
        ctaHref="#ecosystem"
      />
      <EcosystemSection />
      <ManifestoSection />
      <ZoomSlider id="architecture" />
      <SignalDataSection />
      <SiteFooter />
      <AlexanderDock />
    </main>
  )
}
