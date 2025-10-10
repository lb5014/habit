import React, { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import CalendarView from "./components/CalendarView";
import ThemeToggle from "./components/ThemeToggle";
import ProtectedRoute from './routes/ProtectedRoute';
import { useHabits } from "./hooks/useHabits";
import "./App.css";

/**
 * 메인 앱 컨텐츠 컴포넌트 (인증된 사용자용)
 */
const AppContent = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { habits, addHabit, toggleToday, deleteHabit, editHabit } = useHabits();
  const [showCalendar, setShowCalendar] = useState(false);

  const getOverallProgress = () => {
    if (habits.length === 0) return 0;
    const totalHabits = habits.length;
    let completedCount = 0;
    const today = new Date().toISOString().split("T")[0];

    habits.forEach(habit => {
        if (habit.completedDates?.includes(today)) {
            completedCount++;
        }
    });

    return Math.round((completedCount / totalHabits) * 100);
  };

  return (
    <div className="habit-tracker">
      {/* 상단 컨트롤 버튼들 */}
      <div className="top-controls">
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
        <div className="progress-tagbar">
          <div className="progress-info">
            <span className="progress-icon">📊</span>
            <span className="progress-text">달성률</span>
          </div>
          <div className="progress-chart-tooltip">
            <div className="circular-progress">
              <svg className="progress-ring" width="120" height="120">
                <circle className="progress-ring-circle-bg" stroke="#e2e8f0" strokeWidth="8" fill="transparent" r="52" cx="60" cy="60" />
                <circle
                  className="progress-ring-circle"
                  stroke="#4364DE"
                  strokeWidth="8"
                  fill="transparent"
                  r="52"
                  cx="60"
                  cy="60"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 52}`,
                    strokeDashoffset: `${2 * Math.PI * 52 * (1 - getOverallProgress() / 100)}`
                  }}
                />
              </svg>
              <div className="progress-center">
                <span className="progress-value">{getOverallProgress()}%</span>
                <span className="progress-label">오늘 달성</span>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-tagbar">
           <div className="chart-info">
            <span className="chart-icon">📈</span>
            <span className="chart-text">차트</span>
          </div>
          <div className="chart-tooltip">
            {/* ... 차트 내용 ... */}
          </div>
        </div>
      </div>

      {/* 앱 헤더 섹션 (로고, 사용자 정보) */}
      <div className="habit-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="habit-title">
              Building Habi<span className="hammer-icon">🔨</span>
            </h1>
            <p className="habit-subtitle">매일의 작은 습관이 큰 변화를 만듭니다</p>
          </div>
          <div className="header-actions">
            {isAuthenticated && user ? (
              <div className="user-info-compact">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <h3>{user.name}님</h3>
                  <p>{user.email}</p>
                </div>
                <button onClick={logout} className="logout-button">
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="guest-info">
                 <button onClick={() => navigate('/login')} className="auth-button primary">
                  로그인
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 습관 추가 폼 카드 */}
      <div className="habit-card">
        <HabitForm addHabit={addHabit} />
      </div>

      {/* 습관 목록 카드 */}
      {/* [수정됨] habit-list-card 클래스를 추가하여 다른 카드와 구분합니다. */}
      <div className="habit-card habit-list-card">
        {habits.length > 0 ? (
          <HabitList
            habits={habits}
            toggleToday={toggleToday}
            deleteHabit={deleteHabit}
            editHabit={editHabit}
          />
        ) : (
          <p style={{ textAlign: 'center', color: '#718096' }}>아직 등록된 습관이 없습니다. 새로운 습관을 추가해보세요!</p>
        )}
      </div>
    </div>
  );
};

/**
 * 메인 App 컴포넌트
 */
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppContent />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;