import { useRef, useEffect, useState } from 'react'
import styles from './GallerySection.module.css'

// 이미지 import
import xroom from '../assets/gallery/x룸.png'
import gamcheon from '../assets/gallery/감천.png'
import songdo from '../assets/gallery/송도.png'
import wedding from '../assets/gallery/예식.png'
import gamcheon2 from '../assets/gallery/감천2.png'

const GallerySection = () => {
  const contents = [
    {
      id: 1,
      title: '감천문화마을',
      subtitle: '알록달록 골목의 추억',
      description: '부산의 마추픽추라 불리는 감천문화마을에서 가족과 함께 특별한 추억을 만들어보세요.',
      image: gamcheon,
      color: '#5D2E46'
    },
    {
      id: 2,
      title: '송도 케이블카',
      subtitle: '하늘 위 오붓한 데이트',
      description: '케이블카에서 부모님만의 프라이빗한 시간. 다정한 연인으로 돌아가는 순간.',
      image: songdo,
      color: '#3A7CA5'
    },
    {
      id: 3,
      title: '레트로 의상 체험',
      subtitle: '청춘 시절로의 시간 여행',
      description: '7080 복고 의상을 입고 부모님을 \'청춘 남녀 철수와 영희\'로 되돌립니다.',
      image: wedding,
      color: '#E07B39'
    },
    {
      id: 4,
      title: 'X-룸 전시',
      subtitle: '감동의 피날레',
      description: '모든 여정의 마지막, 편지 낭독과 서프라이즈 파티가 펼쳐지는 가족만의 전시회.',
      image: xroom,
      color: '#C9A959'
    }
  ]

  // 각 슬라이드의 가시성 추적
  const slideRefs = useRef([])
  const [visibleSlides, setVisibleSlides] = useState({})

  useEffect(() => {
    const observers = contents.map((_, idx) => {
      return new IntersectionObserver(
        ([entry]) => {
          setVisibleSlides(prev => ({
            ...prev,
            [idx]: entry.isIntersecting
          }))
        },
        { threshold: 0.2 }
      )
    })

    slideRefs.current.forEach((ref, idx) => {
      if (ref) observers[idx].observe(ref)
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [contents.length])

  return (
    <section id="gallery" className={styles.gallery}>
      <div className={styles.header}>
        <span className={styles.tag}>여행 갤러리</span>
        <h2 className={styles.sectionTitle}>추억의 순간들</h2>
      </div>

      <div className={styles.galleryList}>
        {contents.map((content, idx) => (
          <div 
            key={content.id}
            ref={el => slideRefs.current[idx] = el}
            className={`${styles.galleryItem} ${idx % 2 === 1 ? styles.reverse : ''} ${visibleSlides[idx] ? styles.visible : ''}`}
          >
            {/* 이미지 영역 */}
            <div className={styles.imageArea}>
              <div 
                className={styles.imageBg}
                style={{ backgroundColor: content.color }}
              />
              <div className={styles.imageWrapper}>
                <img src={content.image} alt={content.title} />
              </div>
              <span className={styles.number}>{String(idx + 1).padStart(2, '0')}</span>
            </div>

            {/* 텍스트 영역 */}
            <div className={styles.textArea}>
              <div className={styles.textContent}>
                <span 
                  className={styles.subtitle}
                  style={{ color: content.color }}
                >
                  {content.subtitle}
                </span>
                <h3 className={styles.title}>{content.title}</h3>
                <p className={styles.description}>{content.description}</p>
                <div 
                  className={styles.accentLine}
                  style={{ backgroundColor: content.color }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default GallerySection
