/**
 * 선택된 습관의 이번 달 달성률을 표시하는 컴팩트 위젯
 */

import React from "react";
import { Habit } from "../types/habit";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";

interface Props {
  habit: Habit | null;
}

const AchievementWidget: React.FC<Props> = ({ habit }) => {
  if (!habit) {
    return (
      <div className="habit-card compact" style={{ padding: '12px' }}>
        <h3 className="chart-title" style={{ marginBottom: '8px' }}>달성률</h3>
        <p style={{ color: '#718096', fontSize: '14px' }}>습관을 선택하면 달성률이 표시됩니다.</p>
      </div>
    );
  }

  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const totalDays = monthDays.length;
  const completedDays = monthDays.filter((day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    return habit.completedDates.includes(dateStr);
  }).length;
  const achievementRate = Math.round((completedDays / totalDays) * 100);

  return (
    <div className="habit-card compact" style={{ padding: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 className="chart-title" style={{ marginBottom: '4px' }}>{habit.title}</h3>
          <div style={{ fontSize: '13px', color: '#4a5568' }}>{achievementRate}% ({completedDays}/{totalDays}일)</div>
        </div>
      </div>

      <div style={{ marginTop: '10px' }}>
        <div style={{ height: 8, background: '#e6e6e6', borderRadius: 999 }}>
          <div
            style={{
              width: `${achievementRate}%`,
              height: 8,
              background: '#4364DE',
              borderRadius: 999,
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AchievementWidget;

