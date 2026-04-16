'use client'
import { useEffect, useRef } from 'react'

export default function TextParallax({ images = ['/images/1.jpg', '/images/2.jpg'], text = 'Desenvolvedor Front End' }) {
  const containerRef = useRef(null)
  const slideRefs = useRef([])
  slideRefs.current = []

  const registerSlide = (el) => {
    if (el) slideRefs.current.push(el)
  }

  useEffect(() => {
    let interval
    let cleanup
    const init = () => {
      const g = window.gsap
      const st = window.ScrollTrigger
      if (!g || !st || !containerRef.current) return false
      g.registerPlugin(st)

      const animations = slideRefs.current.map((slide) => {
        const dir = slide.dataset.dir === 'left' ? -1 : 1
        return g.fromTo(
          slide,
          { xPercent: 22 * dir },
          {
            xPercent: -22 * dir,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        )
      })

      cleanup = () => {
        animations.forEach((anim) => {
          if (anim.scrollTrigger) {
            anim.scrollTrigger.kill()
            return
          }
          anim.kill()
        })
      }
      return true
    }

    if (!init()) {
      interval = setInterval(() => {
        if (init() && interval) clearInterval(interval)
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
      if (cleanup) cleanup()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        overflow: 'hidden',
        width: '100%',
        marginTop: '22vh',
        marginBottom: '72px',
        minHeight: '32vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '36px',
        paddingLeft: '2vw',
        paddingRight: '2vw'
      }}
    >
      <Slide src={images[0]} direction="left" left="-40%" text={text} registerSlide={registerSlide} />
      <Slide src={images[1]} direction="right" left="-25%" text={text} registerSlide={registerSlide} />
    </div>
  )
}

function Slide({ src, direction, left, text, registerSlide }) {
  return (
    <div
      ref={registerSlide}
      data-dir={direction}
      style={{ position: 'relative', left, display: 'flex', whiteSpace: 'nowrap' }}
    >
      <Phrase src={src} text={text} />
      <Phrase src={src} text={text} />
      <Phrase src={src} text={text} />
    </div>
  )
}

function Phrase({ src, text }) {
  return (
    <div style={{ paddingLeft: 16, paddingRight: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
      <p style={{ fontSize: '4.2vw', margin: 0 }}>{text}</p>
      <span style={{ position: 'relative', height: '3.2vw', width: '6.4vw', borderRadius: 9999, overflow: 'hidden', display: 'inline-block' }}>
        <img src={src} alt="image" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
      </span>
    </div>
  )
}
