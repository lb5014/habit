/**
 * 개별 습관의 월별 캘린더 뷰 컴포넌트
 * 
 * 선택된 습관의 이번 달 캘린더를 표시하며, 
 * 각 날짜별로 습관 완료 여부를 시각적으로 보여줍니다.
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// React와 date-fns 라이브러리 import
import React from "react";
import { Habit } from "../types/habit";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";

/**
 * CalendarView 컴포넌트의 Props 타입 정의
 */
interface Props {
  habit: Habit; // 표시할 습관 객체
}

/**
 * 습관 캘린더 뷰 컴포넌트
 * 
 * @param {Props} props - 컴포넌트 props
 * @returns {JSX.Element} 습관 캘린더 UI
 */
const CalendarView = ({ habit }: Props) => {
  const today = new Date(); // 현재 날짜
  const monthStart = startOfMonth(today); // 이번 달의 첫 번째 날
  const monthEnd = endOfMonth(today); // 이번 달의 마지막 날
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd }); // 이번 달의 모든 날짜 배열

  return (
    <div className="calendar-container">
      {/* 캘린더 제목 */}
      <h2 className="calendar-title">{habit.title} - 이번 달</h2>
      
      {/* 캘린더 그리드 */}
      <div className="calendar-grid">
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd"); // 날짜를 YYYY-MM-DD 형식으로 변환
          const done = habit.completedDates.includes(dateStr); // 해당 날짜에 습관을 완료했는지 확인
          
          return (
            <div
              key={dateStr}
              className={`calendar-day ${done ? "completed" : "pending"}`}
            >
              {format(day, "d")} {/* 날짜의 일(day) 부분만 표시 */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;