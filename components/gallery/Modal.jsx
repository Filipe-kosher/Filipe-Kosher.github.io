'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './modal.module.css'

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: { scale: 1, x: '-50%', y: '-50%', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed: { scale: 0, x: '-50%', y: '-50%', transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
}

export default function Modal({ modal, projects }) {
  const { active, index } = modal
  const modalContainer = useRef(null)
  const cursor = useRef(null)
  const cursorLabel = useRef(null)

  useEffect(() => {
    if (!modalContainer.current) return
    const g = window.gsap
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let curX = targetX
    let curY = targetY
    let raf
    function animate(){
      curX += (targetX - curX) * 0.2
      curY += (targetY - curY) * 0.2
      if (modalContainer.current){
        modalContainer.current.style.left = curX + 'px'
        modalContainer.current.style.top = curY + 'px'
      }
      if (cursor.current){
        cursor.current.style.left = curX + 'px'
        cursor.current.style.top = curY + 'px'
      }
      if (cursorLabel.current){
        cursorLabel.current.style.left = curX + 'px'
        cursorLabel.current.style.top = curY + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    function onMove(e){
      targetX = e.clientX
      targetY = e.clientY
      if (g){
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
      <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? 'enter' : 'closed'} className={styles.modalContainer}>
        <div style={{ transform: 'translateY(' + (index * -100) + '%)' }} className={styles.modalSlider}>
          {projects.map((project, i) => (
            <div className={styles.modal} style={{ backgroundColor: project.color || '#000' }} key={`modal_${i}`}>
              <img src={project.src} width={300} alt={project.title || 'image'} />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div ref={cursor} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={active ? 'enter' : 'closed'}></motion.div>
      <motion.div ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={active ? 'enter' : 'closed'}>View</motion.div>
    </>
  )
}
