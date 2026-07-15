import { useEffect, useRef } from 'react'
import { gsap, registerGsapPlugins } from '../../lib/gsapConfig'

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  radius = 80,
  as: Tag = 'div',
  ...props
}) {
  const rootRef = useRef(null)
  const xTo = useRef(null)
  const yTo = useRef(null)

  useEffect(() => {
    registerGsapPlugins()
    const el = rootRef.current
    if (!el) return

    xTo.current = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    yTo.current = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist < radius) {
        xTo.current(dx * strength)
        yTo.current(dy * strength)
      } else {
        xTo.current(0)
        yTo.current(0)
      }
    }

    const onLeave = () => {
      xTo.current(0)
      yTo.current(0)
    }

    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [strength, radius])

  return (
    <Tag
      ref={rootRef}
      className={`inline-block will-change-transform ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
