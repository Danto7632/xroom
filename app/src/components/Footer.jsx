import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h3 className={styles.title}>응답하라 청춘</h3>
        <p className={styles.subtitle}>감천 'X-룸(Ex-Room)' 프로젝트</p>
        
        <div className={styles.info}>
          <span>부산 감천문화마을</span>
          <span>문의: 체험 신청 양식 이용</span>
        </div>
        
        <div className={styles.copyright}>
          © 2026 응답하라 청춘 : 감천 X-룸 프로젝트. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
