import { useMemo, useState } from 'react'
import { exploreMap } from '../../data/content'
import ScrollReveal from '../animations/ScrollReveal'

export default function ExploreMap() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeMarker, setActiveMarker] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)

  const visibleMarkers = useMemo(() => {
    if (activeFilter === 'all') return exploreMap.markers
    if (activeFilter === 'active') {
      return exploreMap.markers.filter((m) => m.status === 'active')
    }
    if (activeFilter === 'type') {
      return exploreMap.markers.filter((m) => m.type === 'office' || m.type === 'lab')
    }
    return exploreMap.markers
  }, [activeFilter])

  const selected = exploreMap.markers.find((m) => m.id === activeMarker)

  return (
    <section id={exploreMap.id} className="relative bg-ink-950 section-pad py-16 lg:py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-10 left-0 w-1/4 opacity-[0.08]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(255,255,255,0.14) 22px, rgba(255,255,255,0.14) 23px), repeating-linear-gradient(90deg, transparent, transparent 22px, rgba(255,255,255,0.08) 22px, rgba(255,255,255,0.08) 23px)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-10 right-0 w-1/4 opacity-[0.08]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(255,255,255,0.14) 22px, rgba(255,255,255,0.14) 23px), repeating-linear-gradient(90deg, transparent, transparent 22px, rgba(255,255,255,0.08) 22px, rgba(255,255,255,0.08) 23px)',
        }}
      />

      <div className="container-max relative">
        <ScrollReveal className="flex justify-end mb-6">
          <h2 className="text-outline font-display text-5xl sm:text-7xl font-medium tracking-wide">
            {exploreMap.heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="relative mx-auto max-w-4xl overflow-hidden border border-white/10 bg-ink-900">
          <div className="relative aspect-[16/11] bg-[#141820]">
            <svg viewBox="0 0 800 550" className="absolute inset-0 h-full w-full opacity-70" aria-hidden="true">
              <rect width="800" height="550" fill="#141820" />
              {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((x) => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="550" stroke="#2a3140" strokeWidth="1" />
              ))}
              {[60, 120, 180, 240, 300, 360, 420, 480].map((y) => (
                <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} stroke="#2a3140" strokeWidth="1" />
              ))}
              <path d="M120 420 C 220 380, 280 300, 360 280 S 520 240, 620 200" fill="none" stroke="#3a4558" strokeWidth="2" />
              <path d="M80 180 C 200 220, 320 260, 420 340 S 600 420, 740 390" fill="none" stroke="#3a4558" strokeWidth="2" />
            </svg>

            {visibleMarkers.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveMarker(m.id === activeMarker ? null : m.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-ink-950 text-xs font-semibold flex items-center justify-center shadow-lg shadow-black/40 transition-transform ${
                  activeMarker === m.id
                    ? 'bg-white scale-110 ring-2 ring-accent-yellow'
                    : 'bg-accent-yellow hover:scale-110'
                }`}
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
                aria-label={m.title}
              >
                {m.label}
              </button>
            ))}

            {selected && (
              <div className="absolute top-4 left-4 right-4 sm:right-auto sm:min-w-[220px] rounded-sm border border-white/15 bg-ink-950/90 backdrop-blur px-4 py-3">
                <div className="text-[10px] tracking-[0.18em] uppercase text-white/45">Selected</div>
                <div className="mt-1 text-sm text-white">{selected.title}</div>
                <div className="mt-1 text-xs text-white/50 capitalize">
                  {selected.status} · {selected.type}
                </div>
              </div>
            )}

            <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2 rounded-sm bg-ink-800/90 backdrop-blur-md border border-white/10 px-2 py-2 sm:px-3">
              {exploreMap.filters.map((filter) => (
                <div key={filter.id} className="relative flex-1 min-w-[140px]">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown((prev) => (prev === filter.id ? null : filter.id))
                    }
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-xs sm:text-sm transition-colors ${
                      activeFilter === filter.id ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {filter.label}
                    <span className="text-white/40">▾</span>
                  </button>
                  {openDropdown === filter.id && (
                    <div className="absolute bottom-full left-0 right-0 mb-1 border border-white/10 bg-ink-950 shadow-xl">
                      <button
                        type="button"
                        className="block w-full text-left px-3 py-2 text-xs text-white/80 hover:bg-white/5"
                        onClick={() => {
                          setActiveFilter(filter.id)
                          setOpenDropdown(null)
                          setActiveMarker(null)
                        }}
                      >
                        Apply {filter.label}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <h3 className="font-display text-center text-4xl sm:text-6xl font-medium tracking-[0.12em] text-white">
            {exploreMap.exploreLabel}
          </h3>
        </ScrollReveal>
      </div>
    </section>
  )
}
