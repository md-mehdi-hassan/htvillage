import { useEffect, useMemo, useRef, useState } from 'react'
import { dataInsights } from '../../data/content'
import SectionTag from '../ui/SectionTag'
import Card from '../ui/Card'
import Button from '../ui/Button'
import MagneticButton from '../animations/MagneticButton'
import ScrollReveal from '../animations/ScrollReveal'
import { gsap, registerGsapPlugins } from '../../lib/gsapConfig'

function buildPath(values, width, height, pad = 16) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const stepX = (width - pad * 2) / (values.length - 1)

  const points = values.map((v, i) => {
    const x = pad + i * stepX
    const y = height - pad - ((v - min) / range) * (height - pad * 2)
    return [x, y]
  })

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  const area = `${line} L${points[points.length - 1][0]},${height - pad} L${points[0][0]},${height - pad} Z`
  return { line, area, points }
}

export default function DataInsights() {
  const [tab, setTab] = useState('grid')
  const tabsRef = useRef(null)
  const indicatorRef = useRef(null)
  const pathRef = useRef(null)
  const areaRef = useRef(null)

  const series = dataInsights.chart.series[tab]
  const { line, area } = useMemo(
    () => buildPath(series, 560, 220),
    [series]
  )

  useEffect(() => {
    registerGsapPlugins()
    const tabs = tabsRef.current
    const indicator = indicatorRef.current
    if (!tabs || !indicator) return

    const activeBtn = tabs.querySelector(`[data-chart-tab="${tab}"]`)
    if (!activeBtn) return

    const tabsRect = tabs.getBoundingClientRect()
    const btnRect = activeBtn.getBoundingClientRect()

    gsap.to(indicator, {
      x: btnRect.left - tabsRect.left,
      width: btnRect.width,
      duration: 0.4,
      ease: 'power3.out',
    })
  }, [tab])

  useEffect(() => {
    registerGsapPlugins()
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength?.() || 800
      gsap.fromTo(
        pathRef.current,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out' }
      )
    }
    if (areaRef.current) {
      gsap.fromTo(
        areaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.2 }
      )
    }
  }, [tab, line, area])

  return (
    <section id={dataInsights.id} className="relative py-20 lg:py-28 section-pad bg-navy-900/30">
      <div className="container-max">
        <ScrollReveal className="max-w-2xl">
          <SectionTag>{dataInsights.eyebrow}</SectionTag>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {dataInsights.heading}
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">{dataInsights.paragraph}</p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-5">
            <Card
              media={dataInsights.leftCard.image}
              mediaAlt={dataInsights.leftCard.title}
              scaleOnScroll
              className="h-full min-h-[320px]"
            >
              <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                <h3 className="font-display text-xl font-semibold text-white">
                  {dataInsights.leftCard.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300/90">
                  {dataInsights.leftCard.description}
                </p>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-7" delay={0.1}>
            <div className="h-full rounded-2xl border border-cyan-500/15 bg-navy-800/50 p-5 sm:p-7 backdrop-blur-md">
              <div
                ref={tabsRef}
                className="relative inline-flex flex-wrap gap-1 rounded-full border border-white/10 bg-navy-950/50 p-1"
                role="tablist"
              >
                <span
                  ref={indicatorRef}
                  className="absolute top-1 bottom-1 left-0 rounded-full bg-cyan-500/20 border border-cyan-400/30 pointer-events-none"
                  aria-hidden="true"
                />
                {dataInsights.chart.tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    data-chart-tab={t.id}
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={`relative z-10 rounded-full px-3 py-1.5 text-xs sm:text-sm transition-colors ${
                      tab === t.id ? 'text-cyan-200' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-white/5 bg-navy-950/60 p-3">
                <svg viewBox="0 0 560 220" className="w-full h-auto" role="img" aria-label="District telemetry chart">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0, 1, 2, 3].map((i) => (
                    <line
                      key={i}
                      x1="16"
                      x2="544"
                      y1={40 + i * 48}
                      y2={40 + i * 48}
                      stroke="rgba(148,163,184,0.12)"
                      strokeWidth="1"
                    />
                  ))}
                  <path ref={areaRef} d={area} fill="url(#chartGradient)" />
                  <path
                    ref={pathRef}
                    d={line}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="mt-1 flex justify-between px-2 text-[10px] text-slate-500">
                  {dataInsights.chart.labels.filter((_, i) => i % 2 === 0).map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  {dataInsights.chart.controllerLabel}
                </span>
                <MagneticButton>
                  <Button size="sm">{dataInsights.chart.cta}</Button>
                </MagneticButton>
              </div>

              <p className="mt-6 border-t border-white/5 pt-4 text-xs text-slate-500 leading-relaxed">
                {dataInsights.chart.footerNote}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
