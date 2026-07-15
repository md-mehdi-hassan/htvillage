export default function SectionTag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-slow" aria-hidden="true" />
      {children}
    </span>
  )
}
