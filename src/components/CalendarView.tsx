/**
 * 개별 습관의 월별 캘린더 뷰 컴포넌트
 * 
 * 선택된 습관의 이번 달 캘린더를 표시하며, 
 * 각 날짜별로 습관 완료 여부를 시각적으로 보여줍니다.
 * 달성한 습관들은 점점 색깔이 진해집니다.
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// React와 date-fns 라이브러리 import
import React from "react";
import { Habit } from "../types/habit";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, startOfWeek, endOfWeek, addDays } from "date-fns";

/**
 * CalendarView 컴포넌트의 Props 타입 정의
 */
interface Props {
  habit: Habit; // 표시할 습관 객체
}

/**
 * 습관 월별 캘린더 뷰 컴포넌트
 * 
 * @param {Props} props - 컴포넌트 props
 * @returns {JSX.Element} 습관 월별 캘린더 UI
 */
const CalendarView = ({ habit }: Props) => {
  const today = new Date(); // 현재 날짜
  const monthStart = startOfMonth(today); // 이번 달의 첫 번째 날
  const monthEnd = endOfMonth(today); // 이번 달의 마지막 날
  
  // 캘린더 그리드를 위한 주간 시작/끝 계산
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // 일요일 시작
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 }); // 일요일 끝
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd }); // 캘린더에 표시할 모든 날짜

  // 이번 달 달성률 계산
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const completedDays = monthDays.filter(day => {
    const dateStr = format(day, "yyyy-MM-dd");
    return habit.completedDates.includes(dateStr);
  }).length;
  const totalDays = monthDays.length;
  const achievementRate = Math.round((completedDays / totalDays) * 100);

  // 연속 달성 일수 계산 (점점 진해지는 색상을 위한)
  const getConsecutiveDays = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (!habit.completedDates.includes(dateStr)) return 0;
    
    let consecutive = 1;
    let checkDate = addDays(date, -1);
    
    while (habit.completedDates.includes(format(checkDate, "yyyy-MM-dd"))) {
      consecutive++;
      checkDate = addDays(checkDate, -1);
    }
    
    return consecutive;
  };

  // 색상 계산 함수 (로고 색상 #61DAFB 기반)
  const getDayColor = (day: Date, isCompleted: boolean) => {
    if (!isCompleted) {
      return {
        background: '#f7fafc',
        color: '#4a5568',
        border: '1px solid #e2e8f0'
      };
    }
    
    const consecutiveDays = getConsecutiveDays(day);
    // 연속 일수에 따라 색상 진하기 조절 (최대 10일)
    const intensity = Math.min(consecutiveDays / 10, 1);
    const opacity = 0.3 + (intensity * 0.7); // 0.3 ~ 1.0
    
    return {
      background: `rgba(97, 218, 251, ${opacity})`, // #61DAFB 기반
      color: intensity > 0.5 ? 'white' : '#2d3748',
      border: `2px solid rgba(97, 218, 251, ${Math.min(opacity + 0.2, 1)})`,
      boxShadow: `0 2px 8px rgba(97, 218, 251, ${opacity * 0.3})`
    };
  };

  return (
    <div className="calendar-container-small">
      {/* 캘린더 제목 */}
      <h3 className="calendar-title-small">{habit.title}</h3>
      
      {/* 요일 헤더 */}
      <div className="calendar-weekdays-small">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className="calendar-weekday-small">
            {day}
          </div>
        ))}
      </div>
      
      {/* 캘린더 그리드 */}
      <div className="calendar-grid-small">
        {days.map((day, idx) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const isCompleted = habit.completedDates.includes(dateStr);
          const isCurrentMonth = day >= monthStart && day <= monthEnd;
          const dayStyle = getDayColor(day, isCompleted);

          return (
            <div
              key={dateStr}
              className={`calendar-day-small ${
                isCompleted ? "completed" : "pending"
              } ${!isCurrentMonth ? "other-month" : ""}`}
              style={dayStyle}
              title={`${format(day, "yyyy년 M월 d일")} ${
                isCompleted ? "완료" : "미완료"
              }`}
            >
              {isCurrentMonth ? format(day, "d") : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;