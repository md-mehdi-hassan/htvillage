import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap, ScrollTrigger, registerGsapPlugins } from '../../lib/gsapConfig'
import { SmoothScrollContext } from './smoothScrollContext'

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    registerGsapPlugins()

    const lenis = new Lenis({
      duration: 1.45,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.35,
      syncTouch: true,
    })

    lenisRef.current = lenis

    // Native scroll + Lenis RAF — no scrollerProxy (that breaks pin)
    lenis.on('scroll', ScrollTrigger.update)

    const onTicker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTicker)
    gsap.ticker.lagSmoothing(0)

    const onRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', onRefresh)

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(raf)
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      gsap.ticker.remove(onTicker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <SmoothScrollContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
