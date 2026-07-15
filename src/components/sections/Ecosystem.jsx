import { useEffect, useRef } from 'react'
import { ecosystem } from '../../data/content'
import ScrollReveal from '../animations/ScrollReveal'
import { gsap, registerGsapPlugins } from '../../lib/gsapConfig'

export default function Ecosystem() {
  const sectionRef = useRef(null)

  useEffect(() => {
    registerGsapPlugins()
    const root = sectionRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const title = root.querySelector('[data-eco-title]')
      const cards = root.querySelector('[data-eco-cards]')
      if (!title || !cards) return

      gsap.fromTo(
        title,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            end: 'top 35%',
            scrub: true,
          },
        }
      )

      gsap.fromTo(
        cards,
        { y: 80 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 70%',
            end: 'top 25%',
            scrub: true,
          },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id={ecosystem.id}
      ref={sectionRef}
      className="bg-ink-950 section-pad pt-10 pb-20 lg:pt-14 lg:pb-28 overflow-hidden"
    >
      <div className="container-max relative">
        <h2
          data-eco-title
          className="pointer-events-none relative z-0 font-display text-[clamp(3.5rem,12vw,9rem)] font-medium tracking-wide leading-[0.9] text-outline will-change-transform"
        >
          {ecosystem.heading}
        </h2>

        <div
          data-eco-cards
          className="relative z-10 -mt-8 sm:-mt-12 lg:-mt-16 grid gap-4 sm:grid-cols-3 will-change-transform"
        >
          {ecosystem.cards.map((card) => (
            <ScrollReveal key={card.id}>
              <article className="group relative aspect-[4/5] overflow-hidden bg-ink-800">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <h3 className="absolute bottom-5 left-4 right-4 font-display text-xl sm:text-2xl font-medium tracking-wide text-white">
                  {card.title}
                </h3>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
