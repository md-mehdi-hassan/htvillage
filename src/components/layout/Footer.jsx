import { footer } from '../../data/content'
import { useSmoothScroll } from '../animations/smoothScrollContext'
import SocialIcon from '../ui/SocialIcon'

export default function Footer() {
  const lenisRef = useSmoothScroll()

  const go = (e, href) => {
    if (!href?.startsWith('#')) return
    e.preventDefault()
    const target = document.querySelector(href)
    if (!target) return
    const lenis = lenisRef?.current
    if (lenis) lenis.scrollTo(target, { offset: -20, duration: 1.2 })
    else target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      id={footer.id}
      className="relative z-20 section-pad pt-16 lg:pt-20 pb-10"
      style={{ backgroundColor: '#7d824e', color: '#ffffff' }}
    >
      <div className="container-max">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="font-display text-xl tracking-[0.16em] uppercase text-white">
              {footer.brand}
            </div>
            <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-white/85">
              {footer.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {footer.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="h-10 w-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-colors"
                  aria-label={s.label}
                >
                  <SocialIcon type={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-white/75">
              {footer.quickLinks.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footer.quickLinks.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    className="text-sm font-light text-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-white/75">
              {footer.projects.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footer.projects.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    className="text-sm font-light text-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-5 text-sm font-light leading-relaxed lg:text-right text-white">
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-white/75">
                {footer.hotline.label}
              </div>
              <a
                href={`tel:${footer.hotline.value.replace(/\s/g, '')}`}
                className="mt-1 block text-white hover:underline"
              >
                {footer.hotline.value}
              </a>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-white/75">
                {footer.sales.label}
              </div>
              <a
                href={`tel:${footer.sales.value.replace(/\s/g, '')}`}
                className="mt-1 block text-white hover:underline"
              >
                {footer.sales.value}
              </a>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-white/75">
                {footer.email.label}
              </div>
              <a
                href={`mailto:${footer.email.value}`}
                className="mt-1 block text-white hover:underline"
              >
                {footer.email.value}
              </a>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-white/75">
                {footer.address.label}
              </div>
              {footer.address.lines.map((line) => (
                <div key={line} className="mt-1 text-white">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/25">
          <p className="text-xs text-white/80">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
