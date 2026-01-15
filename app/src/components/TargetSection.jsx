import { useScrollAnimation } from '../hooks/useAnimations'
import styles from './TargetSection.module.css'

const TargetSection = () => {
  const primaryFeatures = [
    '부모님께 특별한 효도 여행을 선물하고 싶은 자녀',
    '촬영 부담 없이 여행에만 집중하고 싶은 분',
    '무뚝뚝한 부모님의 관계 회복을 바라는 분',
    '부모님의 청춘 시절 이야기가 궁금한 분',
    '고퀄리티 가족 영상을 남기고 싶은 분'
  ]

  const secondaryFeatures = [
    '결혼기념일, 환갑 등 특별한 날을 맞이한 부부',
    '오랜만에 단둘이 데이트하고 싶은 부모님',
    '자녀에게 청춘 시절 이야기를 들려주고 싶은 분',
    '1980년대 추억을 되살리고 싶은 5060세대'
  ]

  const [headerRef, headerVisible] = useScrollAnimation(0.3)
  const [card1Ref, card1Visible] = useScrollAnimation(0.2)
  const [card2Ref, card2Visible] = useScrollAnimation(0.2)

  return (
    <section className={styles.target}>
      <div className={styles.container}>
        <div 
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.fadeInUp : styles.hidden}`}
        >
          <h2 className={styles.title}>이런 분들을 위한 프로그램입니다</h2>
        </div>

        <div className={styles.cards}>
          {/* 자녀 */}
          <div 
            ref={card1Ref}
            className={`${styles.card} ${card1Visible ? styles.slideInLeft : styles.hiddenLeft}`}
          >
            <span className={styles.cardTag + ' ' + styles.domestic}>
              👨‍👩‍👧 자녀분들께
            </span>
            <h3 className={styles.cardTitle}>
              부모님을 TV 속 주인공으로<br />만들어 드리고 싶은 분
            </h3>
            <ul className={styles.featureList}>
              {primaryFeatures.map((item, idx) => (
                <li key={idx} className={styles.featureItem}>
                  <span className={styles.bullet + ' ' + styles.orange}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 부모님 */}
          <div 
            ref={card2Ref}
            className={`${styles.card} ${card2Visible ? styles.slideInRight : styles.hiddenRight}`}
          >
            <span className={styles.cardTag + ' ' + styles.global}>
              💑 부모님께
            </span>
            <h3 className={styles.cardTitle}>
              청춘 시절로 돌아가<br />다시 연인이 되고 싶은 분
            </h3>
            <ul className={styles.featureList}>
              {secondaryFeatures.map((item, idx) => (
                <li key={idx} className={styles.featureItem}>
                  <span className={styles.bullet + ' ' + styles.maroon}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TargetSection
