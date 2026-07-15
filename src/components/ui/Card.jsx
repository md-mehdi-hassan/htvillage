import { useEffect, useRef } from 'react'
import { gsap, registerGsapPlugins } from '../../lib/gsapConfig'

export default function Card({
  children,
  className = '',
  media,
  mediaAlt = '',
  overlay = true,
  scaleOnScroll = false,
  hoverZoom = true,
  as: Tag = 'article',
}) {
  const rootRef = useRef(null)
  const mediaRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!scaleOnScroll) return
    registerGsapPlugins()
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (mediaRef.current) {
        gsap.fromTo(
          mediaRef.current,
          { scale: 0.95 },
          {
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: root,
              start: 'top 85%',
              end: 'top 40%',
              scrub: true,
            },
          }
        )
      }
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0.85 },
          {
            opacity: 0.45,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top 85%',
              end: 'top 40%',
              scrub: true,
            },
          }
        )
      }
    }, root)

    return () => ctx.revert()
  }, [scaleOnScroll])

  return (
    <Tag
      ref={rootRef}
      className={`media-card glass-panel ${hoverZoom ? 'group' : ''} ${className}`}
    >
      {media && (
        <div className="relative overflow-hidden min-h-[200px] bg-gradient-to-br from-navy-700 via-navy-800 to-cyan-900/30">
          <img
            ref={mediaRef}
            src={media}
            alt={mediaAlt}
            className={`w-full h-full object-cover min-h-[200px] ${hoverZoom ? 'transition-transform duration-700 ease-out group-hover:scale-105' : ''}`}
            onError={(e) => {
              e.currentTarget.style.opacity = '0'
            }}
          />
          {overlay && (
            <div
              ref={overlayRef}
              className="media-overlay"
              aria-hidden="true"
            />
          )}
        </div>
      )}
      {children}
    </Tag>
  )
}
