import { useEffect, useRef, useState } from 'react'
import { hero } from '../../data/content'
import { gsap, ScrollTrigger, registerGsapPlugins, defaults } from '../../lib/gsapConfig'

const AUTO_MS = 4500

export default function Hero() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const mediaRef = useRef(null)
  const stageRef = useRef(null)
  const indexRef = useRef(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    registerGsapPlugins()
    const root = rootRef.current
    const title = titleRef.current
    const media = mediaRef.current
    const stage = stageRef.current
    if (!root || !title || !media || !stage) return

    const slides = gsap.utils.toArray('[data-hero-slide]', stage)
    const chars = title.querySelectorAll('[data-hero-char]')
    if (!slides.length) return

    let timer = 0
    let fading = false

    const targetScale = () => {
      const w = media.offsetWidth || 1
      // Full viewport bleed (slight overshoot kills subpixel side slits)
      return (window.innerWidth / w) * 1.02
    }

    const ctx = gsap.context(() => {
      gsap.set(chars, { yPercent: 110, opacity: 0 })
      gsap.set(slides, { autoAlpha: 0, zIndex: 1 })
      gsap.set(slides[0], { autoAlpha: 1, zIndex: 2 })
      gsap.set(media, { scale: 1, transformOrigin: '50% 50%' })

      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.025,
        ease: defaults.ease,
      })

      // Reference effect: pin → frame grows larger → title softens away
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'hero-grow',
          trigger: root,
          start: 'top top',
          end: '+=130%',
          scrub: 0.75,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(
        media,
        {
          scale: () => targetScale(),
          ease: 'none',
          duration: 1,
        },
        0
      ).to(
        title,
        {
          opacity: 0,
          y: -36,
          ease: 'none',
          duration: 0.45,
        },
        0
      )

      const goNext = () => {
        if (fading) return
        const list = gsap.utils.toArray('[data-hero-slide]', stage)
        if (list.length < 2) return

        const prev = indexRef.current
        const next = (prev + 1) % list.length
        indexRef.current = next
        setActive(next)
        fading = true

        gsap.set(list[next], { zIndex: 3 })
        gsap.set(list[prev], { zIndex: 2 })

        gsap
          .timeline({
            defaults: { duration: 1, ease: 'power2.inOut' },
            onComplete: () => {
              list.forEach((el, i) => {
                gsap.set(el, {
                  zIndex: i === next ? 2 : 1,
                  autoAlpha: i === next ? 1 : 0,
                })
              })
              fading = false
            },
          })
          .to(list[prev], { autoAlpha: 0 }, 0)
          .fromTo(list[next], { autoAlpha: 0 }, { autoAlpha: 1 }, 0)
      }

      timer = window.setInterval(goNext, AUTO_MS)
    }, root)

    const refresh = () => ScrollTrigger.refresh()
    const t1 = window.setTimeout(refresh, 80)
    const t2 = window.setTimeout(refresh, 400)

    return () => {
      window.clearInterval(timer)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      ScrollTrigger.getById('hero-grow')?.kill()
      ctx.revert()
    }
  }, [])

  const chars = hero.headline.split('')

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative z-10 bg-ink-950 min-h-screen section-pad pt-28 pb-16 flex flex-col overflow-x-hidden"
    >
      <div
        ref={titleRef}
        className="container-max flex flex-col items-center w-full shrink-0 will-change-transform"
      >
        <h1 className="text-center font-display font-extralight text-[clamp(2rem,5.8vw,4.75rem)] tracking-hero text-white leading-[1.25] pb-1">
          {chars.map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              className="inline-block overflow-hidden align-bottom pb-[0.22em] -mb-[0.18em]"
            >
              <span data-hero-char className="inline-block will-change-transform">
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <div className="mt-10 sm:mt-14 flex-1 flex items-center justify-center w-full min-h-0">
        <div
          ref={mediaRef}
          className="relative mx-auto w-full max-w-5xl will-change-transform"
        >
          <div
            ref={stageRef}
            className="relative w-full aspect-[16/9] overflow-hidden bg-ink-800"
          >
            {hero.images.map((image) => (
              <img
                key={image.src}
                data-hero-slide
                src={image.src}
                alt={image.alt || hero.imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.style.visibility = 'hidden'
                }}
              />
            ))}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-ink-950/25 via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {hero.images.map((_, i) => (
              <span
                key={i}
                className={`h-px transition-all duration-500 ${
                  i === active ? 'w-6 bg-white' : 'w-2.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
