// src/components/CalendarView.tsx

import React from "react";
import { Habit, DayOfWeek } from "../types/habit";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { interpolateColor } from "../utils/color";

interface Props {
  habits: Habit[];
}

const COLOR_ZERO_PERCENT = "#e2e8f0"; // 연한 회색 (미완료)
const COLOR_HUNDRED_PERCENT = "#48bb78"; // 초록색 (100% 완료)

const CalendarView = ({ habits }: Props) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // 3. 날짜별 스타일을 계산하는 새 함수 (수정됨)
  const getDayStyle = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd");

    // 1. 현재 날짜의 요일(dayOfWeek)을 가져옵니다. (0: 일요일, 1: 월요일, ...)
    const dayOfWeek = day.getDay();

    // 2. 이 날짜에 '실행하도록 예약된' 습관만 필터링합니다.
    const scheduledHabits = habits.filter((habit) => {
      if (habit.schedule.type === "daily") {
        return true; // '매일' 습관은 항상 포함
      }
      if (habit.schedule.type === "weekly" && habit.schedule.days) {
        // '요일별' 습관은 오늘 요일이 포함된 경우에만
        return habit.schedule.days.includes(dayOfWeek as DayOfWeek);
      }
      return false; // 그 외 (schedule이 없거나 타입이 안 맞으면)
    });

    // 3. 필터링된 습관 목록을 기준으로 totalCount와 completedCount를 재계산합니다.
    const totalCount = scheduledHabits.length;
    const completedCount = scheduledHabits.filter((h) =>
      h.completedDates.includes(dateStr)
    ).length;

    // 4. 실행할 습관이 아예 없는 날(예: 주말) 처리
    if (totalCount === 0) {
      // 0% 달성과 구별하기 위해 투명도를 살짝 주거나,
      // 0%와 동일한 색상으로 처리할 수 있습니다.
      return { background: COLOR_ZERO_PERCENT, opacity: 0.6 };
    }

    const completionRate = completedCount / totalCount; // 0 ~ 1 사이의 비율
    const backgroundColor = interpolateColor(
      COLOR_ZERO_PERCENT,
      COLOR_HUNDRED_PERCENT,
      completionRate
    );

    return {
      background: backgroundColor,
      color: completionRate > 0.5 ? "white" : "#2d3748",
    };
  };

  return (
    <div className="calendar-container-small">
      <div className="calendar-weekdays-small">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="calendar-weekday-small">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid-small">
        {days.map((day) => {
          const isCurrentMonth = day >= monthStart && day <= monthEnd;
          const dayStyle = getDayStyle(day);

          return (
            <div
              key={format(day, "yyyy-MM-dd")}
              className={`calendar-day-small ${
                !isCurrentMonth ? "other-month" : ""
              }`}
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
