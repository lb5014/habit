/**
 * 습관 추적기 메인 앱 컴포넌트
 * 
 * 이 컴포넌트는 습관 추적기의 핵심 기능을 담당합니다:
 * - 랜딩 페이지 표시
 * - 습관 추가, 수정, 삭제
 * - 일일 체크 기능
 * - 진행률 차트 표시
 * - 캘린더 뷰
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// React 및 필요한 라이브러리 import
import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import ProgressChart from "./components/ProgressChart";
import CalendarView from "./components/CalendarView";
import ThemeToggle from "./components/ThemeToggle";
import ProtectedRoute from './routes/ProtectedRoute';
// import { Habit } from "./types/habit"; // 현재 사용하지 않음
import { loadHabits, saveHabits } from "./utils/storage";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

/**
 * 메인 앱 컨텐츠 컴포넌트 (인증된 사용자용)
 * 
 * @returns {JSX.Element} 습관 추적기 메인 UI
 */
const AppContent = () => {
  // 인증 컨텍스트에서 사용자 정보와 인증 함수들 가져오기
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // 습관 목록 상태 관리
  const [habits, setHabits] = useState([]);

  /**
   * 컴포넌트 마운트 시 로컬 스토리지에서 습관 데이터 로드
   */
  useEffect(() => {
    setHabits(loadHabits());
  }, []);

  /**
   * 습관 데이터가 변경될 때마다 로컬 스토리지에 저장
   */
  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  /**
   * 새로운 습관을 추가하는 함수
   * 
   * @param {string} title - 습관 제목
   * @param {string} description - 습관 설명
   * @param {'daily'|'weekly'} frequency - 습관 빈도 (매일/주간)
   */
  const addHabit = (title, description, frequency) => {
    const newHabit = {
      id: uuidv4(), // 고유 ID 생성
      title,
      description,
      frequency,
      startDate: new Date().toISOString(), // 시작 날짜를 현재 시간으로 설정
      completedDates: [], // 완료된 날짜 목록 (초기값: 빈 배열)
    };
    setHabits([...habits, newHabit]);
  };

  /**
   * 특정 습관의 오늘 완료 상태를 토글하는 함수
   * 
   * @param {string} id - 습관 ID
   */
  const toggleToday = (id) => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 오늘 날짜 생성
    
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const alreadyDone = habit.completedDates.includes(today);
          return {
            ...habit,
            // 이미 완료된 경우: 완료 목록에서 제거, 완료되지 않은 경우: 완료 목록에 추가
            completedDates: alreadyDone
              ? habit.completedDates.filter((date) => date !== today)
              : [...habit.completedDates, today],
          };
        }
        return habit;
      })
    );
  };

  /**
   * 습관을 삭제하는 함수
   * 
   * @param {string} id - 삭제할 습관의 ID
   */
  const deleteHabit = (id) => {
    // 사용자 확인 후 삭제
    if (window.confirm("정말로 이 습관을 삭제하시겠습니까?")) {
      setHabits(habits.filter((habit) => habit.id !== id));
    }
  };

  /**
   * 습관 정보를 수정하는 함수
   * 
   * @param {string} id - 수정할 습관의 ID
   * @param {string} newTitle - 새로운 제목
   * @param {string} newDescription - 새로운 설명
   * @param {'daily'|'weekly'} newFrequency - 새로운 빈도
   */
  const editHabit = (id, newTitle, newDescription, newFrequency) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          return {
            ...habit,
            title: newTitle,
            description: newDescription,
            frequency: newFrequency,
          };
        }
        return habit;
      })
    );
  };


  return (
    <div className="habit-tracker">
      {/* Theme Toggle */}
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>
      
      {/* 앱 헤더 섹션 */}
      <div className="habit-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="habit-title">
              Building Habi<span className="hammer-icon">🔨</span>
            </h1>
            <p className="habit-subtitle">매일의 작은 습관이 큰 변화를 만듭니다</p>
          </div>
          
          {/* 사용자 정보 또는 로그인 버튼 (오른쪽) */}
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
                <div className="guest-text">
                  <span>게스트 모드</span>
                </div>
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
      <div className="habit-card">
        <HabitList 
          habits={habits} 
          toggleToday={toggleToday} 
          deleteHabit={deleteHabit}
          editHabit={editHabit}
        />
      </div>

      {/* 습관 달성률 차트 카드 */}
      <div className="habit-card">
        <ProgressChart habits={habits} />
      </div>


      {/* 인증 모달 제거: SPA 라우팅으로 이동 */}
    </div>
  );
};

/**
 * 메인 App 컴포넌트
 * 
 * 라우팅에 따라 랜딩 페이지 또는 메인 앱을 표시합니다.
 * 
 * @returns {JSX.Element} 전체 앱 UI
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