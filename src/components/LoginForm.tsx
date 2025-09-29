/**
 * 로그인 폼 컴포넌트
 * 
 * 사용자가 이메일과 비밀번호를 입력하여 로그인할 수 있는 폼을 제공합니다.
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// React와 필요한 훅들 import
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * LoginForm 컴포넌트의 Props 타입
 */
interface LoginFormProps {
  onSwitchToSignup: () => void; // 회원가입 폼으로 전환하는 함수
}

/**
 * 로그인 폼 컴포넌트
 * 
 * @param {LoginFormProps} props - 컴포넌트 props
 * @returns {JSX.Element} 로그인 폼 UI
 */
const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {
  // 인증 컨텍스트에서 로그인 함수 가져오기
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    if (!formData.email || !formData.password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (!success) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        navigate('/app', { replace: true });
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
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
          <h1 className="auth-title">로그인</h1>
          <p className="auth-subtitle">습관 추적기에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* 에러 메시지 표시 */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

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
              placeholder="비밀번호를 입력하세요"
              disabled={isLoading}
              required
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="auth-button primary"
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
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


        {/* 회원가입 링크 */}
        <div className="auth-footer">
          <p>
            계정이 없으신가요?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="auth-link"
              disabled={isLoading}
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
