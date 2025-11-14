import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import './ContactPage.css';

/**
 * 문의 사항 페이지 컴포넌트
 * 
 * 사용자가 문의사항을 제출할 수 있는 폼을 제공합니다.
 */
const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    category: 'general',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!formData.name.trim()) {
      showError('입력 오류', '이름을 입력해주세요.');
      return;
    }
    if (!formData.email.trim()) {
      showError('입력 오류', '이메일을 입력해주세요.');
      return;
    }
    if (!formData.subject.trim()) {
      showError('입력 오류', '제목을 입력해주세요.');
      return;
    }
    if (!formData.message.trim()) {
      showError('입력 오류', '문의 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: 실제 백엔드 API 연동
      // 현재는 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));

      showSuccess(
        '문의가 접수되었습니다',
        '문의사항이 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.'
      );

      // 폼 초기화
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        category: 'general',
        subject: '',
        message: ''
      });

      // 2초 후 홈으로 이동 (선택사항)
      setTimeout(() => {
        navigate('/app');
      }, 2000);
    } catch (error) {
      showError(
        '문의 접수 실패',
        '문의사항을 전송하는 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="contact-page">
      {/* 헤더 */}
      <div className="contact-header">
        <button onClick={handleGoBack} className="back-button">
          <span className="back-icon">←</span>
          뒤로 가기
        </button>
        <h1 className="contact-title">문의하기</h1>
        <p className="contact-subtitle">궁금한 점이나 문제가 있으시면 언제든지 문의해주세요</p>
      </div>

      {/* 문의 폼 */}
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          {/* 이름 */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              이름 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="이름을 입력해주세요"
              required
            />
          </div>

          {/* 이메일 */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              이메일 <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="이메일을 입력해주세요"
              required
            />
          </div>

          {/* 문의 유형 */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              문의 유형 <span className="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="general">일반 문의</option>
              <option value="bug">버그 신고</option>
              <option value="feature">기능 제안</option>
              <option value="account">계정 문의</option>
              <option value="payment">결제 문의</option>
              <option value="other">기타</option>
            </select>
          </div>

          {/* 제목 */}
          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              제목 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-input"
              placeholder="문의 제목을 입력해주세요"
              required
            />
          </div>

          {/* 문의 내용 */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              문의 내용 <span className="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-textarea"
              placeholder="문의 내용을 자세히 입력해주세요"
              rows={8}
              maxLength={1000}
              required
            />
            <div className="form-hint">
              최대 1000자까지 입력 가능합니다. ({formData.message.length}/1000)
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="form-actions">
            <button
              type="button"
              onClick={handleGoBack}
              className="cancel-button"
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? '전송 중...' : '문의하기'}
            </button>
          </div>
        </form>

        {/* 추가 안내 */}
        <div className="contact-info">
          <h3>문의 전 확인사항</h3>
          <ul>
            <li>자주 묻는 질문(FAQ)에서 먼저 확인해보세요.</li>
            <li>버그 신고 시 발생한 상황을 자세히 설명해주시면 빠른 해결에 도움이 됩니다.</li>
            <li>답변은 입력하신 이메일로 발송됩니다.</li>
            <li>평일 기준 1-2일 내에 답변드립니다.</li>
          </ul>
          <div className="info-actions">
            <button
              onClick={() => navigate('/qna')}
              className="info-link-button"
            >
              자주 묻는 질문 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

