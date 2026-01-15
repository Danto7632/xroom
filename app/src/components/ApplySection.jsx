import { useState } from 'react'
import styles from './ApplySection.module.css'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB - 이 이상이면 압축
const MAX_WIDTH = 1920 // 최대 너비
const MAX_HEIGHT = 1920 // 최대 높이
const COMPRESSION_QUALITY = 0.7 // 압축 품질 (0.7 = 70%)

// 이미지 압축 함수
const compressImage = (file) => {
  return new Promise((resolve) => {
    // 이미지가 아니거나 크기가 작으면 그대로 반환
    if (!file.type.startsWith('image/') || file.size <= MAX_FILE_SIZE) {
      resolve(file)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img

        // 비율 유지하며 리사이즈
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              })
              console.log(`압축: ${(file.size / 1024).toFixed(0)}KB → ${(compressedFile.size / 1024).toFixed(0)}KB`)
              resolve(compressedFile)
            } else {
              resolve(file)
            }
          },
          'image/jpeg',
          COMPRESSION_QUALITY
        )
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

const ApplySection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredDate: '',
    participants: '',
    eventRequest: ''
  })
  const [referenceImages, setReferenceImages] = useState([])
  const [eventMedias, setEventMedias] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [isCompressing, setIsCompressing] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleMultiFileChange = async (e, setter, currentFiles) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    
    setIsCompressing(true)
    
    // 모든 이미지 압축 처리
    const processedFiles = await Promise.all(
      files.map(async (file) => {
        const compressedFile = await compressImage(file)
        return {
          file: compressedFile,
          id: Date.now() + Math.random(),
          preview: compressedFile.type.startsWith('image/') 
            ? URL.createObjectURL(compressedFile) 
            : null,
          isVideo: compressedFile.type.startsWith('video/')
        }
      })
    )
    
    setter([...currentFiles, ...processedFiles])
    setIsCompressing(false)
  }

  const removeFile = (id, setter, currentFiles) => {
    const fileToRemove = currentFiles.find(f => f.id === id)
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview)
    }
    setter(currentFiles.filter(f => f.id !== id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const submitData = new FormData()
      submitData.append('예약자명', formData.name)
      submitData.append('전화번호', formData.phone)
      submitData.append('날짜', formData.preferredDate)
      submitData.append('인원', formData.participants)
      submitData.append('이벤트요구사항', formData.eventRequest)
      submitData.append('신청시간', new Date().toLocaleString('ko-KR'))
      
      referenceImages.forEach((item, idx) => {
        submitData.append(`참고이미지_${idx + 1}`, item.file)
      })
      
      eventMedias.forEach((item, idx) => {
        submitData.append(`이벤트미디어_${idx + 1}`, item.file)
      })

      const response = await fetch('https://hook.eu1.make.com/yepqorwl9l6psnjs82bv83qzirz56lks', {
        method: 'POST',
        body: submitData
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
        // Clean up previews
        referenceImages.forEach(item => {
          if (item.preview) URL.revokeObjectURL(item.preview)
        })
        eventMedias.forEach(item => {
          if (item.preview) URL.revokeObjectURL(item.preview)
        })
        setReferenceImages([])
        setEventMedias([])
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

            {/* 참고 이미지 - 여러개 업로드 */}
            <div className={styles.formGroup + ' ' + styles.fullWidth}>
              <label className={styles.label}>참고 이미지 (여러 장 선택 가능, 자동 압축)</label>
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleMultiFileChange(e, setReferenceImages, referenceImages)}
                  className={styles.fileInput}
                  id="referenceImages"
                  disabled={isCompressing}
                />
                <label htmlFor="referenceImages" className={styles.fileLabel}>
                  {isCompressing ? '압축 중...' : '+ 이미지 추가하기'}
                </label>
              </div>
              {/* 미리보기 */}
              {referenceImages.length > 0 && (
                <div className={styles.previewGrid}>
                  {referenceImages.map((item) => (
                    <div key={item.id} className={styles.previewItem}>
                      <img src={item.preview} alt="미리보기" />
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removeFile(item.id, setReferenceImages, referenceImages)}
                      >
                        ✕
                      </button>
                      <span className={styles.fileName}>{item.file.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 이벤트 사용 사진/동영상 - 여러개 업로드 */}
            <div className={styles.formGroup + ' ' + styles.fullWidth}>
              <label className={styles.label}>이벤트 사용 사진/동영상 (여러 개 선택 가능, 이미지 자동 압축)</label>
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={(e) => handleMultiFileChange(e, setEventMedias, eventMedias)}
                  className={styles.fileInput}
                  id="eventMedias"
                  disabled={isCompressing}
                />
                <label htmlFor="eventMedias" className={styles.fileLabel}>
                  {isCompressing ? '압축 중...' : '+ 사진/동영상 추가하기'}
                </label>
              </div>
              {/* 미리보기 */}
              {eventMedias.length > 0 && (
                <div className={styles.previewGrid}>
                  {eventMedias.map((item) => (
                    <div key={item.id} className={styles.previewItem}>
                      {item.isVideo ? (
                        <div className={styles.videoPreview}>
                          <span className={styles.videoIcon}>🎬</span>
                        </div>
                      ) : (
                        <img src={item.preview} alt="미리보기" />
                      )}
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removeFile(item.id, setEventMedias, eventMedias)}
                      >
                        ✕
                      </button>
                      <span className={styles.fileName}>{item.file.name}</span>
                    </div>
                  ))}
                </div>
              )}
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
