"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const
const INBOX = "access@seedr.network"
export const REQUEST_ACCESS_HASH = "#request-access"

type Role = "builder" | "investor"

const RequestAccessContext = createContext<{ open: () => void }>({ open: () => {} })

export const useRequestAccess = () => useContext(RequestAccessContext)

export function RequestAccessProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest("a")
      if (anchor?.getAttribute("href") === REQUEST_ACCESS_HASH) {
        event.preventDefault()
        setIsOpen(true)
      }
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return (
    <RequestAccessContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>{isOpen ? <AccessDialog onClose={() => setIsOpen(false)} /> : null}</AnimatePresence>
    </RequestAccessContext.Provider>
  )
}

function AccessDialog({ onClose }: { onClose: () => void }) {
  const titleId = useId()
  const descId = useId()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [role, setRole] = useState<Role>("builder")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [proof, setProof] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    panelRef.current?.querySelector<HTMLElement>("input")?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key !== "Tab" || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, a[href], [tabindex]:not([tabindex="-1"])',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [onClose])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subject = encodeURIComponent(`Seedr Access Request — ${role === "builder" ? "Builder" : "Investor"}`)
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\nTrack: ${role}\nProof of work: ${proof.trim() || "—"}`,
    )
    window.location.href = `mailto:${INBOX}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-md"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#141414] to-[#070707] shadow-[0_0_80px_rgba(255,255,255,0.05),0_30px_80px_rgba(0,0,0,0.6)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 size-72 -translate-x-1/2 rounded-full bg-white/[0.07] blur-3xl"
        />
        <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 z-10 flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative flex flex-col items-center px-8 pt-16 pb-12 text-center"
            >
              <span className="flex size-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                <Check className="size-5 text-white" aria-hidden="true" />
              </span>
              <h2 id={titleId} className="mt-8 text-3xl font-semibold tracking-tighter text-white">
                Request received.
              </h2>
              <p id={descId} className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
                {"Every application is reviewed by hand. If your work speaks, we'll be in touch."}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-10 h-12 w-full rounded-full border border-white/10 bg-white/[0.04] text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
              >
                Return to Seedr
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative px-7 pt-12 pb-8 md:px-9"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">Private Beta · Cohort 01</p>
              <h2 id={titleId} className="mt-4 text-4xl font-semibold leading-[1.02] tracking-tighter text-balance text-white">
                Define your trajectory.
              </h2>
              <p id={descId} className="mt-3 text-sm leading-relaxed text-zinc-500">
                Access is invite-only and reviewed by hand.
              </p>

              <fieldset className="mt-8">
                <legend className="sr-only">Join as</legend>
                <div className="grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-black/40 p-1">
                  {(["builder", "investor"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={role === option}
                      onClick={() => setRole(option)}
                      className={cn(
                        "h-10 rounded-full text-sm font-medium capitalize transition-all duration-500",
                        role === option
                          ? "bg-gradient-to-b from-zinc-200 to-zinc-400 text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                          : "text-zinc-500 hover:text-zinc-200",
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 flex flex-col gap-3">
                <Field label="Full name" id="access-name">
                  <input
                    id="access-name"
                    required
                    autoComplete="name"
                    maxLength={120}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ada Lovelace"
                    className={inputClass}
                  />
                </Field>
                <Field label="Email" id="access-email">
                  <input
                    id="access-email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={200}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </Field>
                <Field label={role === "builder" ? "Proof of work (optional)" : "Fund or portfolio (optional)"} id="access-proof">
                  <input
                    id="access-proof"
                    type="url"
                    maxLength={300}
                    value={proof}
                    onChange={(event) => setProof(event.target.value)}
                    placeholder={role === "builder" ? "github.com/you" : "fund.vc"}
                    className={inputClass}
                    onBlur={() => {
                      if (proof && !/^https?:\/\//i.test(proof)) setProof(`https://${proof}`)
                    }}
                  />
                </Field>
              </div>

              <button
                type="submit"
                className="group mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold tracking-tight text-black shadow-[0_0_24px_rgba(255,255,255,0.15)] transition-shadow duration-500 hover:shadow-[0_0_36px_rgba(255,255,255,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Request access as {role === "builder" ? "Builder" : "Investor"}
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
              </button>

              <p className="mt-5 text-center text-xs text-zinc-600">
                Already have an account?{" "}
                <a href={`mailto:${INBOX}?subject=Seedr%20Sign%20In`} className="font-medium text-zinc-300 hover:text-white">
                  Sign in.
                </a>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

const inputClass =
  "h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/30 focus:bg-white/[0.05] focus:outline-none"

function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="pl-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </label>
      {children}
    </div>
  )
}
