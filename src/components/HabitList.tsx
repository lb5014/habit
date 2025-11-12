import React from "react";
import { Habit } from "../types/habit";
import HabitItem from "./HabitItem";

interface Props {
  habits: Habit[];
  toggleToday: (id: string) => void;
  deleteHabit: (id: string) => void;
  onSelectHabit?: (id: string) => void;
}

const HabitList = ({
  habits,
  toggleToday,
  deleteHabit,
  onSelectHabit,
}: Props) => {
  return (
    <div className="habit-list">
      {habits.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <p>아직 등록된 습관이 없습니다.</p>
          <p>새로운 습관을 추가해보세요!</p>
        </div>
      ) : (
        habits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            toggleToday={toggleToday}
            deleteHabit={deleteHabit}
            onSelectHabit={onSelectHabit}
          />
        ))
      )}
    </div>
  );
};

export default HabitList;
