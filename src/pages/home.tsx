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
import CalendarView from "../components/CalendarView";

/**
 * 홈 페이지 컴포넌트
 * 
 * @returns {JSX.Element} 습관 추적기 홈 페이지 UI
 */
const Home = () => {
  // useHabits 훅을 통해 습관 관련 상태와 함수들 가져오기
  const { habits, addHabit, toggleToday, deleteHabit, editHabit } = useHabits();
  
  // 캘린더 뷰에서 선택된 습관의 ID 상태 관리
  const [selectedHabitId, setSelectedHabitId] = useState(null);

  // 선택된 습관 객체 찾기
  const selectedHabit = habits.find((h) => h.id === selectedHabitId);

  return (
    <div className="habit-tracker">
      {/* 앱 헤더 섹션 */}
      <div className="habit-header">
        <h1 className="habit-title">습관 추적기</h1>
        <p className="habit-subtitle">매일의 작은 습관이 큰 변화를 만듭니다</p>
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

      {/* 선택된 습관의 캘린더 뷰 카드 (습관이 선택된 경우에만 표시) */}
      {selectedHabit && (
        <div className="habit-card">
          <CalendarView habit={selectedHabit} />
        </div>
      )}

      {/* 캘린더 뷰를 위한 습관 선택 버튼들 (습관이 존재하는 경우에만 표시) */}
      {habits.length > 0 && (
        <div className="habit-card">
          <div className="selection-container">
            <h2 className="selection-title">달력 보기</h2>
            <div className="selection-buttons">
              {habits.map((habit) => (
                <button
                  key={habit.id}
                  onClick={() => setSelectedHabitId(habit.id)}
                  className="selection-button"
                >
                  {habit.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;