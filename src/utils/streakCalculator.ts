// src/utils/streakCalculator.ts
import { Habit, DayOfWeek, Schedule } from '../types/habit';
import { format, subDays, getDay } from 'date-fns';

/**
 * 특정 날짜가 습관 실행일로 예약된 날인지 확인하는 헬퍼 함수
 */
const isScheduledDay = (schedule: Schedule, date: Date): boolean => {
  const dayOfWeek = getDay(date) as DayOfWeek; // 0: Sun, 1: Mon...

  if (schedule.type === 'daily') {
    return true;
  }
  if (schedule.type === 'weekly' && schedule.days) {
    return schedule.days.includes(dayOfWeek);
  }
  return false;
};

/**
 * 실제 연속 달성일(Streak)을 계산하는 함수
 */
export const calculateStreak = (habit: Habit): number => {
  const { schedule, completedDates } = habit;
  if (!completedDates || completedDates.length === 0) {
    return 0;
  }

  // 1. 빠른 조회를 위해 Set으로 변환
  const completedSet = new Set(completedDates);
  let currentStreak = 0;
  
  // 2. 오늘부터 최대 1년(365일)까지 거슬러 올라가며 확인
  for (let i = 0; i < 365; i++) {
    const dateToScan = subDays(new Date(), i);
    const dateStr = format(dateToScan, 'yyyy-MM-dd');

    // 3. 이 날짜가 습관 실행일로 예약된 날인지 확인
    if (isScheduledDay(schedule, dateToScan)) {
      
      // 4. 예약된 날인데, 완료했는지 확인
      if (completedSet.has(dateStr)) {
        // 완료했으면: 스트릭 1일 추가
        currentStreak++;
      } else {
        // 완료하지 않았으면:
        // (단, 오늘(i=0)은 아직 안 한 것일 수 있으니 스트릭을 깨지 않음)
        if (i > 0) {
          // 어제 또는 그 이전의 예약된 날을 놓친 것이므로 스트릭 중단
          break;
        }
      }
    }
    // (예약된 날이 아니면 (예: M/W/F 습관의 화요일) 그냥 건너뜀)
  }

  return currentStreak;
};