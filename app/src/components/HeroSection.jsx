import { useEffect, useState } from 'react'
import styles from './HeroSection.module.css'

// 갤러리 이미지를 히어로 배경으로 사용
import heroImg from '../assets/gallery/감천.png'

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 페이지 로드 후 애니메이션 시작
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      {/* 배경 이미지 */}
      <div 
        className={`${styles.bgImage} ${isLoaded ? styles.bgLoaded : ''}`}
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className={styles.overlay} />

      {/* 장식 요소 */}
      <div className={styles.floatingElements}>
        <div className={styles.floatCircle1} />
        <div className={styles.floatCircle2} />
        <div className={styles.floatCircle3} />
      </div>

      <div className={`${styles.content} ${isLoaded ? styles.contentLoaded : ''}`}>
        <div className={styles.badge}>
          전담 VJ 가이드 × 시네마틱 브이로그
        </div>

        <h1 className={styles.title}>
          <span className={styles.titleSub}></span>
          응답하라 청춘
        </h1>

        <div className={styles.tagline}>
          : 감천 X-룸 프로젝트
        </div>

        <p className={styles.description}>
          자녀는 기록의 압박에서 해방, 부모님은 연예인 체험<br />
          1980년대로의 시간 여행을 통해<br />
          <strong>무뚝뚝한 부부를 다시 다정한 연인으로</strong>
        </p>

        <div className={styles.buttons}>
          <button 
            className={styles.btnPrimary}
            onClick={() => scrollToSection('apply')}
          >
            <span>체험 신청하기</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button 
            className={styles.btnSecondary}
            onClick={() => scrollToSection('gallery')}
          >
            프로그램 둘러보기
          </button>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className={`${styles.scrollIndicator} ${isLoaded ? styles.scrollLoaded : ''}`} onClick={() => scrollToSection('intro')}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
        <span>아래로 스크롤</span>
      </div>
    </section>
  )
}

export default HeroSection
