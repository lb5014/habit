/**
 * 습관 추적기 홈 페이지 컴포넌트
 * 
 * 습관 추적기의 메인 페이지로, 모든 주요 기능을 통합하여 제공합니다:
 * - 습관 추가 폼
 * - 습관 목록 및 관리
 * - 달성률 차트
 * - 개별 습관 캘린더 뷰
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// React와 필요한 컴포넌트들 import
import React, { useState } from "react";
import { useHabits } from "../hooks/useHabits";
import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
import ProgressChart from "../components/ProgressChart";
import AchievementWidget from "../components/AchievementWidget";
import { useAuth } from "../contexts/AuthContext";
import AdComponent from "../components/AdComponent";

/**
 * 홈 페이지 컴포넌트
 * 
 * @returns {JSX.Element} 습관 추적기 홈 페이지 UI
 */
const Home = () => {
  // useHabits 훅을 통해 습관 관련 상태와 함수들 가져오기
  const { habits, addHabit, toggleToday, deleteHabit, editHabit } = useHabits();
  
  // 목록에서 선택된 습관의 ID 상태 관리 (달성률 위젯용)
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  
  // 달력 보기 상태 관리
  const [showCalendar, setShowCalendar] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // 애드센스 ID
  const AD_PUBLISHER_ID = "ca-pub-3312578759263961";
  const AD_SLOT_ID_TOP = "YOUR_AD_SLOT_ID_1"; // TODO: 실제 슬롯 ID로 교체

  // 선택된 습관 객체 찾기
  const selectedHabit = habits.find((h) => h.id === selectedHabitId);

  return (
    <div className="habit-tracker">
      {/* 앱 헤더 섹션 */}
      <div className="habit-header">
        <h1 className="habit-title">습관 추적기</h1>
        <p className="habit-subtitle">매일의 작은 습관이 큰 변화를 만듭니다</p>
      </div>

      {/* [추가] 로그인한 사용자에게만 광고 표시 */}
      {isAuthenticated && user ? (
        <AdComponent publisherId={AD_PUBLISHER_ID} slotId={AD_SLOT_ID_TOP} />
      ) : null}

      {/* 습관 추가 폼 카드 */}
      <div className="habit-card">
        <HabitForm addHabit={addHabit} />
      </div>

      {/* 메인 컨텐츠 영역 - 2열 레이아웃 */}
      <div className="main-content">
        {/* 왼쪽 컬럼 - 습관 목록 */}
        <div className="left-column">
          <div className="habit-card">
            <HabitList 
              habits={habits} 
              toggleToday={toggleToday} 
              deleteHabit={deleteHabit}
              editHabit={editHabit}
              onSelectHabit={(id) => setSelectedHabitId(id)}
            />
          </div>
        </div>

        {/* 오른쪽 컬럼 - 달성률 차트와 컴팩트 위젯 */}
        <div className="right-column">
          {/* 습관 완료 현황 차트 카드 */}
          <div className="habit-card compact">
            <ProgressChart habits={habits} />
          </div>

          {/* 선택된 습관의 달성률 위젯 */}
          <AchievementWidget habit={selectedHabit || null} />
        </div>
      </div>
    </div>
  );
};

export default Home;