import { useEffect, useRef, useState } from 'react'
import { featured } from '../../data/content'
import MagneticButton from '../animations/MagneticButton'
import { gsap, ScrollTrigger, registerGsapPlugins } from '../../lib/gsapConfig'

function loadYoutubeApi() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.YT?.Player) return Promise.resolve(window.YT)

  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve(window.YT)
    }

    if (!document.querySelector('script[data-yt-api]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.dataset.ytApi = 'true'
      document.head.appendChild(script)
    }

    if (window.YT?.Player) resolve(window.YT)
  })
}

function disableCaptions(player) {
  if (!player) return
  try {
    player.unloadModule?.('captions')
    player.unloadModule?.('cc')
    player.setOption?.('captions', 'track', {})
  } catch {
    /* YouTube may throw if modules are already unloaded */
  }
}

export default function FeaturedProjects() {
  const [index, setIndex] = useState(0)
  const rootRef = useRef(null)
  const mediaRef = useRef(null)
  const uiRef = useRef(null)
  const insetRef = useRef(null)
  const ytHostRef = useRef(null)
  const ytPlayerRef = useRef(null)
  const slide = featured.slides[index]
  const total = featured.slides.length
  const videoId = featured.backgroundVideoId

  const go = (dir) => {
    setIndex((prev) => (prev + dir + total) % total)
  }

  useEffect(() => {
    if (!videoId || !ytHostRef.current) return

    let cancelled = false
    let player

    loadYoutubeApi().then((YT) => {
      if (cancelled || !YT || !ytHostRef.current) return

      player = new YT.Player(ytHostRef.current, {
        videoId,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          iv_load_policy: 3,
          cc_load_policy: 3,
          disablekb: 1,
          fs: 0,
          showinfo: 0,
        },
        events: {
          onReady: (event) => {
            event.target.mute()
            event.target.playVideo()
            disableCaptions(event.target)
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
              disableCaptions(event.target)
            }
          },
          onApiChange: (event) => {
            disableCaptions(event.target)
          },
        },
      })
      ytPlayerRef.current = player
    })

    return () => {
      cancelled = true
      try {
        ytPlayerRef.current?.destroy?.()
      } catch {
        /* ignore */
      }
      ytPlayerRef.current = null
    }
  }, [videoId])

  useEffect(() => {
    registerGsapPlugins()
    const root = rootRef.current
    const media = mediaRef.current
    const ui = uiRef.current
    if (!root || !media) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const insetBox = () => {
      const pad = window.innerWidth < 640 ? 40 : window.innerWidth < 1024 ? 64 : 112
      const width = Math.min(896, window.innerWidth - pad)
      const height = width * (3 / 4)
      return {
        width,
        height,
        left: (window.innerWidth - width) / 2,
        top: (window.innerHeight - height) / 2,
      }
    }

    const uiEndScale = () => {
      // Grow UI with the frame so it doesn't feel tiny when full-bleed
      const startW = insetBox().width || 1
      const ratio = window.innerWidth / startW
      return Math.min(1.55, Math.max(1.28, 1 + (ratio - 1) * 0.55))
    }

    const applyInset = () => {
      const box = insetBox()
      gsap.set(media, {
        position: 'absolute',
        left: box.left,
        top: box.top,
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        width: box.width,
        height: box.height,
        maxWidth: 'none',
      })
      if (ui) gsap.set(ui, { scale: 1, transformOrigin: '50% 100%' })
    }

    const applyFull = () => {
      gsap.set(media, {
        position: 'absolute',
        left: 0,
        top: 0,
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        maxWidth: 'none',
      })
      if (ui) gsap.set(ui, { scale: uiEndScale(), transformOrigin: '50% 100%' })
    }

    const ctx = gsap.context(() => {
      applyInset()

      gsap.fromTo(media, { opacity: 0.75 }, { opacity: 1, duration: 1.1, ease: 'power2.out' })

      if (reduceMotion) {
        applyFull()
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'featured-grow',
          trigger: root,
          start: 'top top',
          end: '+=140%',
          scrub: 0.85,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Grow evenly on all sides (avoids left-first expand)
      tl.fromTo(
        media,
        {
          width: () => insetBox().width,
          height: () => insetBox().height,
          left: () => insetBox().left,
          top: () => insetBox().top,
        },
        {
          width: () => window.innerWidth,
          height: () => window.innerHeight,
          left: 0,
          top: 0,
          ease: 'none',
          duration: 1,
        },
        0
      )

      if (ui) {
        tl.fromTo(
          ui,
          { scale: 1, transformOrigin: '50% 100%' },
          { scale: () => uiEndScale(), ease: 'none', duration: 1 },
          0
        )
      }
    }, root)

    const refresh = () => ScrollTrigger.refresh()
    const t1 = window.setTimeout(refresh, 80)
    const t2 = window.setTimeout(refresh, 400)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      ScrollTrigger.getById('featured-grow')?.kill()
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    registerGsapPlugins()
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const fadeNodes = root.querySelectorAll('[data-feat-fade]')
      const inset = insetRef.current

      gsap.fromTo(
        fadeNodes,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      )
      if (inset) {
        gsap.fromTo(
          inset,
          { y: 36, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, delay: 0.15, ease: 'power3.out' }
        )
      }
    }, root)

    return () => ctx.revert()
  }, [index])

  useEffect(() => {
    registerGsapPlugins()
    const inset = insetRef.current
    if (!inset) return

    const frames = gsap.utils.toArray('[data-feat-inset-img]', inset)
    if (frames.length < 2) return

    let current = 0
    let timer = 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.set(frames, { autoAlpha: 0, scale: 1.06 })
    gsap.set(frames[0], { autoAlpha: 1, scale: 1 })

    if (reduceMotion) return undefined

    const swap = () => {
      const prev = frames[current]
      current = (current + 1) % frames.length
      const next = frames[current]

      gsap
        .timeline({ defaults: { duration: 0.9, ease: 'power2.inOut' } })
        .to(prev, { autoAlpha: 0, scale: 1.04 }, 0)
        .fromTo(next, { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1 }, 0)
    }

    timer = window.setInterval(swap, 3200)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return (
    <section
      id={featured.id}
      ref={rootRef}
      className="relative z-10 min-h-screen bg-ink-950 overflow-hidden"
    >
      {/* Single frame grows by width/height (not CSS scale) so UI never leaves the video box */}
      <div
        ref={mediaRef}
        className="overflow-hidden bg-ink-800 will-change-[width,height,left,top]"
      >
        <div className="absolute inset-0" data-feat-bg>
          <img
            src={featured.slides[0]?.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.parentElement.classList.add('bg-ink-800')
              e.currentTarget.style.opacity = '0'
            }}
          />

          {videoId ? (
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full min-h-full [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
                style={{ width: 'max(100%, 177.78%)' }}
              >
                <div ref={ytHostRef} className="h-full w-full" />
              </div>
            </div>
          ) : null}

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25" />
        </div>

        {/* Centered UI band — scales up with scroll so it stays proportional when full-bleed */}
        <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none pb-6 sm:pb-8 lg:pb-10">
          <div
            ref={uiRef}
            className="pointer-events-auto relative w-full max-w-5xl px-5 sm:px-8 lg:px-10 will-change-transform"
          >
            <div className="relative max-w-xl pr-32 lg:pr-40">
              <p data-feat-fade className="text-[11px] sm:text-xs tracking-[0.28em] uppercase text-white/80">
                {featured.eyebrow}
              </p>
              <p data-feat-fade className="mt-2 text-[11px] sm:text-xs tracking-[0.22em] uppercase text-white/55">
                {slide.category}
              </p>
              <h2
                data-feat-fade
                className="mt-4 font-display text-3xl sm:text-5xl lg:text-6xl font-medium tracking-wide text-white leading-tight"
              >
                {slide.title}
              </h2>
              <p data-feat-fade className="mt-3 text-sm sm:text-base text-white/75 font-light">
                {slide.location}
              </p>
              <div data-feat-fade className="mt-5">
                <MagneticButton>
                  <a
                    href="#innovation"
                    className="link-dot inline-flex items-center text-sm sm:text-base text-white hover:text-olive-400 transition-colors"
                  >
                    {slide.cta}
                  </a>
                </MagneticButton>
              </div>

              <div data-feat-fade className="mt-7 flex items-center gap-4">
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
              className="absolute bottom-0 right-5 sm:right-8 lg:right-10 hidden md:block w-36 lg:w-44 aspect-[4/5] overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-ink-800"
            >
              {(featured.insetGallery?.length
                ? featured.insetGallery
                : [slide.inset].filter(Boolean)
              ).map((src, i) => (
                <img
                  key={src}
                  data-feat-inset-img
                  src={src}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover will-change-transform ${
                    i === 0 ? '' : 'opacity-0'
                  }`}
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
