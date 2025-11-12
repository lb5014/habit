// src/components/CalendarView.tsx

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
import "./Tooltip.css";

interface Props {
  habits: Habit[];
}

const COLOR_ZERO_PERCENT = "#e2e8f0"; // 연한 회색 (미완료)
const COLOR_HUNDRED_PERCENT = "#48bb78"; // 초록색 (100% 완료)

interface TooltipData {
  date: Date;
  x: number;
  y: number;
}

const CalendarView = ({ habits }: Props) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // 툴팁 닫기 기능: 외부 클릭 또는 Escape 키
  useEffect(() => {
    if (!tooltip) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // 툴팁 자체를 클릭한 경우는 무시
      if (tooltipRef.current?.contains(target)) {
        e.stopPropagation();
        return;
      }
      
      // 캘린더 컨테이너 내부 클릭은 무시 (날짜 클릭은 handleDayClick에서 처리)
      if (calendarRef.current?.contains(target)) {
        return;
      }
      
      // 그 외의 경우 툴팁 닫기
      setTooltip(null);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setTooltip(null);
      }
    };

    // 이벤트를 약간 지연시켜 등록하여 handleDayClick이 먼저 처리되도록 함
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside, true);
    }, 100);

    document.addEventListener("keydown", handleEscape);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [tooltip]);

  // 날짜별로 예정된 습관 목록 가져오기
  const getScheduledHabits = (day: Date) => {
    const dayOfWeek = day.getDay();
    return habits.filter((habit) => {
      if (habit.schedule.type === "daily") {
        return true;
      }
      if (habit.schedule.type === "weekly" && habit.schedule.days) {
        return habit.schedule.days.includes(dayOfWeek as DayOfWeek);
      }
      return false;
    });
  };

  // 날짜 클릭 핸들러
  const handleDayClick = (day: Date, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 클릭 위치 계산 및 화면 경계 체크
    const x = e.clientX;
    const y = e.clientY;
    const tooltipWidth = 280; // max-width
    const tooltipHeight = 250; // 예상 높이
    const offset = 15;
    
    let tooltipX = x + offset;
    let tooltipY = y + offset;
    
    // 화면 오른쪽 경계 체크
    if (tooltipX + tooltipWidth > window.innerWidth) {
      tooltipX = Math.max(offset, x - tooltipWidth - offset);
    }
    
    // 화면 아래쪽 경계 체크
    if (tooltipY + tooltipHeight > window.innerHeight) {
      tooltipY = Math.max(offset, y - tooltipHeight - offset);
    }
    
    // 화면 왼쪽 경계 체크
    if (tooltipX < 0) {
      tooltipX = offset;
    }
    
    // 화면 위쪽 경계 체크
    if (tooltipY < 0) {
      tooltipY = offset;
    }
    
    // 같은 날짜를 클릭한 경우 토글, 다른 날짜 클릭 시 업데이트
    const dayStr = format(day, "yyyy-MM-dd");
    if (tooltip && format(tooltip.date, "yyyy-MM-dd") === dayStr) {
      setTooltip(null);
    } else {
      // 즉시 툴팁 표시
      setTooltip({
        date: day,
        x: tooltipX,
        y: tooltipY,
      });
    }
  };

  // 3. 날짜별 스타일을 계산하는 새 함수 (수정됨)
  const getDayStyle = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const dayOfWeek = day.getDay();
    const scheduledHabits = getScheduledHabits(day);

    const totalCount = scheduledHabits.length;
    const completedCount = scheduledHabits.filter((h) =>
      h.completedDates.includes(dateStr)
    ).length;

    // 4. 실행할 습관이 아예 없는 날(예: 주말) 처리
    if (totalCount === 0) {
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

  // 툴팁 내용 생성
  const getTooltipContent = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const scheduledHabits = getScheduledHabits(day);
    const completedHabits = scheduledHabits.filter((h) =>
      h.completedDates.includes(dateStr)
    );

    const totalCount = scheduledHabits.length;
    const completedCount = completedHabits.length;
    const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return {
      date: format(day, "yyyy년 M월 d일"),
      totalCount,
      completedCount,
      completionRate,
      scheduledHabits,
      completedHabits,
    };
  };

  return (
    <div ref={calendarRef} className="calendar-container-small">
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
              onClick={(e) => handleDayClick(day, e)}
              title={`${format(day, "yyyy년 M월 d일")}`}
            >
              {isCurrentMonth ? format(day, "d") : ""}
            </div>
          );
        })}
      </div>

      {/* 클릭 툴팁 - Portal로 body에 렌더링 */}
      {tooltip && createPortal(
        (() => {
          const content = getTooltipContent(tooltip.date);
          return (
            <div
              ref={tooltipRef}
              className="tooltip-popup calendar-tooltip"
              style={{
                position: "fixed",
                top: `${tooltip.y}px`,
                left: `${tooltip.x}px`,
                pointerEvents: "auto",
                zIndex: 10000,
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="tooltip-header">
                <strong>{content.date}</strong>
              </div>
              <div className="tooltip-content">
                <div className="tooltip-stats">
                  {content.totalCount > 0 ? (
                    <>
                      <div className="tooltip-stat">
                        완료: {content.completedCount}/{content.totalCount}
                      </div>
                      <div className="tooltip-stat">
                        달성률: {Math.round(content.completionRate)}%
                      </div>
                    </>
                  ) : (
                    <div className="tooltip-stat">예정된 습관이 없습니다</div>
                  )}
                </div>
                {content.totalCount > 0 && (
                  <div className="tooltip-habits">
                    <div className="tooltip-habits-title">습관 목록:</div>
                    <ul className="tooltip-habits-list">
                      {content.scheduledHabits.map((habit) => {
                        const isCompleted = content.completedHabits.some(
                          (h) => h.id === habit.id
                        );
                        return (
                          <li
                            key={habit.id}
                            className={`tooltip-habit-item ${
                              isCompleted ? "completed" : ""
                            }`}
                          >
                            <span className="tooltip-habit-check">
                              {isCompleted ? "✓" : "○"}
                            </span>
                            <span className="tooltip-habit-name">
                              {habit.title}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })(),
        document.body
      )}
    </div>
  );
};

export default CalendarView;
