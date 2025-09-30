/**
 * 회원가입 폼 컴포넌트
 * 
 * 사용자가 이름, 이메일, 비밀번호를 입력하여 새 계정을 생성할 수 있는 폼을 제공합니다.
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// React와 필요한 훅들 import
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * SignupForm 컴포넌트의 Props 타입
 */
interface SignupFormProps {
  onSwitchToLogin: () => void; // 로그인 폼으로 전환하는 함수
}

/**
 * 회원가입 폼 컴포넌트
 * 
 * @param {SignupFormProps} props - 컴포넌트 props
 * @returns {JSX.Element} 회원가입 폼 UI
 */
const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  // 인증 컨텍스트에서 회원가입 함수 가져오기
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // UI 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * 입력 필드 값 변경 처리 함수
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - 입력 이벤트
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // 에러 메시지 초기화
    if (error) setError('');
  };

  /**
   * 폼 제출 처리 함수
   * 
   * @param {React.FormEvent} e - 폼 제출 이벤트
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 입력값 검증
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const success = await signup(formData.name, formData.email, formData.password);
      
      if (!success) {
        setError('이미 존재하는 이메일입니다.');
      } else {
        navigate('/app', { replace: true });
      }
    } catch (error) {
      setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      const ok = await loginWithGoogle();
      if (ok) {
        navigate('/app', { replace: true });
      } else {
        setError('구글 로그인에 실패했습니다.');
      }
    } catch (err) {
      setError('구글 로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">회원가입</h1>
          <p className="auth-subtitle">새로운 계정을 만들어보세요</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* 에러 메시지 표시 */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* 이름 입력 필드 */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="이름을 입력하세요"
              disabled={isLoading}
              required
            />
          </div>

          {/* 이메일 입력 필드 */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="이메일을 입력하세요"
              disabled={isLoading}
              required
            />
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              placeholder="비밀번호를 입력하세요 (최소 6자)"
              disabled={isLoading}
              required
            />
          </div>

          {/* 비밀번호 확인 입력 필드 */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-input"
              placeholder="비밀번호를 다시 입력하세요"
              disabled={isLoading}
              required
            />
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className="auth-button primary"
            disabled={isLoading}
          >
            {isLoading ? '회원가입 중...' : '회원가입'}
          </button>
          <button
            type="button"
            className="auth-button google"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            구글로 로그인
          </button>
        </form>

        {/* 로그인 링크 */}
        <div className="auth-footer">
          <p>
            이미 계정이 있으신가요?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="auth-link"
              disabled={isLoading}
            >
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
