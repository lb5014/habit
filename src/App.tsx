import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useEffect } from 'react';
import { requestNotificationPermission } from './utils/notifications';
import { ThemeProvider } from "./contexts/ThemeContext";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import app from "./firebase";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SettingsPage from "./pages/SettingsPage";
import EditHabitPage from "./pages/EditHabitPage";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import CalendarView from "./components/CalendarView";
import ThemeToggle from "./components/ThemeToggle";
import ToastContainer from "./components/ToastContainer";
import ProtectedRoute from './routes/ProtectedRoute';
import { useHabits } from "./hooks/useHabits";
import { useToast } from "./hooks/useToast";
import "./App.css";

/**
 * 메인 앱 컨텐츠 컴포넌트 (인증된 사용자용)
 */
const AppContent = () => {
  const { user, logout, isAuthenticated } = useAuth(); // 인증 컨텍스트 사용
  const navigate = useNavigate(); // 네비게이션 훅
  const { habits, addHabit, toggleToday, deleteHabit } = useHabits(); // 습관 훅
  const { toasts, removeToast, showSuccess, showError } = useToast(); // 토스트 훅

  // 로그인 사용자에 대해 FCM 토큰 발급/저장 및 포그라운드 메시지 처리
  useEffect(() => {
    const setupFCM = async () => {
      if (!user) return;
      try {
        const messaging = getMessaging(app);
        const registration = await navigator.serviceWorker
          .getRegistration()
          .then((reg) => reg ?? navigator.serviceWorker.register('/firebase-messaging-sw.js'));

        const token = await getToken(messaging, {
          vapidKey: "YOUR_VAPID_KEY_FROM_FIREBASE_CONSOLE",
          serviceWorkerRegistration: registration,
        });

        if (token) {
          console.log('FCM Token:', token);
          const firestore = getFirestore(app);
          const userDocRef = doc(firestore, 'users', user.uid);
          await setDoc(userDocRef, { fcmToken: token }, { merge: true });
        } else {
          console.log('FCM 토큰을 얻을 수 없습니다. 권한을 확인하세요.');
        }

        onMessage(messaging, (payload) => {
          console.log('포그라운드 메시지 수신: ', payload);
          // 필요 시 인앱 알림 또는 showNotification 사용 가능
        });
      } catch (err) {
        console.error('FCM 오류:', err);
      }
    };
    setupFCM();
  }, [user]);

  const getOverallProgress = () => { // 오늘의 전체 습관 달성률 계산
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

  // 습관 추가 핸들러 (토스트 알림 포함)
  const handleAddHabit = (
    title: string,
    description: string,
    schedule: any,
    notificationOn: boolean,
    notificationTime?: string
  ) => {
    try {
      addHabit(title, description, schedule, notificationOn, notificationTime);
      showSuccess(
        '습관이 추가되었습니다!',
        `${title} 습관이 성공적으로 등록되었어요. 화이팅! 💪`
      );
    } catch (error) {
      showError(
        '습관 추가 실패',
        '습관을 추가하는 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
    }
  };

  // 습관 삭제 핸들러 (토스트 알림 포함)
  const handleDeleteHabit = (id: string) => {
    try {
      const habit = habits.find(h => h.id === id);
      deleteHabit(id);
      showSuccess(
        '습관이 삭제되었습니다',
        habit ? `${habit.title} 습관이 삭제되었습니다.` : '습관이 삭제되었습니다.'
      );
    } catch (error) {
      showError(
        '습관 삭제 실패',
        '습관을 삭제하는 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
    }
  };

  // 습관 토글 핸들러 (토스트 알림 포함)
  const handleToggleToday = (id: string) => {
    try {
      const habit = habits.find(h => h.id === id);
      const wasCompleted = habit?.completedDates?.includes(new Date().toISOString().split("T")[0]);

      toggleToday(id);

      if (wasCompleted) {
        showSuccess(
          '습관이 취소되었습니다',
          `${habit?.title} 습관을 취소했습니다.`
        );
      } else {
        showSuccess(
          '습관을 완료했습니다!',
          `${habit?.title} 습관을 완료했습니다. 잘했어요! 🎉`
        );
      }
    } catch (error) {
      showError(
        '습관 체크 실패',
        '습관 상태를 변경하는 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
    }
  };

  return (
    <div className="habit-tracker">
      {/* 상단 컨트롤 버튼들 */}
      <div className="top-controls">
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
      </div>

      {/* 대시보드 헤더 */}
      <div className="dashboard-header">
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
                <div className="user-actions">
                  <button 
                    onClick={() => navigate('/settings')} 
                    className="settings-button"
                    title="설정"
                  >
                    ⚙️
                  </button>
                  <button onClick={logout} className="logout-button">
                    로그아웃
                  </button>
                </div>
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

      {/* 대시보드 메인 컨텐츠 */}
      <div className="dashboard-main">
        {/* 왼쪽 컬럼: 습관 관리 */}
        <div className="dashboard-left">
          {/* 습관 추가 폼 카드 */}
          <div className="habit-card">
            <div className="card-header">
              <h2>새 습관 추가</h2>
              <p>새로운 습관을 만들어보세요</p>
            </div>
            <HabitForm addHabit={handleAddHabit} />
          </div>

          {/* 습관 목록 카드 */}
          <div className="habit-card habit-list-card">
            <div className="card-header">
              <h2>나의 습관</h2>
              <p>오늘도 화이팅! 💪</p>
            </div>
            {habits.length > 0 ? (
              <HabitList
                habits={habits}
                toggleToday={handleToggleToday}
                deleteHabit={handleDeleteHabit}
              />
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <p>아직 등록된 습관이 없습니다.</p>
                <p>새로운 습관을 추가해보세요!</p>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 컬럼: 통계 및 캘린더 */}
        <div className="dashboard-right">
          {/* 오늘의 달성률 카드 */}
          <div className="habit-card stats-card">
            <div className="card-header">
              <h3>오늘의 달성률</h3>
            </div>
            <div className="stats-content">
              <div className="progress-circle">
                <svg width="120" height="120">
                  <circle
                    className="progress-bg"
                    stroke="var(--border-primary)"
                    strokeWidth="8"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                  />
                  <circle
                    className="progress-fill"
                    stroke="var(--primary-color)"
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
                <div className="progress-text">
                  <span className="progress-percentage">{getOverallProgress()}%</span>
                  <span className="progress-label">달성</span>
                </div>
              </div>
              <div className="stats-details">
                <div className="stat-item">
                  <span className="stat-number">{habits.filter(h => h.completedDates?.includes(new Date().toISOString().split("T")[0])).length}</span>
                  <span className="stat-label">완료</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{habits.length}</span>
                  <span className="stat-label">전체</span>
                </div>
              </div>
            </div>
          </div>

          {/* 간단한 캘린더 카드 */}
          <div className="habit-card calendar-card">
            <div className="card-header">
              <h3>이번 달</h3>
            </div>
            {habits.length > 0 ? (
              // habits[0] 대신 habits 전체를 전달
              <CalendarView habits={habits} />
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <p>등록된 습관이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 토스트 알림 컨테이너 */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
};

/**
 * 메인 App 컴포넌트
 */
const App = () => {
  useEffect(() => {
    // 앱이 마운트될 때 알림 권한 요청
    requestNotificationPermission();
  }, []);
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
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app/edit-habit/:habitId"
              element={
                <ProtectedRoute>
                  <EditHabitPage />
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