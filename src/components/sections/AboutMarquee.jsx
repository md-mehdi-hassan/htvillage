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
    <section id={about.id} className="bg-ink-950 section-pad pt-14 sm:pt-20 lg:pt-28 pb-2 lg:pb-3 overflow-hidden">
      <div className="container-max">
        <ScrollReveal className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14 items-start">
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
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/80 font-light">
              {about.paragraph}
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-8 lg:mt-10 relative -mx-5 sm:-mx-8 lg:-mx-14 xl:-mx-20">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          <span className="text-outline-lg font-display text-[clamp(2.25rem,11vw,7rem)] font-medium tracking-[0.06em] sm:tracking-[0.08em] uppercase pr-6 sm:pr-8">
            {loop}
          </span>
          <span className="text-outline-lg font-display text-[clamp(2.25rem,11vw,7rem)] font-medium tracking-[0.06em] sm:tracking-[0.08em] uppercase pr-6 sm:pr-8">
            {loop}
          </span>
        </div>
      </div>
    </section>
  )
}
