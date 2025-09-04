// src/components/CalendarView.tsx
import React from "react";
import { Habit } from "../types/habit";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";

interface Props {
  habit: Habit;
}

const CalendarView = ({ habit }: Props) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">{habit.title} - 이번 달</h2>
      <div className="calendar-grid">
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const done = habit.completedDates.includes(dateStr);
          return (
            <div
              key={dateStr}
              className={`calendar-day ${done ? "completed" : "pending"}`}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;