// src/hooks/useHabits.ts
import { useState, useEffect } from "react";
import { Habit } from "../types/habit";
import { loadHabits, saveHabits } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";

export function useHabits() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setHabits(loadHabits());
  }, []);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  const addHabit = (title: string, description: string, frequency: 'daily' | 'weekly') => {
    const newHabit: Habit = {
      id: uuidv4(),
      title,
      description,
      frequency,
      startDate: new Date().toISOString(),
      completedDates: [],
    };
    setHabits([...habits, newHabit]);
  };

  const toggleToday = (id: string) => {
    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const alreadyDone = habit.completedDates.includes(today);
        return {
          ...habit,
          completedDates: alreadyDone
            ? habit.completedDates.filter(date => date !== today)
            : [...habit.completedDates, today]
        };
      }
      return habit;
    }));
  };

  return { habits, addHabit, toggleToday };
}