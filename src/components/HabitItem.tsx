import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Habit, Schedule, DayOfWeek } from "../types/habit";

interface Props {
  habit: Habit;
  toggleToday: (id: string) => void;
  deleteHabit: (id: string) => void;
  onSelectHabit?: (id: string) => void;
}

const HabitItem: React.FC<Props> = ({
  habit,
  toggleToday,
  deleteHabit,
  onSelectHabit,
}) => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const doneToday = habit.completedDates.includes(today);
  const completedDates = habit.completedDates || [];
  const streakCount = completedDates.length;

  // 오늘 실행되는 날인지 판별
  const todayDayOfWeek = new Date().getDay();
  const isScheduledForToday =
    habit.schedule.type === "daily" ||
    (habit.schedule.type === "weekly" &&
      habit.schedule.days?.includes(todayDayOfWeek as DayOfWeek));

  const weekDays: { label: string; value: DayOfWeek }[] = [
    { label: "월", value: 1 },
    { label: "화", value: 2 },
    { label: "수", value: 3 },
    { label: "목", value: 4 },
    { label: "금", value: 5 },
    { label: "토", value: 6 },
    { label: "일", value: 0 },
  ];

  const formatSchedule = (schedule: Schedule) => {
    if (!schedule) return "";
    if (schedule.type === "daily") return "매일";
    if (schedule.type === "weekly" && schedule.days) {
      const sortedDays = [...schedule.days].sort();
      const dayLabels = sortedDays.map((dayValue) => {
        return weekDays.find((d) => d.value === dayValue)?.label || "";
      });
      return `매주 ${dayLabels.join(", ")}`;
    }
    return "";
  };

  const handleToggleDropdown = (habitId: string) => {
    setOpenDropdownId((prevId) => (prevId === habitId ? null : habitId));
  };

  const handleEdit = () => {
    navigate(`/app/edit-habit/${habit.id}`);
    setOpenDropdownId(null);
  };

  return (
    <div
      className={`habit-item ${doneToday ? "completed" : ""}`}
    >
      <div className="habit-item-content">
        <div
          className="habit-info"
          onClick={() => onSelectHabit && onSelectHabit(habit.id)}
        >
          <div className="habit-header">
            <div className="habit-title-section">
              <h3 className="habit-name">{habit.title}</h3>
              {habit.description && (
                <p className="habit-description">{habit.description}</p>
              )}
            </div>
            <div className="habit-status">
              <div
                className={`status-indicator ${
                  doneToday ? "completed" : "pending"
                }`}
              >
                {doneToday ? "✅" : "⏳"}
              </div>
            </div>
          </div>

          <div className="habit-details">
            <div className="habit-meta">
              <div className="habit-frequency">
                <span className="meta-icon">📅</span>
                <span className="meta-text">
                  {formatSchedule(habit.schedule)}
                </span>
              </div>
              <div className="habit-streak">
                <span className="meta-icon">🔥</span>
                <span className="meta-text">{streakCount}일 연속</span>
              </div>
              {habit.notificationOn && (
                <div className="habit-notification">
                  <span className="meta-icon">🔔</span>
                  <span className="meta-text">{habit.notificationTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="habit-actions">
          <button
            onClick={() => toggleToday(habit.id)}
            className={`habit-action-button ${
              doneToday ? "completed" : "pending"
            }`}
            disabled={!isScheduledForToday}
          >
            <span className="button-icon">{doneToday ? "✅" : "⏳"}</span>
            <span className="button-text">
              {doneToday ? "완료!" : "오늘 체크"}
            </span>
          </button>

          <div className="habit-menu">
            <button
              onClick={() => handleToggleDropdown(habit.id)}
              className="menu-toggle"
              aria-label="메뉴 열기"
            >
              <span className="menu-icon">⋯</span>
            </button>

            <div
              className={`menu-dropdown ${
                openDropdownId === habit.id ? "open" : ""
              }`}
            >
              <button onClick={handleEdit} className="menu-item edit">
                <span className="menu-item-icon">✏️</span>
                <span className="menu-item-text">수정</span>
              </button>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="menu-item delete"
              >
                <span className="menu-item-icon">🗑️</span>
                <span className="menu-item-text">삭제</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitItem;
