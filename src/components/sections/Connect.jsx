import { connect } from '../../data/content'
import ScrollReveal from '../animations/ScrollReveal'
import MagneticButton from '../animations/MagneticButton'

export default function Connect() {
  return (
    <section id={connect.id} className="bg-ink-950 section-pad py-14 sm:py-20 lg:py-28">
      <div className="container-max grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14 items-center">
        <ScrollReveal className="lg:col-span-6 order-2 lg:order-1">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium tracking-wide text-white">
            {connect.heading}
          </h2>
          <div className="mt-8 sm:mt-10 divide-y divide-white/15">
            {connect.categories.map((cat) => (
              <MagneticButton key={cat.title} className="block w-full" strength={0.2} radius={120}>
                <a
                  href={cat.href}
                  className="group flex items-start justify-between gap-4 sm:gap-6 py-5 sm:py-6"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-base sm:text-xl font-light" style={{ color: '#3e8914' }}>
                        {cat.title}
                      </span>
                      <span
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: 'rgba(62, 137, 20, 0.8)' }}
                      >
                        ↗
                      </span>
                    </div>
                    <p className="mt-2 max-w-md text-sm text-white/55 font-light leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </a>
              </MagneticButton>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="lg:col-span-6 order-1 lg:order-2" delay={0.1}>
          <div className="aspect-[16/11] sm:aspect-[4/5] overflow-hidden bg-ink-800 group">
            <img
              src={connect.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.opacity = '0'
              }}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
