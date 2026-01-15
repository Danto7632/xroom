import { useScrollAnimation, useStaggerAnimation } from '../hooks/useAnimations'
import styles from './XRoomSection.module.css'

const XRoomSection = () => {
  const zones = [
    {
      zone: '🖼️',
      title: '사진 전시',
      desc: '부모님의 과거 사진과 오늘 여행 사진이 함께 전시됩니다.'
    },
    {
      zone: '🎬',
      title: '브이로그 상영',
      desc: '오늘 하루를 담은 시네마틱 영상을 함께 감상합니다.'
    },
    {
      zone: '💌',
      title: '편지 낭독',
      desc: '자녀가 준비한 편지를 읽는 감동의 시간.'
    },
    {
      zone: '🎂',
      title: '서프라이즈 파티',
      desc: '케이크와 함께하는 가족만의 특별한 축하.'
    }
  ]

  const [headerRef, headerVisible] = useScrollAnimation(0.3)
  const [zonesRef, visibleItems] = useStaggerAnimation(zones.length, 120)

  return (
    <section id="program" className={styles.xroom}>
      <div className={styles.container}>
        <div 
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.fadeInUp : styles.hidden}`}
        >
          <span className={styles.tag}>감동의 정점</span>
          <h2 className={styles.title}>
            프라이빗 X-룸<br />
            <span className={styles.highlight}>우리 가족만의 전시회</span>
          </h2>
          <p className={styles.subtitle}>
            감천문화마을의 아름다운 뷰를 품은 공간을 대관하여<br />
            오직 한 가족만을 위한 서프라이즈 이벤트를 엽니다.
          </p>
        </div>

        <div ref={zonesRef} className={styles.zones}>
          {zones.map((zone, idx) => (
            <div 
              key={idx} 
              className={`${styles.zoneCard} ${visibleItems.includes(idx) ? styles.scaleIn : styles.hidden}`}
            >
              <div className={styles.zoneLetter}>{zone.zone}</div>
              <h3 className={styles.zoneTitle}>{zone.title}</h3>
              <p className={styles.zoneDesc}>{zone.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default XRoomSection
