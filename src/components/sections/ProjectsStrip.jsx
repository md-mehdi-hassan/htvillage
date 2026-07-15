import { useEffect, useRef } from 'react'
import { projectsStrip } from '../../data/content'
import ScrollReveal from '../animations/ScrollReveal'
import { gsap, registerGsapPlugins } from '../../lib/gsapConfig'

export default function ProjectsStrip() {
  const scrollerRef = useRef(null)
  const sectionRef = useRef(null)

  const scrollBy = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.68, behavior: 'smooth' })
  }

  useEffect(() => {
    registerGsapPlugins()
    const section = sectionRef.current
    const cards = section?.querySelectorAll('[data-project-card]')
    if (!section || !cards?.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id={projectsStrip.id}
      ref={sectionRef}
      className="bg-ink-950 py-16 lg:py-24 overflow-hidden"
    >
      <div className="section-pad container-max mb-8 flex items-end justify-between gap-4">
        <ScrollReveal>
          <h2 className="text-outline font-display text-5xl sm:text-7xl font-medium tracking-wide">
            {projectsStrip.heading}
          </h2>
        </ScrollReveal>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 sm:px-8 lg:px-14 xl:px-20 pb-4 scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {projectsStrip.items.map((item) => (
          <article
            key={item.id}
            data-project-card
            className="relative shrink-0 w-[72vw] sm:w-[42vw] lg:w-[28vw] aspect-[3/4] snap-start overflow-hidden bg-ink-800 group"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.opacity = '0'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <h3 className="absolute bottom-6 left-5 right-5 font-display text-2xl sm:text-3xl font-medium tracking-wide text-white">
              {item.title}
            </h3>
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 text-white/70">
        <button type="button" onClick={() => scrollBy(-1)} className="hover:text-white text-xl" aria-label="Previous">
          ←
        </button>
        <span className="h-8 w-px bg-white/25" />
        <button type="button" onClick={() => scrollBy(1)} className="hover:text-white text-xl" aria-label="Next">
          →
        </button>
      </div>
    </section>
  )
}
