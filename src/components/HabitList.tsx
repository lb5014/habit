// src/components/HabitList.tsx
import React from "react";
import { Habit } from "../types/habit";

interface Props {
  habits: Habit[];
  toggleToday: (id: string) => void;
}

const HabitList = ({ habits, toggleToday }: Props) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="habit-list">
      {habits.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
          <p>아직 등록된 습관이 없습니다. 새로운 습관을 추가해보세요!</p>
        </div>
      ) : (
        habits.map((habit) => {
          const doneToday = habit.completedDates.includes(today);
          return (
            <div key={habit.id} className="habit-item">
              <div className="habit-info">
                <h3>{habit.title}</h3>
                <p>{habit.description}</p>
              </div>
              <button
                onClick={() => toggleToday(habit.id)}
                className={`habit-button ${doneToday ? "completed" : "pending"}`}
              >
                {doneToday ? "완료!" : "오늘 체크"}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default HabitList;