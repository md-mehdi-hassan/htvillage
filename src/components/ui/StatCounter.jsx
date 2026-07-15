import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, registerGsapPlugins } from '../../lib/gsapConfig'

export default function StatCounter({
  value,
  label,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) {
  const rootRef = useRef(null)
  const numRef = useRef(null)

  useEffect(() => {
    registerGsapPlugins()
    const root = rootRef.current
    if (!root) return

    const target = Number(value) || 0
    const obj = { val: 0 }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              if (!numRef.current) return
              const formatted =
                decimals > 0
                  ? obj.val.toFixed(decimals)
                  : Math.round(obj.val).toLocaleString('en-US')
              numRef.current.textContent = `${prefix}${formatted}${suffix}`
            },
          })
        },
      })
    }, root)

    return () => ctx.revert()
  }, [value, prefix, suffix, decimals])

  return (
    <div ref={rootRef} className={`${className}`}>
      <div
        ref={numRef}
        className="font-display text-3xl sm:text-4xl font-medium text-white tracking-wide"
      >
        {prefix}0{suffix}
      </div>
      <div className="mt-2 text-xs tracking-[0.16em] uppercase text-white/45">{label}</div>
    </div>
  )
}
