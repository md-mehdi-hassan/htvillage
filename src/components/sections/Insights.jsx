import { insights } from '../../data/content'
import ScrollReveal from '../animations/ScrollReveal'
import StatCounter from '../ui/StatCounter'

export default function Insights() {
  return (
    <section id={insights.id} className="bg-ink-900 section-pad py-20 lg:py-28">
      <div className="container-max">
        <ScrollReveal className="max-w-2xl">
          <p className="text-[11px] tracking-[0.28em] uppercase text-olive-400">{insights.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-medium text-white tracking-wide">
            {insights.heading}
          </h2>
          <p className="mt-4 text-white/65 font-light leading-relaxed">{insights.paragraph}</p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
              <img
                src={insights.leftCard.image}
                alt={insights.leftCard.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="font-display text-xl text-white">{insights.leftCard.title}</h3>
                <p className="mt-2 text-sm text-white/70 font-light">{insights.leftCard.description}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-7" delay={0.1}>
            <div className="h-full grid grid-cols-2 gap-8 content-center border border-white/10 bg-ink-950/60 p-8 sm:p-10">
              {insights.stats.map((stat) => (
                <StatCounter
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
