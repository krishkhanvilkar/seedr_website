import { Component as GenerativeArt } from "@/components/ui/generative-art"

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

const edgeFadeMask = "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"

function GenerativeBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{ maskImage: edgeFadeMask, WebkitMaskImage: edgeFadeMask }}
    >
      <div className="absolute right-0 top-1/2 h-[800px] w-[800px] -translate-y-1/2 overflow-hidden opacity-20 mix-blend-screen grayscale invert [&_.canvas-container:not(#container-history)]:hidden">
        <GenerativeArt />
      </div>
    </div>
  )
}

export function ProtocolSection() {
  return (
    <section
      id="collaborative-protocol"
      aria-labelledby="protocol-heading"
      className="relative isolate w-full overflow-hidden bg-transparent px-6 py-32"
    >
      <GenerativeBackdrop />
      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-widest text-zinc-500">
          {"02 \u2014 THE PROTOCOL"}
        </p>
        <h2
          id="protocol-heading"
          className="mb-16 text-balance text-4xl font-medium tracking-tight text-zinc-100 md:text-5xl"
        >
          The Collaborative Effort.
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {protocolCards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col gap-4 rounded-none border border-zinc-900 bg-[#050505]/80 p-10 backdrop-blur-md transition-colors duration-500 hover:border-zinc-700"
            >
              <h3 className="text-xl font-medium tracking-tight text-zinc-100">{card.title}</h3>
              <p className="text-pretty leading-relaxed text-zinc-400">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
