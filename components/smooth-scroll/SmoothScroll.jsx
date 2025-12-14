'use client'

import { useEffect, useRef } from 'react'

export default function SmoothScroll({ enabled = true, lerp = 0.08, maxDelta = 120 }) {
  const animRef = useRef(null)
  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const disabledRef = useRef(false)

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!enabled || prefersReduced) return
    if (typeof window === 'undefined') return
    
    // Desabilitar smooth scroll no mobile
    const isMobile = window.innerWidth < 768 || 
                     ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    if (isMobile) return

    if (window.Lenis) {
      const lenis = new window.Lenis({ lerp })
      let r
      const raf = (time) => { lenis.raf(time); r = requestAnimationFrame(raf) }
      r = requestAnimationFrame(raf)
      const bodyObserver = new MutationObserver(() => {
        const locked = document.body.classList.contains('lock-screen')
        if (locked && r) { cancelAnimationFrame(r); r = null }
        if (!locked && !r) { r = requestAnimationFrame(raf) }
      })
      bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })
      return () => { if (r) cancelAnimationFrame(r); bodyObserver.disconnect() }
    }

    const clamp = (v, min, max) => Math.max(min, Math.min(v, max))

    const getMaxScroll = () => {
      const doc = document.documentElement
      const body = document.body
      return Math.max(doc.scrollHeight, body.scrollHeight) - window.innerHeight
    }

    const start = () => {
      if (animRef.current) return
      animRef.current = requestAnimationFrame(tick)
    }
    const stop = () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
    }

    const setTarget = (y) => {
      const max = getMaxScroll()
      targetRef.current = clamp(y, 0, max)
      start()
    }

    currentRef.current = window.scrollY
    targetRef.current = currentRef.current

    const wheel = (e) => {
      if (disabledRef.current) return
      e.preventDefault()
      const delta = clamp(e.deltaY, -maxDelta, maxDelta)
      setTarget(targetRef.current + delta)
    }

    const keydown = (e) => {
      if (disabledRef.current) return
      const step = 80
      const page = window.innerHeight * 0.9
      switch (e.key) {
        case 'ArrowDown': e.preventDefault(); setTarget(targetRef.current + step); break
        case 'ArrowUp': e.preventDefault(); setTarget(targetRef.current - step); break
        case 'PageDown': e.preventDefault(); setTarget(targetRef.current + page); break
        case 'PageUp': e.preventDefault(); setTarget(targetRef.current - page); break
        case 'Home': e.preventDefault(); setTarget(0); break
        case 'End': e.preventDefault(); setTarget(getMaxScroll()); break
      }
    }

    const tick = () => {
      const cur = currentRef.current
      const tgt = targetRef.current
      const next = cur + (tgt - cur) * lerp
      currentRef.current = next
      window.scrollTo(0, next)
      if (window.ScrollTrigger) window.ScrollTrigger.update()
      if (Math.abs(tgt - next) < 0.5) {
        stop()
        window.scrollTo(0, tgt)
        if (window.ScrollTrigger) window.ScrollTrigger.update()
        return
      }
      animRef.current = requestAnimationFrame(tick)
    }

    const onResize = () => {
      targetRef.current = clamp(targetRef.current, 0, getMaxScroll())
    }

    const bodyObserver = new MutationObserver(() => {
      const locked = document.body.classList.contains('lock-screen')
      disabledRef.current = locked
      if (locked) stop()
    })
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    window.addEventListener('wheel', wheel, { passive: false })
    window.addEventListener('keydown', keydown, { passive: false })
    window.addEventListener('resize', onResize)

    return () => {
      stop()
      bodyObserver.disconnect()
      window.removeEventListener('wheel', wheel)
      window.removeEventListener('keydown', keydown)
      window.removeEventListener('resize', onResize)
    }
  }, [enabled, lerp, maxDelta])

  return null
}
