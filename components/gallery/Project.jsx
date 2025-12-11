'use client'
import styles from './project.module.css'

export default function Project({ index, title, setModal, url }) {
  return (
    <div onMouseEnter={() => setModal({ active: true, index })} onMouseLeave={() => setModal({ active: false, index })} onClick={() => { if (url) window.open(url, '_blank') }} className={styles.project}>
      <h2>{title}</h2>
      <p>Design & Development</p>
    </div>
  )
}
