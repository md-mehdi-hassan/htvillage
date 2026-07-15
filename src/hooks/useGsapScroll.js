import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, registerGsapPlugins, defaults } from '../lib/gsapConfig'

/**
 * Creates a GSAP context scoped to a ref, with ScrollTrigger cleanup on unmount.
 * @param {(helpers: { gsap: typeof gsap, ScrollTrigger: typeof ScrollTrigger, defaults: typeof defaults }) => void} animationFactory
 * @param {unknown[]} deps
 */
export function useGsapScroll(animationFactory, deps = []) {
  const scopeRef = useRef(null)

  useEffect(() => {
    registerGsapPlugins()
    const scope = scopeRef.current
    if (!scope) return

    const ctx = gsap.context(() => {
      animationFactory({ gsap, ScrollTrigger, defaults })
    }, scope)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scopeRef
}

export default useGsapScroll
