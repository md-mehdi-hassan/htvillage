import { useEffect, useRef, useState } from 'react'
import { featured } from '../../data/content'
import MagneticButton from '../animations/MagneticButton'
import { gsap, registerGsapPlugins } from '../../lib/gsapConfig'

export default function FeaturedProjects() {
  const [index, setIndex] = useState(0)
  const stageRef = useRef(null)
  const insetRef = useRef(null)
  const slide = featured.slides[index]
  const total = featured.slides.length

  const go = (dir) => {
    setIndex((prev) => (prev + dir + total) % total)
  }

  useEffect(() => {
    registerGsapPlugins()
    const stage = stageRef.current
    if (!stage) return

    const ctx = gsap.context(() => {
      const bg = stage.querySelector('[data-feat-bg]')
      const fadeNodes = stage.querySelectorAll('[data-feat-fade]')
      const inset = insetRef.current

      gsap.fromTo(
        bg,
        { scale: 1.08, opacity: 0.75 },
        { scale: 1, opacity: 1, duration: 1.35, ease: 'power2.out' }
      )
      gsap.fromTo(
        fadeNodes,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      )
      if (inset) {
        gsap.fromTo(
          inset,
          { y: 50, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
        )
      }
    }, stage)

    return () => ctx.revert()
  }, [index])

  useEffect(() => {
    registerGsapPlugins()
    const stage = stageRef.current
    const inset = insetRef.current
    if (!stage || !inset) return

    const ctx = gsap.context(() => {
      gsap.to(inset, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, stage)

    return () => ctx.revert()
  }, [])

  return (
    <section id={featured.id} className="relative min-h-screen bg-ink-950">
      <div ref={stageRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            key={slide.image}
            data-feat-bg
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover will-change-transform"
            onError={(e) => {
              e.currentTarget.parentElement.classList.add('bg-ink-800')
              e.currentTarget.style.opacity = '0'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />
        </div>

        <div className="relative section-pad container-max min-h-screen flex flex-col justify-end pb-16 pt-28">
          <div className="max-w-xl">
            <p data-feat-fade className="text-[11px] tracking-[0.28em] uppercase text-white/80">
              {featured.eyebrow}
            </p>
            <p data-feat-fade className="mt-2 text-[11px] tracking-[0.22em] uppercase text-white/55">
              {slide.category}
            </p>
            <h2
              data-feat-fade
              className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-wide text-white"
            >
              {slide.title}
            </h2>
            <p data-feat-fade className="mt-3 text-sm sm:text-base text-white/75 font-light">
              {slide.location}
            </p>
            <div data-feat-fade className="mt-6">
              <MagneticButton>
                <a href="#innovation" className="link-dot inline-flex items-center text-sm text-white hover:text-olive-400 transition-colors">
                  {slide.cta}
                </a>
              </MagneticButton>
            </div>

            <div data-feat-fade className="mt-10 flex items-center gap-5">
              <button
                type="button"
                onClick={() => go(-1)}
                className="text-white/80 hover:text-white text-xl"
                aria-label="Previous"
              >
                ←
              </button>
              <div className="flex items-center gap-2">
                {featured.slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-px transition-all duration-300 ${
                      i === index ? 'w-8 bg-white' : 'w-3 bg-white/35 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                className="text-white/80 hover:text-white text-xl"
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={insetRef}
            data-feat-inset
            className="absolute bottom-16 right-5 sm:right-10 lg:right-20 hidden md:block w-44 lg:w-56 aspect-[4/5] overflow-hidden border border-white/10 shadow-2xl shadow-black/50 will-change-transform"
          >
            <img
              key={slide.inset}
              src={slide.inset}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.parentElement.classList.add('bg-ink-700')
                e.currentTarget.style.opacity = '0'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
