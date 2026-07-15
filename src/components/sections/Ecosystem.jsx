import { useEffect, useRef } from 'react'
import { ecosystem } from '../../data/content'
import { gsap, registerGsapPlugins } from '../../lib/gsapConfig'

/** Vertical slots — desktop / tablet drift; mobile stays flatter */
const Y_SLOTS_DESKTOP = [-56, 12, 64]
const Y_SLOTS_MOBILE = [0, 0, 0]
const SWAP_MS = 3200

export default function Ecosystem() {
  const sectionRef = useRef(null)

  useEffect(() => {
    registerGsapPlugins()
    const root = sectionRef.current
    if (!root) return

    const title = root.querySelector('[data-eco-title]')
    const grid = root.querySelector('[data-eco-grid]')
    const cards = gsap.utils.toArray('[data-eco-card]', root)
    const images = gsap.utils.toArray('[data-eco-img]', root)
    const labels = gsap.utils.toArray('[data-eco-label]', root)
    if (!title || !grid || !cards.length) return

    let phase = 0
    let timer = 0
    let cycling = false
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = () => window.innerWidth < 640
    const slots = () => (isMobile() ? Y_SLOTS_MOBILE : Y_SLOTS_DESKTOP)

    const applySlots = (animate) => {
      const Y_SLOTS = slots()
      cards.forEach((card, i) => {
        const slot = Y_SLOTS[(i + phase) % Y_SLOTS.length]
        if (animate && !isMobile()) {
          gsap.to(card, {
            y: slot,
            duration: 1.15,
            ease: 'power2.inOut',
            overwrite: 'auto',
          })
        } else {
          gsap.set(card, { y: slot })
        }
      })
    }

    const startCycle = () => {
      if (cycling || reduceMotion || isMobile()) return
      cycling = true
      applySlots(false)
      timer = window.setInterval(() => {
        phase = (phase + 1) % slots().length
        applySlots(true)
      }, SWAP_MS)
    }

    const stopCycle = () => {
      window.clearInterval(timer)
      cycling = false
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title,
        { y: 48, opacity: 0, letterSpacing: '0.08em' },
        {
          y: 0,
          opacity: 1,
          letterSpacing: '0.025em',
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 85%',
            end: 'top 42%',
            scrub: 0.9,
          },
        }
      )

      if (reduceMotion) {
        gsap.set(cards, { opacity: 1, y: (i) => slots()[i % slots().length], scale: 1 })
        gsap.set(images, { scale: 1, yPercent: 0 })
        gsap.set(labels, { opacity: 1, y: 0 })
        return
      }

      gsap.set(cards, {
        opacity: 0,
        y: isMobile() ? 48 : 110,
        scale: 0.94,
        rotateX: isMobile() ? 0 : 8,
        transformOrigin: '50% 85%',
        force3D: true,
      })
      gsap.set(labels, { opacity: 0, y: 24 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: grid,
            start: 'top 82%',
            end: 'top 36%',
            scrub: 1,
            onLeave: startCycle,
            onEnterBack: stopCycle,
            onRefresh: (self) => {
              if (self.progress === 1) startCycle()
            },
          },
        })
        .to(
          cards,
          {
            opacity: 1,
            y: (i) => slots()[i % slots().length],
            scale: 1,
            rotateX: 0,
            stagger: isMobile() ? 0.08 : 0.14,
            ease: 'none',
            duration: 1,
          },
          0
        )
        .to(
          labels,
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            ease: 'none',
            duration: 0.65,
          },
          0.3
        )

      // Ken Burns / parallax on imagery while the section scrolls past
      images.forEach((img, i) => {
        const dir = i % 2 === 0 ? 1 : -1
        gsap.fromTo(
          img,
          { scale: 1.2, yPercent: -8 * dir },
          {
            scale: 1.05,
            yPercent: 9 * dir,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.15,
            },
          }
        )
      })
    }, root)

    return () => {
      stopCycle()
      ctx.revert()
    }
  }, [])

  return (
    <section
      id={ecosystem.id}
      ref={sectionRef}
      className="bg-ink-950 section-pad pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-36 overflow-hidden [perspective:1200px]"
    >
      <div className="container-max relative">
        <h2
          data-eco-title
          className="pointer-events-none relative z-20 mb-5 sm:mb-8 font-display text-[clamp(2.5rem,14vw,9rem)] font-medium tracking-wide leading-[0.9] text-outline will-change-transform"
        >
          {ecosystem.heading}
        </h2>

        <div
          data-eco-grid
          className="relative z-10 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3 sm:items-start pt-1 pb-8 sm:pb-16 lg:pb-20"
        >
          {ecosystem.cards.map((card) => (
            <div key={card.id} data-eco-card className="will-change-transform [transform-style:preserve-3d]">
              <article className="group relative aspect-[16/10] sm:aspect-[4/5] overflow-hidden bg-ink-800">
                <img
                  data-eco-img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <h3
                  data-eco-label
                  className="absolute bottom-4 left-3 right-3 sm:bottom-5 sm:left-4 sm:right-4 font-display text-lg sm:text-xl lg:text-2xl font-medium tracking-wide text-white will-change-transform"
                >
                  {card.title}
                </h3>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
