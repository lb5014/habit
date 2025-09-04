// src/App.tsx
import React, { useState, useEffect } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import ProgressChart from "./components/ProgressChart";
import CalendarView from "./components/CalendarView";
import { Habit } from "./types/habit";
import { loadHabits, saveHabits } from "./utils/storage";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const App = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabitId, setSelectedHabitId] = useState(null);

  useEffect(() => {
    setHabits(loadHabits());
  }, []);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  const addHabit = (title, description, frequency) => {
    const newHabit = {
      id: uuidv4(),
      title,
      description,
      frequency,
      startDate: new Date().toISOString(),
      completedDates: [],
    };
    setHabits([...habits, newHabit]);
  };

  const toggleToday = (id) => {
    const today = new Date().toISOString().split("T")[0];
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const alreadyDone = habit.completedDates.includes(today);
          return {
            ...habit,
            completedDates: alreadyDone
              ? habit.completedDates.filter((date) => date !== today)
              : [...habit.completedDates, today],
          };
        }
        return habit;
      })
    );
  };

  const selectedHabit = habits.find((h) => h.id === selectedHabitId);

  return (
    <div className="habit-tracker">
      <div className="habit-header">
        <h1 className="habit-title">습관 추적기</h1>
        <p className="habit-subtitle">매일의 작은 습관이 큰 변화를 만듭니다</p>
      </div>

      {/* 습관 추가 */}
      <div className="habit-card">
        <HabitForm addHabit={addHabit} />
      </div>

      {/* 습관 리스트 */}
      <div className="habit-card">
        <HabitList habits={habits} toggleToday={toggleToday} />
      </div>

      {/* 달성률 차트 */}
      <div className="habit-card">
        <ProgressChart habits={habits} />
      </div>

      {/* 선택된 습관 캘린더 */}
      {selectedHabit && (
        <div className="habit-card">
          <CalendarView habit={selectedHabit} />
        </div>
      )}

      {/* 캘린더 선택 버튼 */}
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

export default App;