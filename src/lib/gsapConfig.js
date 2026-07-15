import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerGsapPlugins() {
  if (registered || typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

export const defaults = {
  ease: 'power3.out',
  duration: 1,
  stagger: 0.15,
}

export { gsap, ScrollTrigger }
