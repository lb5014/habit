// src/components/HabitForm.tsx
import React, { useState } from "react";
import { useHabits } from "../hooks/useHabits";

interface Props {
  addHabit: (title: string, description: string, frequency: 'daily' | 'weekly') => void;
}

const HabitForm = ({ addHabit }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!title) return;
    addHabit(title, description, frequency);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <div className="form-row">
        <input
          type="text"
          placeholder="습관 이름"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="설명 (선택)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
        />
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
          className="form-select"
        >
          <option value="daily">매일</option>
          <option value="weekly">주간</option>
        </select>
        <button type="submit" className="form-button">
          추가
        </button>
      </div>
    </form>
  );
};

export default HabitForm;