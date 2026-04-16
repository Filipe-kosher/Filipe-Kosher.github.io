'use client'
import { useRef, useEffect } from 'react'
import styles from './modal.module.css'

export default function Modal({ modal, projects }) {
  const { active, index } = modal
  const modalContainer = useRef(null)
  const cursor = useRef(null)
  const cursorLabel = useRef(null)
  const sliderRef = useRef(null)

  useEffect(() => {
    let interval
    const setup = () => {
      const g = window.gsap
      const targets = [modalContainer.current, cursor.current, cursorLabel.current].filter(Boolean)
      if (!g || !targets.length) return false
      g.set(targets, { scale: 0, autoAlpha: 0, xPercent: -50, yPercent: -50 })
      return true
    }
    if (!setup()) {
      interval = setInterval(() => {
        if (setup() && interval) clearInterval(interval)
      }, 100)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const g = window.gsap
    const targets = [modalContainer.current, cursor.current, cursorLabel.current].filter(Boolean)
    if (!g || !targets.length) return
    g.to(targets, {
      scale: active ? 1 : 0,
      autoAlpha: active ? 1 : 0,
      duration: 0.4,
      ease: active ? 'power3.out' : 'power2.in'
    })
  }, [active])

  useEffect(() => {
    if (!sliderRef.current) return
    sliderRef.current.style.transform = `translateY(${index * -100}%)`
  }, [index])

  useEffect(() => {
    if (!modalContainer.current) return
    const g = window.gsap
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let curX = targetX
    let curY = targetY
    let raf
    const animate = () => {
      curX += (targetX - curX) * 0.2
      curY += (targetY - curY) * 0.2
      if (modalContainer.current) {
        modalContainer.current.style.left = `${curX}px`
        modalContainer.current.style.top = `${curY}px`
      }
      if (cursor.current) {
        cursor.current.style.left = `${curX}px`
        cursor.current.style.top = `${curY}px`
      }
      if (cursorLabel.current) {
        cursorLabel.current.style.left = `${curX}px`
        cursorLabel.current.style.top = `${curY}px`
      }
      raf = requestAnimationFrame(animate)
    }
    const onMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
      if (g) {
        g.set(modalContainer.current, { left: targetX, top: targetY })
        g.set(cursor.current, { left: targetX, top: targetY })
        g.set(cursorLabel.current, { left: targetX, top: targetY })
      }
    }
    window.addEventListener('mousemove', onMove)
    animate()
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={modalContainer} className={styles.modalContainer}>
        <div ref={sliderRef} className={styles.modalSlider}>
          {projects.map((project, i) => (
            <div className={styles.modal} style={{ backgroundColor: project.color || '#000' }} key={`modal_${i}`}>
              <img src={project.src} width={300} alt={project.title || 'image'} />
            </div>
          ))}
        </div>
      </div>
      <div ref={cursor} className={styles.cursor}></div>
      <div ref={cursorLabel} className={styles.cursorLabel}>View</div>
    </>
  )
}
