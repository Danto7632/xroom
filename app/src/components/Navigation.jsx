import { useState, useEffect } from 'react'
import styles from './Navigation.module.css'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navItems = [
    { label: '여행코스', id: 'experience' },
    { label: '갤러리', id: 'gallery' },
    { label: '신청', id: 'apply' }
  ]

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div 
        className={styles.logo}
        onClick={() => scrollToSection('hero')}
      >
        응답하라 청춘
      </div>
      <div className={styles.menu}>
        {navItems.map((item) => (
          <span
            key={item.id}
            className={styles.menuItem}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </span>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
