import { useEffect, useRef, useState } from 'react'
import { collaboration } from '../../data/content'
import SectionTag from '../ui/SectionTag'
import Card from '../ui/Card'
import ScrollReveal from '../animations/ScrollReveal'
import { gsap, registerGsapPlugins } from '../../lib/gsapConfig'

export default function CollaborationWorkspace() {
  const [active, setActive] = useState('all')
  const tabsRef = useRef(null)
  const indicatorRef = useRef(null)

  useEffect(() => {
    registerGsapPlugins()
    const tabs = tabsRef.current
    const indicator = indicatorRef.current
    if (!tabs || !indicator) return

    const activeBtn = tabs.querySelector(`[data-filter="${active}"]`)
    if (!activeBtn) return

    const tabsRect = tabs.getBoundingClientRect()
    const btnRect = activeBtn.getBoundingClientRect()

    gsap.to(indicator, {
      x: btnRect.left - tabsRect.left,
      width: btnRect.width,
      duration: 0.45,
      ease: 'power3.out',
    })
  }, [active])

  useEffect(() => {
    const tabs = tabsRef.current
    const indicator = indicatorRef.current
    if (!tabs || !indicator) return

    const first = tabs.querySelector('[data-filter="all"]')
    if (first) {
      const tabsRect = tabs.getBoundingClientRect()
      const btnRect = first.getBoundingClientRect()
      gsap.set(indicator, {
        x: btnRect.left - tabsRect.left,
        width: btnRect.width,
      })
    }

    const onResize = () => {
      const btn = tabs.querySelector(`[data-filter="${active}"]`)
      if (!btn) return
      const tabsRect = tabs.getBoundingClientRect()
      const btnRect = btn.getBoundingClientRect()
      gsap.set(indicator, {
        x: btnRect.left - tabsRect.left,
        width: btnRect.width,
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active])

  const visibleCards =
    active === 'all'
      ? collaboration.cards
      : collaboration.cards.filter((c) => c.filter === active)

  return (
    <section id={collaboration.id} className="relative py-20 lg:py-28 section-pad">
      <div className="container-max">
        <ScrollReveal className="max-w-2xl">
          <SectionTag>{collaboration.eyebrow}</SectionTag>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {collaboration.heading}
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">{collaboration.paragraph}</p>
        </ScrollReveal>

        <ScrollReveal className="mt-10 overflow-x-auto">
          <div
            ref={tabsRef}
            className="relative inline-flex min-w-max gap-1 rounded-full border border-white/10 bg-navy-900/60 p-1.5"
            role="tablist"
          >
            <span
              ref={indicatorRef}
              className="absolute top-1.5 bottom-1.5 left-0 rounded-full bg-cyan-500/20 border border-cyan-400/30 pointer-events-none"
              aria-hidden="true"
            />
            {collaboration.filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={active === filter.id}
                data-filter={filter.id}
                onClick={() => setActive(filter.id)}
                className={`relative z-10 rounded-full px-4 py-2 text-sm transition-colors ${
                  active === filter.id ? 'text-cyan-200' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal
          key={active}
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.15}
        >
          {visibleCards.map((card) => (
            <div key={card.id} data-reveal-child>
              <Card media={card.image} mediaAlt={card.title} scaleOnScroll className="h-full flex flex-col">
                <div className="relative flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
                    District Specifications
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {card.specs.map((spec) => (
                      <li key={spec} className="flex gap-2 text-sm text-slate-400">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal-400" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-10"
          stagger={0.12}
        >
          {collaboration.stats.map((stat) => (
            <div key={stat.id} data-reveal-child className="text-center">
              <div className="font-display text-4xl font-bold text-gradient">{stat.value}</div>
              <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
