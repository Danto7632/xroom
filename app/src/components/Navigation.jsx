import { useState, useEffect } from 'react'
import styles from './Navigation.module.css'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navItems = [
    { label: '여행코스', id: 'experience' },
    { label: '갤러리', id: 'gallery' },
    { label: '신청', id: 'apply' }
  ]

  return (
    <>
      <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
        <div 
          className={styles.logo}
          onClick={() => scrollToSection('hero')}
        >
          응답하라 청춘
        </div>
        
        {/* 모바일 햄버거 버튼 */}
        <button 
          className={styles.mobileMenuBtn}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
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
      
      {/* 오버레이 */}
      <div 
        className={`${styles.overlay} ${isMenuOpen ? styles.show : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  )
}

export default Navigation
