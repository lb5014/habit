// src/components/CalendarView.tsx

import React from "react";
import { Habit } from "../types/habit";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, startOfWeek, endOfWeek } from "date-fns";
import { interpolateColor } from '../utils/color'; // 1. 유틸리티 함수 임포트

// 2. Props를 habits 배열로 변경
interface Props {
  habits: Habit[];
}

// 0%와 100%일 때의 색상 정의
const COLOR_ZERO_PERCENT = "#e2e8f0"; // 연한 회색 (미완료)
const COLOR_HUNDRED_PERCENT = "#48bb78"; // 초록색 (100% 완료)

const CalendarView = ({ habits }: Props) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // 3. 날짜별 스타일을 계산하는 새 함수
  const getDayStyle = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd");
    
    // 이 날짜에 완료된 습관 수 계산 (여기서는 모든 습관이 매일 실행된다고 가정)
    // TODO: 주간/요일별 습관인 경우, 해당 날짜에 실행되는 습관만 필터링하는 로직 추가 필요
    const completedCount = habits.filter(h => h.completedDates.includes(dateStr)).length;
    const totalCount = habits.length;

    if (totalCount === 0) {
      return { background: COLOR_ZERO_PERCENT };
    }

    const completionRate = completedCount / totalCount; // 0 ~ 1 사이의 비율
    const backgroundColor = interpolateColor(COLOR_ZERO_PERCENT, COLOR_HUNDRED_PERCENT, completionRate);

    return {
      background: backgroundColor,
      color: completionRate > 0.5 ? 'white' : '#2d3748', // 배경이 진해지면 글자색을 흰색으로
    };
  };

  return (
    <div className="calendar-container-small">
      <div className="calendar-weekdays-small">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className="calendar-weekday-small">{day}</div>
        ))}
      </div>
      <div className="calendar-grid-small">
        {days.map((day) => {
          const isCurrentMonth = day >= monthStart && day <= monthEnd;
          // 4. 새 스타일 함수 호출
          const dayStyle = getDayStyle(day);

          return (
            <div
              key={format(day, "yyyy-MM-dd")}
              className={`calendar-day-small ${!isCurrentMonth ? "other-month" : ""}`}
              style={dayStyle}
              title={`${format(day, "yyyy년 M월 d일")}`}
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