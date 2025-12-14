'use client'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export default function TextParallax({ images = ['/images/1.jpg', '/images/2.jpg'], text = 'Desenvolvedor Front End' }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })

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
      <Slide src={images[0]} direction="left" left="-40%" progress={scrollYProgress} text={text} />
      <Slide src={images[1]} direction="right" left="-25%" progress={scrollYProgress} text={text} />
    </div>
  )
}

function Slide({ src, direction, left, progress, text }) {
  const dir = direction === 'left' ? -1 : 1
  const translateX = useTransform(progress, [0, 1], [100 * dir, -100 * dir])
  return (
    <motion.div style={{ x: translateX, position: 'relative', left, display: 'flex', whiteSpace: 'nowrap' }}>
      <Phrase src={src} text={text} />
      <Phrase src={src} text={text} />
      <Phrase src={src} text={text} />
    </motion.div>
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
