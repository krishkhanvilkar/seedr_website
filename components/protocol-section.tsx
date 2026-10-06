const protocolCards = [
  {
    title: "01 / The High-Signal Network.",
    body: "The most crucial reality of the tech industry is that the best co-founder matches and earliest angel checks never happen on public job boards or LinkedIn feeds. They happen in quiet DMs, private group chats, and closed alumni networks. Most builders are locked out of this invisible layer. Seedr digitizes this backchannel. It\u2019s a dedicated, high-intent environment where those pivotal, closed-door conversations happen naturally for anyone who is actively building.",
  },
  {
    title: "02 / Accelerate the Momentum.",
    body: "There is a secret metric that elite operators and investors quietly look for before they ever decide to work with you: your shipping cadence. The industry has silently moved away from pitch decks and static resumes; today, people only invest their time and money into velocity. Seedr is built for this exact shift. By tying your profile to your live builds and real-time product iterations, you never have to convince anyone you\u2019re a builder. Your momentum does the talking.",
  },
]

function AuroraBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="aurora-blob-a absolute -left-[10%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,178,0.22),transparent_65%)] blur-3xl" />
      <div className="aurora-blob-b absolute -right-[8%] top-[30%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.2),transparent_65%)] blur-3xl" />
      <div className="aurora-blob-a absolute bottom-[-20%] left-[35%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.12),transparent_65%)] blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0a0a0a_0%,transparent_18%,transparent_82%,#0a0a0a_100%)]" />
    </div>
  )
}

export function ProtocolSection() {
  return (
    <section
      id="collaborative-protocol"
      aria-labelledby="protocol-heading"
      className="relative isolate w-full overflow-hidden px-6 py-32"
    >
      <AuroraBackdrop />
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-widest text-zinc-500">
          {"02 \u2014 THE PROTOCOL"}
        </p>
        <h2
          id="protocol-heading"
          className="mb-16 text-balance text-4xl font-medium tracking-tight text-zinc-100 md:text-5xl"
        >
          The Collaborative Protocol.
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {protocolCards.map((card) => (
            <article
              key={card.title}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_30px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] md:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-white/[0.06] blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-60"
              />
              <h3 className="relative text-xl font-medium tracking-tight text-zinc-100">{card.title}</h3>
              <p className="relative text-pretty leading-relaxed text-zinc-400">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
