/**
 * 인증 페이지 컴포넌트
 * 
 * 로그인과 회원가입 폼을 전환할 수 있는 페이지입니다.
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// React와 필요한 컴포넌트들 import
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

/**
 * AuthPage 컴포넌트의 Props 타입
 */
interface AuthPageProps {
  onClose?: () => void; // 모달 닫기 함수 (선택적)
}

/**
 * 인증 페이지 컴포넌트
 * 
 * @param {AuthPageProps} props - 컴포넌트 props
 * @returns {JSX.Element} 인증 페이지 UI
 */
const AuthPage: React.FC<AuthPageProps> = ({ onClose }) => {
  // 인증 컨텍스트에서 인증 상태 가져오기
  const { isAuthenticated } = useAuth();
  
  // 현재 표시할 폼 상태 관리 (true: 로그인, false: 회원가입)
  const [isLogin, setIsLogin] = useState(true);

  /**
   * 로그인 성공 시 모달 닫기
   */
  useEffect(() => {
    if (isAuthenticated && onClose) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  /**
   * 로그인 폼으로 전환하는 함수
   */
  const switchToLogin = () => {
    setIsLogin(true);
  };

  /**
   * 회원가입 폼으로 전환하는 함수
   */
  const switchToSignup = () => {
    setIsLogin(false);
  };

  return (
    <div className="auth-page">
      {/* 로그인 폼 또는 회원가입 폼 렌더링 */}
      {isLogin ? (
        <LoginForm onSwitchToSignup={switchToSignup} />
      ) : (
        <SignupForm onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default AuthPage;
