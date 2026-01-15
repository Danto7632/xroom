import { useState } from 'react'
import styles from './ApplySection.module.css'

const ApplySection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredDate: '',
    participants: '',
    eventRequest: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // JSON으로 텍스트 데이터만 전송
      const response = await fetch('https://hook.eu1.make.com/yepqorwl9l6psnjs82bv83qzirz56lks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          예약자명: formData.name,
          전화번호: formData.phone,
          날짜: formData.preferredDate,
          인원: formData.participants,
          이벤트요구사항: formData.eventRequest,
          신청시간: new Date().toLocaleString('ko-KR')
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          phone: '',
          preferredDate: '',
          participants: '',
          eventRequest: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
    }

    setIsSubmitting(false)
  }

  return (
    <section id="apply" className={styles.apply}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>Program Application</span>
          <h2 className={styles.title}>체험 신청하기</h2>
          <p className={styles.subtitle}>
            아래 양식을 작성해 주시면 담당자가 연락 드리겠습니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            {/* 예약자명 */}
            <div className={styles.formGroup}>
              <label className={styles.label}>예약자명 *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="홍길동"
                className={styles.input}
              />
            </div>

            {/* 전화번호 */}
            <div className={styles.formGroup}>
              <label className={styles.label}>전화번호 *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="010-1234-5678"
                className={styles.input}
              />
            </div>

            {/* 날짜 */}
            <div className={styles.formGroup}>
              <label className={styles.label}>날짜 *</label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            {/* 인원 */}
            <div className={styles.formGroup}>
              <label className={styles.label}>인원 *</label>
              <input
                type="number"
                name="participants"
                value={formData.participants}
                onChange={handleChange}
                required
                min="1"
                placeholder="2"
                className={styles.input}
              />
            </div>

            {/* 이벤트 요구사항 */}
            <div className={styles.formGroup + ' ' + styles.fullWidth}>
              <label className={styles.label}>이벤트 요구사항</label>
              <textarea
                name="eventRequest"
                value={formData.eventRequest}
                onChange={handleChange}
                rows="4"
                placeholder="원하시는 체험 내용이나 특별 요청 사항을 적어주세요..."
                className={styles.textarea}
              />
            </div>

            {/* 제출 버튼 */}
            <div className={styles.formGroup + ' ' + styles.fullWidth}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.submitBtn} ${isSubmitting ? styles.disabled : ''}`}
              >
                {isSubmitting ? '신청 중...' : '체험 신청하기'}
              </button>
            </div>

            {/* 상태 메시지 */}
            {submitStatus === 'success' && (
              <div className={styles.formGroup + ' ' + styles.fullWidth}>
                <div className={styles.successMessage}>
                  신청이 완료되었습니다! 빠른 시일 내에 연락 드리겠습니다.
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={styles.formGroup + ' ' + styles.fullWidth}>
                <div className={styles.errorMessage}>
                  신청 중 오류가 발생했습니다. 다시 시도해 주세요.
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

export default ApplySection
