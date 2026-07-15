import { useEffect, useRef, useState } from 'react'
import { useSmoothScroll } from './smoothScrollContext'

export default function FloatingActions() {
  const lenisRef = useSmoothScroll()
  const [progress, setProgress] = useState(0)
  const [atTop, setAtTop] = useState(true)
  const ringRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      setProgress(Math.min(1, Math.max(0, p)))
      setAtTop(window.scrollY < window.innerHeight * 0.55)
    }

    const lenis = lenisRef?.current
    if (lenis) {
      lenis.on('scroll', onScroll)
      onScroll()
      return () => lenis.off('scroll', onScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [lenisRef])

  const onClick = () => {
    const lenis = lenisRef?.current
    if (atTop) {
      const next = document.querySelector('#featured')
      if (!next) return
      if (lenis) lenis.scrollTo(next, { offset: 0, duration: 1.2 })
      else next.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (lenis) lenis.scrollTo(0, { duration: 1.4 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const dash = 2 * Math.PI * 16
  const offset = dash * (1 - progress)

  return (
    <div className="fixed bottom-6 right-5 z-[60] flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={onClick}
        className="relative h-11 w-11 rounded-full border border-white/30 bg-ink-900/70 backdrop-blur flex items-center justify-center text-white/85 hover:text-white hover:border-white/60 transition-colors"
        aria-label={atTop ? 'Scroll down' : 'Back to top'}
      >
        <svg ref={ringRef} className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
          <circle cx="22" cy="22" r="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <circle
            cx="22"
            cy="22"
            r="16"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.5"
            strokeDasharray={dash}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="relative text-sm">{atTop ? '↓' : '↑'}</span>
      </button>
    </div>
  )
}
