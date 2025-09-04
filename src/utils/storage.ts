// src/utils/storage.ts
import { Habit } from "../types/habit";

const STORAGE_KEY = "habits";

export function saveHabits(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

export function loadHabits(): Habit[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}