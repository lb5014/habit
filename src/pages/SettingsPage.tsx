import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  const [activeTab, setActiveTab] = useState<'account' | 'display' | 'notifications' | 'about'>('account');

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

      {/* 탭 네비게이션 및 탭 컨텐츠 */}
      <div className="settings-content">
        <div className="settings-tabs">
          <button className={`tab ${activeTab === 'account' ? 'active' : ''}`} onClick={() => setActiveTab('account')}>계정</button>
          <button className={`tab ${activeTab === 'display' ? 'active' : ''}`} onClick={() => setActiveTab('display')}>화면</button>
          <button className={`tab ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>알림</button>
          <button className={`tab ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>정보</button>
        </div>

        <div className="settings-section">
          {activeTab === 'account' && (
            <div className="section-content">
              <div className="user-info-card">
                <div className="user-avatar-large">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <h3 className="user-name">{user?.name}</h3>
                  <p className="user-email">{user?.email}</p>
                </div>
              </div>

              <div className="settings-rows">
                {isEmailPasswordUser && (
                  <div className="settings-row">
                    <div className="row-left">
                      <h3 className="setting-label">비밀번호 변경</h3>
                      <p className="setting-description">계정 비밀번호를 변경합니다</p>
                    </div>
                    <div className="row-right">
                      <button onClick={handlePasswordChange} className="action-button secondary">변경</button>
                    </div>
                  </div>
                )}

                <div className="settings-row">
                  <div className="row-left">
                    <h3 className="setting-label">로그아웃</h3>
                    <p className="setting-description">현재 기기에서 로그아웃합니다</p>
                  </div>
                  <div className="row-right">
                    <button onClick={handleLogout} className="action-button secondary">로그아웃</button>
                  </div>
                </div>

                <div className="settings-row">
                  <div className="row-left">
                    <h3 className="setting-label">회원 탈퇴</h3>
                    <p className="setting-description">모든 데이터를 삭제하고 계정을 탈퇴합니다</p>
                  </div>
                  <div className="row-right">
                    <button onClick={handleDeleteAccount} className="action-button danger">탈퇴</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'display' && (
            <div className="section-content">
              <div className="settings-rows">
                <div className="settings-row">
                  <div className="row-left">
                    <h3 className="setting-label">테마</h3>
                    <p className="setting-description">앱의 테마 모드를 설정합니다</p>
                  </div>
                  <div className="row-right">
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
                        시스템
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="section-content">
              <div className="settings-rows">
                <div className="settings-row">
                  <div className="row-left">
                    <h3 className="setting-label">알림 활성화</h3>
                    <p className="setting-description">습관 알림을 받을지 설정합니다</p>
                  </div>
                  <div className="row-right">
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
          )}

          {activeTab === 'about' && (
            <div className="section-content">
              <div className="settings-rows">
                <div className="settings-row">
                  <div className="row-left">
                    <h3 className="setting-label">앱 버전</h3>
                    <p className="setting-description">현재 설치된 앱의 버전</p>
                  </div>
                  <div className="row-right">
                    <span className="info-value">Version 2.2.0</span>
                  </div>
                </div>

                <div className="settings-row">
                  <div className="row-left">
                    <h3 className="setting-label">빌드 번호</h3>
                    <p className="setting-description">현재 빌드의 식별 값</p>
                  </div>
                  <div className="row-right">
                    <span className="info-value">2024.01.15</span>
                  </div>
                </div>

                <div className="settings-row">
                  <div className="row-left">
                    <h3 className="setting-label">정책</h3>
                    <p className="setting-description">이용약관과 개인정보처리방침</p>
                  </div>
                  <div className="row-right">
                    <div className="policy-links">
                      <a href="#" className="policy-link">이용약관</a>
                      <a href="#" className="policy-link">개인정보처리방침</a>
                    </div>
                  </div>
                </div>

                <div className="settings-row">
                  <div className="row-left">
                    <h3 className="setting-label">자주 묻는 질문</h3>
                    <p className="setting-description">FAQ를 확인하세요</p>
                  </div>
                  <div className="row-right">
                    <Link to="/qna" className="action-button secondary">보기</Link>
                  </div>
                </div>

                <div className="settings-row">
                  <div className="row-left">
                    <h3 className="setting-label">문의하기</h3>
                    <p className="setting-description">문의사항이 있으시면 연락주세요</p>
                  </div>
                  <div className="row-right">
                    <Link to="/contact" className="action-button secondary">문의</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
