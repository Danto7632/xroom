import { useScrollAnimation, useStaggerAnimation } from '../hooks/useAnimations'
import styles from './ExperienceSection.module.css'

const ExperienceSection = () => {
  const experiences = [
    {
      location: '남포동 · 국제시장',
      theme: '타임슬립',
      title: '1980년대로의 시간 여행',
      desc: '복고풍 의상으로 변신! 부모님은 \'청춘 남녀 철수와 영희\'가 되어 30년 전 데이트 코스를 그대로 재연합니다. 전담 VJ 가이드가 모든 순간을 촬영합니다.',
      color: '#E07B39',
      num: '01'
    },
    {
      location: 'LP 다방',
      theme: '추억 소환',
      title: 'DJ의 사연 소개 & 신청곡',
      desc: '쌍화커피와 함께 LP 음악을 들으며 부모님의 청춘 사연을 DJ에게 전달합니다. 추억의 군것질과 함께 잊고 지낸 설렘을 소환합니다.',
      color: '#5D2E46',
      num: '02'
    },
    {
      location: '송도 케이블카',
      theme: '오붓한 시간',
      title: '둘만의 하늘 위 데이트',
      desc: '케이블카에서의 프라이빗한 시간. 자녀는 잠시 자리를 비우고, 부모님만의 오붓한 대화 시간을 선물합니다. 다정한 연인으로 돌아가는 순간.',
      color: '#3A7CA5',
      num: '03'
    },
    {
      location: '감천 X-룸',
      theme: '감동의 피날레',
      title: '우리 가족만의 서프라이즈 전시회',
      desc: '감천문화마을 뷰를 품은 프라이빗 공간. 자녀가 준비한 편지, 여행 사진 전시, 시네마틱 브이로그 상영, 고백 타임까지. 여행의 만족도를 최상으로!',
      color: '#C9A959',
      num: '04'
    }
  ]

  const [headerRef, headerVisible] = useScrollAnimation(0.3)
  const [timelineRef, visibleItems] = useStaggerAnimation(experiences.length, 200)

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <div 
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.fadeInUp : styles.hidden}`}
        >
          <span className={styles.tag}>여행 코스</span>
          <h2 className={styles.title}>타임슬립 서사</h2>
        </div>

        <div ref={timelineRef} className={styles.timeline}>
          {experiences.map((exp, idx) => (
            <div 
              key={idx} 
              className={`${styles.timelineItem} ${visibleItems.includes(idx) ? styles.slideInLeft : styles.hidden}`}
            >
              {/* 타임라인 라인 */}
              <div className={styles.timelineLine}>
                <div 
                  className={`${styles.timelineDot} ${visibleItems.includes(idx) ? styles.popIn : ''}`}
                  style={{ backgroundColor: exp.color, boxShadow: `0 5px 20px ${exp.color}40` }}
                >
                  {exp.num}
                </div>
                {idx < experiences.length - 1 && (
                  <div 
                    className={`${styles.connector} ${visibleItems.includes(idx) ? styles.growDown : ''}`}
                    style={{ 
                      background: `linear-gradient(180deg, ${exp.color} 0%, ${experiences[idx + 1].color} 100%)` 
                    }}
                  />
                )}
              </div>

              {/* 컨텐츠 */}
              <div className={styles.content}>
                <div className={styles.tags}>
                  <span 
                    className={styles.locationTag}
                    style={{ backgroundColor: `${exp.color}15`, color: exp.color }}
                  >
                    {exp.location}
                  </span>
                  <span className={styles.themeTag}>{exp.theme}</span>
                </div>
                <h3 className={styles.itemTitle}>{exp.title}</h3>
                <p className={styles.itemDesc}>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
