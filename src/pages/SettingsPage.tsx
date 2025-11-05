import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './SettingsPage.css';

/**
 * 설정 페이지 컴포넌트
 * 
 * 사용자 계정, 화면 테마, 알림, 앱 정보 등의 설정을 관리합니다.
 * 로그인한 사용자만 접근할 수 있는 보호된 페이지입니다.
 */
const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // 이메일/비밀번호 가입 사용자 여부 (Firebase providerId === 'password')
  const isEmailPasswordUser = user?.providerData?.[0]?.providerId === 'password';

  // 뒤로 가기 핸들러
  const handleGoBack = () => {
    navigate('/app');
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // 테마 변경 핸들러
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  // 비밀번호 변경 핸들러 (UI만)
  const handlePasswordChange = () => {
    alert('비밀번호 변경 기능은 준비 중입니다.');
  };

  // 회원 탈퇴 핸들러 (UI만)
  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      '정말로 회원 탈퇴를 하시겠습니까?\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.'
    );
    if (confirmed) {
      alert('회원 탈퇴 기능은 준비 중입니다.');
    }
  };

  return (
    <div className="settings-page">
      {/* 헤더 */}
      <div className="settings-header">
        <button onClick={handleGoBack} className="back-button">
          <span className="back-icon">←</span>
          뒤로 가기
        </button>
        <h1 className="settings-title">설정</h1>
      </div>

      {/* 설정 섹션들 */}
      <div className="settings-content">
        {/* 계정 섹션 */}
        <div className="settings-section">
          <div className="section-header">
            <h2 className="section-title">계정</h2>
            <p className="section-description">계정 정보 및 보안 설정</p>
          </div>
          <div className="section-content">
            {/* 사용자 정보 */}
            <div className="user-info-card">
              <div className="user-avatar-large">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <h3 className="user-name">{user?.name}</h3>
                <p className="user-email">{user?.email}</p>
              </div>
            </div>

            {/* 계정 액션 버튼들 */}
            <div className="account-actions">
              {isEmailPasswordUser && (
                <button 
                  onClick={handlePasswordChange}
                  className="action-button secondary"
                >
                  비밀번호 변경
                </button>
              )}
              <button 
                onClick={handleLogout}
                className="action-button secondary"
              >
                로그아웃
              </button>
              <button 
                onClick={handleDeleteAccount}
                className="action-button danger"
              >
                회원 탈퇴
              </button>
            </div>
          </div>
        </div>

        {/* 화면 섹션 */}
        <div className="settings-section">
          <div className="section-header">
            <h2 className="section-title">화면</h2>
            <p className="section-description">테마 및 화면 설정</p>
          </div>
          <div className="section-content">
            <div className="theme-settings">
              <h3 className="setting-label">테마</h3>
              <div className="theme-options">
                <button 
                  onClick={() => handleThemeChange('light')}
                  className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                >
                  <span className="theme-icon">☀️</span>
                  라이트
                </button>
                <button 
                  onClick={() => handleThemeChange('dark')}
                  className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                >
                  <span className="theme-icon">🌙</span>
                  다크
                </button>
                <button 
                  onClick={() => handleThemeChange('system')}
                  className={`theme-option ${theme === 'system' ? 'active' : ''}`}
                >
                  <span className="theme-icon">⚙️</span>
                  시스템 설정
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 알림 섹션 */}
        <div className="settings-section">
          <div className="section-header">
            <h2 className="section-title">알림</h2>
            <p className="section-description">알림 설정 관리</p>
          </div>
          <div className="section-content">
            <div className="notification-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-label">알림 활성화</h3>
                  <p className="setting-description">습관 알림을 받을지 설정합니다</p>
                </div>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  />
                  <label htmlFor="notifications" className="toggle-label"></label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 정보 섹션 */}
        <div className="settings-section">
          <div className="section-header">
            <h2 className="section-title">정보</h2>
            <p className="section-description">앱 정보 및 정책</p>
          </div>
          <div className="section-content">
            <div className="app-info">
              <div className="info-item">
                <span className="info-label">앱 버전</span>
                <span className="info-value">Version 2.2.0</span>
              </div>
              <div className="info-item">
                <span className="info-label">빌드 번호</span>
                <span className="info-value">2024.01.15</span>
              </div>
            </div>
            
            <div className="policy-links">
              <a href="#" className="policy-link">
                이용약관
              </a>
              <a href="#" className="policy-link">
                개인정보처리방침
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
