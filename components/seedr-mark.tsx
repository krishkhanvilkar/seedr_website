import type { CSSProperties } from "react"

export function SeedrMark({ className, fill, style }: { className?: string; fill?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill={fill ?? "none"} aria-hidden="true" className={className} style={style}>
      <path d="M12 2 21 12 12 22 3 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 7 16.5 12 12 17 7.5 12Z" fill="currentColor" />
      <path d="M12 2v5M12 17v5M3 12h4.5M16.5 12H21" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}
