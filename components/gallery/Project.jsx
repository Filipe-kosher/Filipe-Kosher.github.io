'use client'
import { useEffect, useState } from 'react'
import styles from './project.module.css'

export default function Project({ index, title, setModal, url, src }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseEnter = () => {
    if (!isMobile) setModal({ active: true, index })
  }

  const handleMouseLeave = () => {
    if (!isMobile) setModal({ active: false, index })
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => { if (url) window.open(url, '_blank') }} className={styles.project}>
      {src && <img src={src} alt={title} className={styles.projectImage} />}
      <div className={styles.projectContent}>
      <h2>{title}</h2>
      <p>Design & Development</p>
      </div>
    </div>
  )
}
