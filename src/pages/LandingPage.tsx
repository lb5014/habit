/**
 * Building Habit 랜딩 페이지 컴포넌트 - 모던 디자인
 * 
 * 깔끔하고 모던한 디자인으로 서비스 소개 및 사용자 유도를 위한 랜딩 페이지입니다.
 * Hero 섹션, 문제 제기, 솔루션, 기능 소개, CTA, 푸터로 구성됩니다.
 * 
 * @author Building Habit 개발팀
 * @version 2.0.0
 */

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './LandingPage.css';

/**
 * 랜딩 페이지 메인 컴포넌트
 * 
 * @returns {JSX.Element} 랜딩 페이지 UI
 */
const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // 로그인 버튼 클릭 핸들러
  const handleLogin = () => {
    window.location.href = '#login';
  };

  // 시작하기 버튼 클릭 핸들러
  const handleGetStarted = () => {
    if (isAuthenticated) {
      window.location.href = '/app';
    } else {
      handleLogin();
    }
  };

  return (
    <div className="landing-page">
      {/* Hero 섹션 */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Building Habi<span className="hammer-icon">🔨</span>
            </h1>
            <p className="hero-subtitle">
              작은 습관이 큰 변화를 만든다
            </p>
            <p className="hero-description">
              매일 습관을 기록하고, 달성과정을 시각화로 확인하세요.
              <br />
              꾸준한 습관 형성의 첫걸음을 함께 시작해보세요.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary btn-large"
                onClick={handleGetStarted}
              >
                무료로 시작하기
              </button>
              <button 
                className="btn btn-secondary btn-large"
                onClick={handleLogin}
              >
                로그인
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-mockup">
              <div className="mockup-screen">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="mockup-content">
                  <div className="mockup-habit-card">
                    <div className="habit-title">매일 운동하기</div>
                    <div className="habit-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{width: '75%'}}></div>
                      </div>
                      <span>75%</span>
                    </div>
                  </div>
                  <div className="mockup-calendar">
                    <div className="calendar-grid">
                      {[...Array(30)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`calendar-day ${i % 4 === 0 ? 'completed' : ''}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 문제 제기 & 공감 섹션 */}
      <section className="problem-section">
        <div className="container">
          <div className="section-content">
            <h2 className="section-title">
              습관은 시작보다 유지가 어렵습니다
            </h2>
            <p className="section-subtitle">
              많은 사람들이 겪는 습관 형성의 어려움을 Building Habit이 해결해드립니다
            </p>
            <div className="problem-grid">
              <div className="problem-item">
                <div className="problem-icon">🎯</div>
                <h3>목표를 잊는다</h3>
                <p>시작할 때의 의욕이 시간이 지나면서 희미해지고, 왜 시작했는지 기억나지 않습니다.</p>
              </div>
              <div className="problem-item">
                <div className="problem-icon">📊</div>
                <h3>진전을 확인하기 어렵다</h3>
                <p>성취 과정을 눈으로 확인하기 어려워 동기부여가 떨어지고 포기하게 됩니다.</p>
              </div>
              <div className="problem-item">
                <div className="problem-icon">👥</div>
                <h3>혼자 꾸준히 하기 힘들다</h3>
                <p>외로운 여정 속에서 지속하기 어려운 상황에서 혼자만의 힘으로는 한계가 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 솔루션 섹션 */}
      <section className="solution-section">
        <div className="container">
          <div className="section-content">
            <h2 className="section-title">
              Building Habit이 제공하는 핵심 가치
            </h2>
            <p className="section-subtitle">
              과학적 접근과 직관적인 디자인으로 습관 형성을 도와드립니다
            </p>
            <div className="solution-grid">
              <div className="solution-item">
                <div className="solution-icon">✅</div>
                <h3>쉽게 기록</h3>
                <p>하루 한 번 체크로 간단하게 습관을 기록하고 관리할 수 있습니다.</p>
              </div>
              <div className="solution-item">
                <div className="solution-icon">📈</div>
                <h3>직관적인 시각화</h3>
                <p>캘린더와 그래프로 진행 상황을 한눈에 파악하고 성취감을 느낄 수 있습니다.</p>
              </div>
              <div className="solution-item">
                <div className="solution-icon">💪</div>
                <h3>지속적인 동기부여</h3>
                <p>성취율 통계와 트렌드 분석으로 지속적인 동기부여를 받을 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="features-section">
        <div className="container">
          <div className="section-content">
            <h2 className="section-title">핵심 기능</h2>
            <p className="section-subtitle">
              Building Habit의 모든 기능을 체험해보세요
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📝</div>
                <h3>습관 등록</h3>
                <p>원하는 습관을 쉽게 등록하고 목표와 빈도를 설정할 수 있습니다.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">✅</div>
                <h3>매일 체크</h3>
                <p>간단한 클릭으로 매일의 습관 완료를 기록하고 성취감을 느낄 수 있습니다.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📅</div>
                <h3>캘린더 시각화</h3>
                <p>달력 형태로 습관 달성 현황을 시각적으로 확인하고 패턴을 분석합니다.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>통계 확인</h3>
                <p>차트와 그래프로 습관 달성률과 트렌드를 분석하여 개선점을 찾습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 사용자 가치 섹션 */}
      <section className="value-section">
        <div className="container">
          <div className="section-content">
            <div className="value-content">
              <h2 className="value-title">
                꾸준히 실천하는 습관은 삶을 바꿉니다
              </h2>
              <p className="value-subtitle">
                Building Habit은 그 과정을 함께합니다
              </p>
              <div className="value-stats">
                <div className="stat-item">
                  <div className="stat-number">21</div>
                  <div className="stat-label">일</div>
                  <div className="stat-description">습관 형성 기간</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">90%</div>
                  <div className="stat-label">성공률</div>
                  <div className="stat-description">꾸준히 기록하는 사용자</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">명</div>
                  <div className="stat-description">활성 사용자</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">지금 시작하세요</h2>
            <p className="cta-subtitle">
              작은 습관이 큰 변화를 만드는 여정에 함께하세요.
              <br />
              무료로 시작하고 당신의 새로운 습관을 만들어보세요.
            </p>
            <div className="cta-buttons">
              <button 
                className="btn btn-accent btn-large"
                onClick={handleGetStarted}
              >
                무료로 시작하기
              </button>
              <button 
                className="btn btn-secondary btn-large"
                onClick={handleLogin}
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Building Habi<span className="hammer-icon">🔨</span></h3>
              <p>작은 습관이 큰 변화를 만든다. 매일의 작은 실천이 당신의 삶을 바꿉니다.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>서비스</h4>
                <ul>
                  <li><a href="#features">기능 소개</a></li>
                  <li><a href="#pricing">요금제</a></li>
                  <li><a href="#support">고객 지원</a></li>
                  <li><a href="#faq">자주 묻는 질문</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>회사</h4>
                <ul>
                  <li><a href="#about">회사 소개</a></li>
                  <li><a href="#contact">문의하기</a></li>
                  <li><a href="#privacy">개인정보처리방침</a></li>
                  <li><a href="#terms">이용약관</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>소셜</h4>
                <ul>
                  <li><a href="#twitter">Twitter</a></li>
                  <li><a href="#facebook">Facebook</a></li>
                  <li><a href="#instagram">Instagram</a></li>
                  <li><a href="#blog">블로그</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Building Habit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;