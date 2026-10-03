const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Proof of Work", href: "#ecosystem" },
      { label: "Architecture", href: "#architecture" },
      { label: "Signal", href: "#signal" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Manifesto", href: "#protocol" },
      { label: "Contact", href: "mailto:support.seedr@gmail.com" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "https://aboard-kettledrum-d25.notion.site/Seedr-Privacy-Telemetry-Policy-3e6aa988885880cd99f1fe6605c8ebb8?source=copy_link" },
      { label: "Terms", href: "https://aboard-kettledrum-d25.notion.site/Seedr-Beta-Participation-Agreement-Terms-of-Service-3e6aa98888588079b32bc767b4741259?source=copy_link" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#050505] px-6 pt-20 pb-10 md:px-10">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center text-[15vw] font-black leading-[0.8] tracking-tighter text-white/5"
      >
        SEEDR
      </p>

      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-20">
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:ml-auto md:w-2/3">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading} className="flex flex-col gap-5">
              <h3 className="text-sm font-semibold tracking-tight text-white">{column.heading}</h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <a href="#hero" aria-label="Seedr home" className="w-fit">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/favicon19.png" alt="Seedr" className="h-10 w-auto" />
          </a>
          <div className="flex flex-col gap-1 text-xs text-zinc-600 md:items-end">
            <p className="font-mono uppercase tracking-[0.2em]">Invite only</p>
            <p>© 2026 Seedr. Proof in production is absolute.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
