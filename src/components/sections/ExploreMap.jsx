import { exploreMap } from '../../data/content'
import ScrollReveal from '../animations/ScrollReveal'

export default function ExploreMap() {
  return (
    <section
      id={exploreMap.id}
      className="relative bg-ink-950 section-pad mt-10 sm:mt-14 lg:mt-24 pt-8 sm:pt-10 lg:pt-14 pb-0 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-y-10 left-0 w-1/4 opacity-[0.08] hidden md:block"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(255,255,255,0.14) 22px, rgba(255,255,255,0.14) 23px), repeating-linear-gradient(90deg, transparent, transparent 22px, rgba(255,255,255,0.08) 22px, rgba(255,255,255,0.08) 23px)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-10 right-0 w-1/4 opacity-[0.08] hidden md:block"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(255,255,255,0.14) 22px, rgba(255,255,255,0.14) 23px), repeating-linear-gradient(90deg, transparent, transparent 22px, rgba(255,255,255,0.08) 22px, rgba(255,255,255,0.08) 23px)',
        }}
      />

      <div className="container-max relative">
        <ScrollReveal className="flex justify-end mb-4 sm:mb-6">
          <h2 className="text-outline font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-wide">
            {exploreMap.heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-ink-900">
          <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-[#141820] overflow-hidden rounded-2xl sm:rounded-3xl">
            {exploreMap.backgroundVideo ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={exploreMap.backgroundVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              />
            ) : null}

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16 sm:mt-20 lg:mt-24">
          <h3 className="font-display text-center text-3xl sm:text-5xl lg:text-6xl font-medium tracking-[0.1em] sm:tracking-[0.12em] text-white pb-0 leading-none">
            {exploreMap.exploreLabel}
          </h3>
        </ScrollReveal>
      </div>
    </section>
  )
}
