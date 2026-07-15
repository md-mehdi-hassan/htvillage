import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { navbar } from '../../data/content'
import { useSmoothScroll } from '../animations/smoothScrollContext'
import { useTheme } from '../../context/ThemeContext'
import { gsap, registerGsapPlugins } from '../../lib/gsapConfig'
import SocialIcon from '../ui/SocialIcon'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState({})
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hoverTop, setHoverTop] = useState(false)

  const overlayRef = useRef(null)
  const panelRef = useRef(null)
  const headerRef = useRef(null)
  const lastScrollRef = useRef(0)
  const lenisRef = useSmoothScroll()
  const { isDark, toggleTheme } = useTheme()

  const filteredLinks = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return navbar.links
    return navbar.links
      .map((link) => {
        const childHits = (link.children || []).filter((c) =>
          c.label.toLowerCase().includes(q)
        )
        const selfHit = link.label.toLowerCase().includes(q)
        if (selfHit || childHits.length) {
          return {
            ...link,
            children: selfHit ? link.children : childHits,
          }
        }
        return null
      })
      .filter(Boolean)
  }, [query])

  const showNav = open || !hidden || hoverTop

  useEffect(() => {
    const onScrollPos = (scrollY) => {
      const y = scrollY ?? window.scrollY ?? 0
      setScrolled(y > 24)

      const delta = y - lastScrollRef.current
      lastScrollRef.current = y

      if (open || hoverTop) {
        setHidden(false)
        return
      }

      if (y < 60) {
        setHidden(false)
        return
      }

      if (delta > 6) setHidden(true)
      else if (delta < -6) setHidden(false)
    }

    const lenis = lenisRef?.current
    const onLenis = (e) => onScrollPos(e?.scroll ?? lenis?.scroll ?? window.scrollY)

    if (lenis) {
      lenis.on('scroll', onLenis)
      onScrollPos(lenis.scroll || 0)
      return () => lenis.off?.('scroll', onLenis)
    }

    const onWin = () => onScrollPos(window.scrollY)
    window.addEventListener('scroll', onWin, { passive: true })
    onWin()
    return () => window.removeEventListener('scroll', onWin)
  }, [lenisRef, open, hoverTop])

  useEffect(() => {
    const onMove = (e) => setHoverTop(e.clientY <= 64)
    const onLeave = () => setHoverTop(false)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(() => {
    registerGsapPlugins()
    const header = headerRef.current
    if (!header) return
    gsap.to(header, {
      yPercent: showNav ? 0 : -110,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: true,
    })
  }, [showNav])

  useEffect(() => {
    const lenis = lenisRef?.current
    if (open) {
      document.body.style.overflow = 'hidden'
      lenis?.stop?.()
      setHidden(false)
    } else {
      document.body.style.overflow = ''
      lenis?.start?.()
    }
    return () => {
      document.body.style.overflow = ''
      lenis?.start?.()
    }
  }, [open, lenisRef])

  useEffect(() => {
    registerGsapPlugins()
    if (!open) return
    const overlay = overlayRef.current
    const panel = panelRef.current
    if (!overlay || !panel) return

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
    gsap.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.55, ease: 'power3.out' })
    gsap.fromTo(
      panel.querySelectorAll('[data-menu-item]'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.045, duration: 0.4, delay: 0.12, ease: 'power2.out' }
    )
  }, [open])

  const closeMenu = () => {
    registerGsapPlugins()
    const overlay = overlayRef.current
    const panel = panelRef.current
    if (!panel) {
      setOpen(false)
      return
    }
    const tl = gsap.timeline({
      onComplete: () => {
        setOpen(false)
        setQuery('')
      },
    })
    if (overlay) tl.to(overlay, { opacity: 0, duration: 0.25 }, 0)
    tl.to(panel, { xPercent: 100, duration: 0.4, ease: 'power3.in' }, 0)
  }

  const go = (e, href) => {
    if (!href?.startsWith('#')) return
    e.preventDefault()
    const scrollToTarget = () => {
      const target = document.querySelector(href)
      if (!target) return
      const lenis = lenisRef?.current
      if (lenis) lenis.scrollTo(target, { offset: -20, duration: 1.25 })
      else target.scrollIntoView({ behavior: 'smooth' })
    }
    if (open) {
      closeMenu()
      window.setTimeout(scrollToTarget, 420)
    } else {
      scrollToTarget()
    }
  }

  const toggleExpand = (label) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <>
      <div
        className="fixed top-0 inset-x-0 z-[49] h-3"
        onMouseEnter={() => setHoverTop(true)}
        aria-hidden="true"
      />

      <header ref={headerRef} className="fixed top-0 inset-x-0 z-50 will-change-transform">
        <div
          className={`section-pad transition-[background-color,backdrop-filter,border-color,box-shadow,padding] duration-300 ${
            scrolled
              ? 'py-3 border-b border-black/5 bg-[var(--page-bg)]/92 backdrop-blur-xl shadow-sm'
              : 'py-4 bg-transparent border-b border-transparent'
          }`}
        >
          <div className="container-max flex items-center justify-between">
            <a
              href="#hero"
              onClick={(e) => go(e, '#hero')}
              className="font-display text-sm sm:text-base font-medium tracking-[0.18em] uppercase text-[var(--nav-fg)]"
            >
              {navbar.logo}
            </a>

            <div className="flex items-center gap-5 sm:gap-7">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[var(--page-fg-muted)] hover:text-[var(--nav-fg)] transition-colors"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-pressed={isDark}
              >
                <span className="hidden sm:inline">{isDark ? navbar.darkLabel : navbar.lightLabel}</span>
                <span className="sm:hidden" aria-hidden="true">
                  {isDark ? 'D' : 'L'}
                </span>
                <span
                  className={`relative inline-flex h-5 w-9 items-center rounded-full px-0.5 transition-colors duration-300 ${
                    isDark ? 'bg-white/20' : 'bg-black/15'
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full transition-transform duration-300 ease-out ${
                      isDark ? 'translate-x-4 bg-white' : 'translate-x-0 bg-[#121212]'
                    }`}
                  />
                </span>
              </button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex items-center gap-2.5 text-[11px] tracking-[0.22em] uppercase text-[var(--nav-fg)] hover:opacity-75 transition-opacity"
                aria-label="Open menu"
              >
                {navbar.menuLabel}
                <span className="flex flex-col gap-[5px]" aria-hidden="true">
                  <span className="block h-px w-5 bg-current" />
                  <span className="block h-px w-5 bg-current" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[80] flex justify-end">
            <button
              ref={overlayRef}
              type="button"
              className="absolute right-0 bottom-0 h-full w-full bg-black/55"
              aria-label="Close menu overlay"
              onClick={closeMenu}
            />
            <aside
              ref={panelRef}
              id="menu-panel"
              data-lenis-prevent
              className="relative h-full w-full max-w-md bg-ink-950 border-l border-white/10 section-pad py-8 flex flex-col text-[var(--page-fg)]"
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeMenu}
                  className="text-[11px] tracking-[0.22em] uppercase text-[var(--page-fg-muted)] hover:text-[var(--page-fg)]"
                >
                  {navbar.closeLabel} ✕
                </button>
              </div>

              <div data-menu-item className="mt-10 relative">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={navbar.searchPlaceholder}
                  className="w-full bg-transparent border-b border-white/20 py-3 pr-10 text-sm text-[var(--page-fg)] placeholder:text-[var(--page-fg-soft)] outline-none focus:border-olive-500"
                />
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--page-fg-soft)] text-sm">⌕</span>
              </div>

              <nav className="mt-10 flex-1 overflow-y-auto">
                <ul className="space-y-1">
                  {filteredLinks.map((link) => {
                    const hasChildren = Array.isArray(link.children) && link.children.length > 0
                    const isOpen = expanded[link.label] || Boolean(query.trim())
                    return (
                      <li key={link.label} data-menu-item className="border-b border-white/5 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <a
                            href={link.href}
                            onClick={(e) => go(e, link.href)}
                            className="text-lg sm:text-xl font-light tracking-wide text-[var(--page-fg)] hover:text-olive-500 transition-colors"
                          >
                            {link.label}
                          </a>
                          {hasChildren && (
                            <button
                              type="button"
                              onClick={() => toggleExpand(link.label)}
                              className="text-[var(--page-fg-soft)] text-sm px-2 py-1 hover:text-[var(--page-fg)]"
                              aria-expanded={isOpen}
                            >
                              {isOpen ? '▾' : '›'}
                            </button>
                          )}
                        </div>
                        {hasChildren && isOpen && (
                          <ul className="mt-3 ml-1 space-y-2.5">
                            {link.children.map((child) => (
                              <li key={child.label}>
                                <a
                                  href={child.href}
                                  onClick={(e) => go(e, child.href)}
                                  className="text-sm text-[var(--page-fg-muted)] hover:text-olive-500 transition-colors"
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
                {!filteredLinks.length && (
                  <p className="text-sm text-[var(--page-fg-soft)] pt-4">No matches found.</p>
                )}
              </nav>

              <div data-menu-item className="pt-6 border-t border-white/10">
                <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--page-fg-soft)]">
                  {navbar.followUs}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {navbar.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="h-9 w-9 rounded-full border border-white/25 flex items-center justify-center text-[var(--page-fg-muted)] hover:border-olive-500 hover:text-olive-500 transition-colors"
                      aria-label={s.label}
                    >
                      <SocialIcon type={s.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </>
  )
}
