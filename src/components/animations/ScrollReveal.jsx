import { useEffect, useRef } from 'react'
import { gsap, registerGsapPlugins, defaults } from '../../lib/gsapConfig'

export default function ScrollReveal({
  children,
  className = '',
  y = 60,
  delay = 0,
  duration = defaults.duration,
  stagger = 0,
  staggerSelector = '[data-reveal-child]',
  as: Tag = 'div',
  once = true,
  start = 'top 85%',
}) {
  const rootRef = useRef(null)

  useEffect(() => {
    registerGsapPlugins()
    const el = rootRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const childNodes = stagger > 0 ? el.querySelectorAll(staggerSelector) : null
      const targets =
        childNodes && childNodes.length > 0 ? childNodes : el

      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: defaults.ease,
          stagger: childNodes && childNodes.length > 0 ? stagger : 0,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [y, delay, duration, stagger, staggerSelector, once, start])

  return (
    <Tag ref={rootRef} className={className}>
      {children}
    </Tag>
  )
}
