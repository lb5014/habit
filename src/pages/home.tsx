// src/pages/Home.tsx
import React, { useState } from "react";
import { useHabits } from "../hooks/useHabits";
import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
import ProgressChart from "../components/ProgressChart";
import CalendarView from "../components/CalendarView";

const Home = () => {
  const { habits, addHabit, toggleToday } = useHabits();
  const [selectedHabitId, setSelectedHabitId] = useState(null);

  const selectedHabit = habits.find((h) => h.id === selectedHabitId);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">습관 추적기</h1>
      <HabitForm addHabit={addHabit} />
      <HabitList habits={habits} toggleToday={toggleToday} />

      {/* 차트 */}
      <ProgressChart habits={habits} />

      {/* 선택된 습관 달력 뷰 */}
      {selectedHabit && <CalendarView habit={selectedHabit} />}

      {/* 습관 선택 버튼 */}
      {habits.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold mb-2">달력 보기</h2>
          {habits.map((habit) => (
            <button
              key={habit.id}
              onClick={() => setSelectedHabitId(habit.id)}
              className="px-3 py-1 border rounded mr-2 mb-2 hover:bg-blue-100"
            >
              {habit.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;