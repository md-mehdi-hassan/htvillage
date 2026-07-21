import { useState } from 'react'
import { leadership, leadershipTeam } from '../../data/content'
import ScrollReveal from '../animations/ScrollReveal'

function initialsFromName(name) {
  return name
    .replace(/,.*$/, '')
    .split(/\s+/)
    .filter((w) => !/^(md|dr|phd)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function MemberPortrait({ member }) {
  const [failed, setFailed] = useState(false)
  const initials = initialsFromName(member.name)

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
      {!failed ? (
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover object-top grayscale-[35%] transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center bg-ink-800"
          aria-hidden="true"
        >
          <span className="font-display text-4xl sm:text-5xl font-medium tracking-wide text-white/25">
            {initials}
          </span>
        </div>
      )}
    </div>
  )
}

export default function Leadership() {
  return (
    <section
      id={leadership.id}
      className="bg-ink-950 section-pad py-14 sm:py-20 lg:py-28"
    >
      <div className="container-max">
        <ScrollReveal className="max-w-2xl">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#3e8914]">
            {leadership.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-2xl sm:text-4xl lg:text-5xl font-medium tracking-wide text-white">
            {leadership.heading}
          </h2>
        </ScrollReveal>

        <div className="mt-10 sm:mt-14 lg:mt-16 grid gap-10 sm:gap-12 lg:grid-cols-3 lg:gap-10">
          {leadershipTeam.map((member, i) => (
            <ScrollReveal key={member.id} delay={i * 0.15}>
              <article className="group">
                <MemberPortrait member={member} />

                <div
                  className="mt-5 h-px w-full bg-[#3e8914]/45"
                  aria-hidden="true"
                />

                <h3 className="mt-5 font-display text-xl sm:text-2xl font-medium tracking-wide leading-snug text-white">
                  {member.name}
                </h3>
                <p className="mt-2 text-[11px] tracking-[0.16em] uppercase leading-relaxed text-white/45">
                  {member.title}
                </p>
                <p className="mt-4 text-sm font-light leading-relaxed text-white/55 line-clamp-4">
                  {member.bio}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
