import { useEffect, useRef } from 'react'
import { projectsStrip } from '../../data/content'
import ScrollReveal from '../animations/ScrollReveal'
import { gsap, ScrollTrigger, registerGsapPlugins } from '../../lib/gsapConfig'

const LOOP_SECONDS = 38

export default function ProjectsStrip() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const tweenRef = useRef(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    registerGsapPlugins()
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const cards = gsap.utils.toArray('[data-project-card]', section)
    const images = gsap.utils.toArray('[data-project-img]', section)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 48, opacity: 0, rotate: 1.2 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.07,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        }
      )

      if (reduceMotion) return

      gsap.set(track, { xPercent: -50 })
      const loop = gsap.to(track, {
        xPercent: 0,
        duration: LOOP_SECONDS,
        ease: 'none',
        repeat: -1,
      })
      tweenRef.current = loop

      // Scroll-through: speed boost + soft track drift
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          if (pausedRef.current) return
          const velocity = Math.abs(self.getVelocity())
          const boost = gsap.utils.clamp(1.15, 3.2, 1.15 + velocity / 900)
          loop.timeScale(boost)

          // Subtle skew in scroll direction for motion feel
          const skew = gsap.utils.clamp(-3.5, 3.5, self.getVelocity() / -420)
          gsap.to(track, {
            skewX: skew,
            duration: 0.35,
            overwrite: 'auto',
            ease: 'power2.out',
          })
        },
        onLeave: () => {
          if (pausedRef.current) return
          loop.timeScale(1.35)
          gsap.to(track, { skewX: 0, duration: 0.5, ease: 'power2.out' })
        },
        onLeaveBack: () => {
          if (pausedRef.current) return
          loop.timeScale(1.35)
          gsap.to(track, { skewX: 0, duration: 0.5, ease: 'power2.out' })
        },
      })

      // Idle base a bit snappier than before
      loop.timeScale(1.35)

      // Image parallax / zoom while section scrolls past
      images.forEach((img, i) => {
        gsap.fromTo(
          img,
          { scale: 1.12, yPercent: i % 2 === 0 ? -6 : 6 },
          {
            scale: 1,
            yPercent: i % 2 === 0 ? 6 : -6,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          }
        )
      })

      // Cards rise / settle with scroll for depth
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: i % 2 === 0 ? 28 : -16 },
          {
            y: i % 2 === 0 ? -20 : 24,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      })
    }, section)

    const pause = () => {
      pausedRef.current = true
      tweenRef.current?.pause()
      gsap.to(track, { skewX: 0, duration: 0.35, ease: 'power2.out' })
    }
    const play = () => {
      pausedRef.current = false
      tweenRef.current?.play()
      tweenRef.current?.timeScale(1.35)
    }

    track.addEventListener('pointerenter', pause)
    track.addEventListener('pointerleave', play)

    return () => {
      track.removeEventListener('pointerenter', pause)
      track.removeEventListener('pointerleave', play)
      tweenRef.current = null
      ctx.revert()
    }
  }, [])

  const loopItems = [...projectsStrip.items, ...projectsStrip.items]

  return (
    <section
      id={projectsStrip.id}
      ref={sectionRef}
      className="bg-ink-950 pt-16 lg:pt-20 pb-4 lg:pb-6 overflow-hidden"
    >
      <div className="section-pad container-max mb-5 flex items-end justify-between gap-4">
        <ScrollReveal>
          <h2 className="text-outline font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-wide">
            {projectsStrip.heading}
          </h2>
        </ScrollReveal>
      </div>

      <div className="relative overflow-hidden px-5 sm:px-8 lg:px-14 xl:px-20">
        <div
          ref={trackRef}
          className="flex w-max gap-3 will-change-transform origin-center"
          aria-label="Projects carousel"
        >
          {loopItems.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              data-project-card
              className="relative shrink-0 w-[68vw] sm:w-[38vw] md:w-[28vw] lg:w-[20vw] xl:w-[17vw] aspect-[3/4] overflow-hidden bg-ink-800 group will-change-transform"
            >
              <img
                data-project-img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover will-change-transform"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.style.opacity = '0'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <h3 className="absolute bottom-4 left-3 right-3 font-display text-lg sm:text-xl font-medium tracking-wide text-white">
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
