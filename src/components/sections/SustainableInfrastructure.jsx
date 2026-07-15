import { sustainable } from '../../data/content'
import SectionTag from '../ui/SectionTag'
import Card from '../ui/Card'
import ScrollReveal from '../animations/ScrollReveal'

function FeatureIcon({ type }) {
  if (type === 'sun') {
    return (
      <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    )
  }
  return (
    <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  )
}

export default function SustainableInfrastructure() {
  return (
    <section id={sustainable.id} className="relative py-20 lg:py-28 section-pad">
      <div className="container-max">
        <ScrollReveal className="max-w-2xl">
          <SectionTag>{sustainable.eyebrow}</SectionTag>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {sustainable.heading}
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">{sustainable.paragraph}</p>
        </ScrollReveal>

        <ScrollReveal
          className="mt-12 grid gap-6 md:grid-cols-2"
          stagger={0.15}
        >
          {sustainable.imageCards.map((card) => (
            <div key={card.id} data-reveal-child>
              <Card
                media={card.image}
                mediaAlt={card.title}
                scaleOnScroll
                className="h-full"
              >
                <div className="relative -mt-16 p-6 pt-0">
                  <div className="relative rounded-xl border border-cyan-500/10 bg-navy-900/80 p-5 backdrop-blur-md">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal
          className="mt-10 grid gap-6 md:grid-cols-2"
          stagger={0.15}
        >
          {sustainable.features.map((feature) => (
            <div
              key={feature.id}
              data-reveal-child
              className="flex gap-4 rounded-2xl border border-white/5 bg-navy-900/40 p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                <FeatureIcon type={feature.icon} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
