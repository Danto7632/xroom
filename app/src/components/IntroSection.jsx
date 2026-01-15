import { useScrollAnimation, useStaggerAnimation } from '../hooks/useAnimations'
import styles from './IntroSection.module.css'

const IntroSection = () => {
  const features = [
    {
      icon: '🎬',
      title: '시네마틱 브이로그',
      desc: '전담 가이드가 1인 VJ가 되어 촬영부터 편집까지. 자녀는 카메라 부담 없이 부모님과의 시간에만 집중할 수 있습니다.'
    },
    {
      icon: '⏰',
      title: '타임슬립 서사',
      desc: '복고풍 의상, LP 음악, 추억의 군것질. 부모님을 \'청춘 남녀 철수와 영희\'로 되돌리는 1980년대 시간 여행.'
    },
    {
      icon: '💕',
      title: '관계 회복',
      desc: '여행의 끝, 프라이빗 X-룸에서 펼쳐지는 서프라이즈 전시회와 고백 타임. 무뚝뚝한 부부를 다시 다정한 연인으로.'
    }
  ]

  const [headerRef, headerVisible] = useScrollAnimation(0.3)
  const [featuresRef, visibleItems] = useStaggerAnimation(features.length, 150)

  return (
    <section id="intro" className={styles.intro}>
      <div className={styles.container}>
        <div 
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.fadeInUp : styles.hidden}`}
        >
          <span className={styles.tag}>단순 효도를 넘어서</span>
          <h2 className={styles.title}>왜 X-룸인가요?</h2>
          <p className={styles.subtitle}>
            이 프로그램의 최종 목적지는 관광지가 아닌<br />
            <strong>'관계의 재발견'</strong>입니다.
          </p>
        </div>

        <div ref={featuresRef} className={styles.features}>
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`${styles.featureCard} ${visibleItems.includes(idx) ? styles.fadeInUp : styles.hidden}`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <span className={styles.icon}>{feature.icon}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntroSection
