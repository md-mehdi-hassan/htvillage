import { useEffect, useRef } from 'react'
import { about } from '../../data/content'
import ScrollReveal from '../animations/ScrollReveal'
import { gsap, registerGsapPlugins } from '../../lib/gsapConfig'

export default function AboutMarquee() {
  const loop = about.marquee.repeat(2)
  const imgWrapRef = useRef(null)

  useEffect(() => {
    registerGsapPlugins()
    const wrap = imgWrapRef.current
    if (!wrap) return
    const img = wrap.querySelector('img')
    if (!img) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { scale: 1.15, yPercent: -6 },
        {
          scale: 1,
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, wrap)

    return () => ctx.revert()
  }, [])

  return (
    <section id={about.id} className="bg-ink-950 section-pad py-20 lg:py-28 overflow-hidden">
      <div className="container-max">
        <ScrollReveal className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          <div className="lg:col-span-4">
            <div ref={imgWrapRef} className="aspect-[4/3] overflow-hidden bg-ink-800">
              <img
                src={about.image}
                alt=""
                className="h-full w-full object-cover will-change-transform"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0'
                }}
              />
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-base sm:text-lg leading-relaxed text-white/80 font-light">
              {about.paragraph}
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-16 lg:mt-24 relative">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          <span className="text-outline-lg font-display text-[clamp(3rem,9vw,7rem)] font-medium tracking-[0.08em] uppercase pr-8">
            {loop}
          </span>
          <span className="text-outline-lg font-display text-[clamp(3rem,9vw,7rem)] font-medium tracking-[0.08em] uppercase pr-8">
            {loop}
          </span>
        </div>
      </div>
    </section>
  )
}
