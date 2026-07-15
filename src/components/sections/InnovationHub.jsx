import { useEffect, useRef } from 'react'
import { innovation } from '../../data/content'
import SectionTag from '../ui/SectionTag'
import Card from '../ui/Card'
import ScrollReveal from '../animations/ScrollReveal'
import { gsap, registerGsapPlugins } from '../../lib/gsapConfig'

export default function InnovationHub() {
  const progressRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    registerGsapPlugins()
    const progress = progressRef.current
    const bar = barRef.current
    if (!progress || !bar) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: innovation.challenges.progress.value / 100,
          transformOrigin: 'left center',
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: progress,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, progress)

    return () => ctx.revert()
  }, [])

  return (
    <section id={innovation.id} className="relative py-20 lg:py-28 section-pad bg-navy-900/40">
      <div className="absolute inset-0 bg-hero-glow opacity-30 pointer-events-none" />
      <div className="container-max relative">
        <ScrollReveal className="max-w-2xl">
          <SectionTag>{innovation.eyebrow}</SectionTag>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {innovation.heading}
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">{innovation.paragraph}</p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7 space-y-6" stagger={0.15}>
            {innovation.imageCards.map((card) => (
              <div key={card.id} data-reveal-child>
                <Card media={card.image} mediaAlt={card.title} scaleOnScroll>
                  <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300/90 max-w-lg">
                      {card.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-5" delay={0.15}>
            <div className="h-full rounded-2xl border border-cyan-500/15 bg-navy-800/50 p-6 sm:p-8 backdrop-blur-md">
              <h3 className="font-display text-xl font-semibold text-white">
                {innovation.challenges.title}
              </h3>

              <div ref={progressRef} className="mt-8">
                <div className="flex items-end justify-between gap-4">
                  <span className="text-sm text-slate-300">
                    {innovation.challenges.progress.label}
                  </span>
                  <span className="font-display text-2xl font-bold text-cyan-300">
                    {innovation.challenges.progress.value}%
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-navy-950/80">
                  <div
                    ref={barRef}
                    className="h-full w-full origin-left rounded-full bg-gradient-to-r from-cyan-500 to-teal-400"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  {innovation.challenges.progress.note}
                </p>
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
                  {innovation.challenges.benchmark.title}
                </h4>
                <p className="mt-3 text-sm text-slate-400">
                  {innovation.challenges.benchmark.note}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {innovation.challenges.benchmark.peers.map((peer) => (
                    <li
                      key={peer}
                      className="flex items-center gap-2.5 text-sm text-slate-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      {peer}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
