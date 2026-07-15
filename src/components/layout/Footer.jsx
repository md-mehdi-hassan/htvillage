import { footer } from '../../data/content'
import { useSmoothScroll } from '../animations/smoothScrollContext'
import SocialIcon from '../ui/SocialIcon'

const CORE = '#6a040f'
/** Darker strip than secondary #9d0208 */
const STRIP = '#4a0106'
const OFF_WHITE = '#f4f1ea'

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

  const navLinks = [...footer.quickLinks.links, ...footer.projects.links]
  const navLeft = navLinks.slice(0, Math.ceil(navLinks.length / 2))
  const navRight = navLinks.slice(Math.ceil(navLinks.length / 2))

  return (
    <footer
      id={footer.id}
      className="relative z-20 pt-6 sm:pt-8"
      style={{ backgroundColor: STRIP }}
    >
      <div
        className="footer-card relative overflow-hidden rounded-t-[2rem] sm:rounded-t-[2.75rem] lg:rounded-t-[3.5rem] section-pad pt-12 sm:pt-16 lg:pt-20 pb-0"
        style={{ backgroundColor: CORE, color: OFF_WHITE }}
      >
        <div className="container-max">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-[11px] tracking-[0.22em] uppercase opacity-45">
                {footer.quickLinks.title}
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                <ul className="space-y-3">
                  {navLeft.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => go(e, link.href)}
                        className="footer-link-nav"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {navRight.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => go(e, link.href)}
                        className="footer-link-nav"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase opacity-45">
                  {footer.email.label}
                </p>
                <a href={`mailto:${footer.email.value}`} className="footer-link-meta mt-3 block">
                  {footer.email.value}
                </a>
                <p className="mt-6 text-[11px] tracking-[0.22em] uppercase opacity-45">
                  {footer.hotline.label}
                </p>
                <a
                  href={`tel:${footer.hotline.value.replace(/\s/g, '')}`}
                  className="footer-link-meta mt-2 block"
                >
                  {footer.hotline.value}
                </a>
                <p className="mt-4 text-[11px] tracking-[0.22em] uppercase opacity-45">
                  {footer.sales.label}
                </p>
                <a
                  href={`tel:${footer.sales.value.replace(/\s/g, '')}`}
                  className="footer-link-meta mt-2 block"
                >
                  {footer.sales.value}
                </a>
              </div>

              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase opacity-45">
                  {footer.address.label}
                </p>
                <div className="mt-3 space-y-1 text-base sm:text-lg font-light leading-relaxed opacity-90">
                  {footer.address.lines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 lg:justify-self-end w-full lg:max-w-[220px]">
              <div className="flex items-start justify-between gap-4 lg:flex-col lg:items-end">
                <div className="lg:w-full lg:text-right">
                  <p className="text-[11px] tracking-[0.22em] uppercase opacity-45">Follow Us</p>
                  <div className="mt-4 flex flex-wrap gap-2 lg:justify-end">
                    {footer.socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="footer-social"
                        aria-label={s.label}
                      >
                        <SocialIcon type={s.icon} />
                      </a>
                    ))}
                  </div>
                </div>

                <div
                  className="footer-badge shrink-0 h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] rounded-full flex flex-col items-center justify-center text-center"
                  aria-hidden="true"
                >
                  <span className="text-[9px] tracking-[0.14em] uppercase opacity-70 leading-none">ISO</span>
                  <span className="mt-1 text-xs font-medium leading-none opacity-95">27001</span>
                </div>
              </div>

              <p className="mt-8 text-sm font-light leading-relaxed lg:text-right opacity-55">
                {footer.description}
              </p>
            </div>
          </div>

          <div
            className="mt-14 sm:mt-16 pt-6 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 relative z-10"
            style={{ borderTop: '1px solid rgba(244,241,234,0.15)' }}
          >
            <p className="text-xs opacity-50">{footer.copyright}</p>
            <div className="flex flex-wrap gap-5 text-xs opacity-55">
              <a href="#connect" onClick={(e) => go(e, '#connect')} className="footer-link-legal">
                Contact
              </a>
              <a href="#about" onClick={(e) => go(e, '#about')} className="footer-link-legal">
                About HTV
              </a>
            </div>
          </div>

          <div className="relative z-0 overflow-hidden select-none pointer-events-none pt-2 pb-2 text-center">
            <div
              className="font-display font-semibold uppercase tracking-[-0.04em] leading-[0.78] whitespace-nowrap opacity-95"
              style={{ fontSize: 'clamp(4.5rem, 18vw, 12rem)', color: OFF_WHITE }}
              aria-hidden="true"
            >
              {footer.brand}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
