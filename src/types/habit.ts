// src/types/habit.ts
export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  startDate: string;   // ISO string
  endDate?: string;    // optional
  completedDates: string[]; // 완료한 날짜 리스트
}