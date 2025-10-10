/**
 * 요일 타입을 정의합니다.
 * JavaScript의 Date.getDay() 메서드와 일치시킵니다. (0: 일요일, 1: 월요일, ..., 6: 토요일)
 */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * 습관의 실행 주기(스케줄) 타입을 정의합니다.
 * - 'daily': 매일 실행
 * - 'weekly': 특정 요일에만 실행
 */
export interface Schedule {
  type: 'daily' | 'weekly';
  days?: DayOfWeek[]; // 'weekly' 타입일 경우, 실행할 요일 배열 (예: [1, 3, 5] -> 월, 수, 금)
}

/**
 * 습관(Habit)의 전체 데이터 구조를 정의합니다.
 */
export interface Habit {
  id: string;
  title: string;
  description: string;
  
  // 유연한 주기 설정을 위한 스케줄 객체
  schedule: Schedule;
  
  // 알림 기능 관련 속성
  notificationOn: boolean;
  notificationTime?: string; // 알림 시간 (예: "09:00"), 선택적(optional)
  
  // 습관 기록 관련 속성
  startDate: string;         // 습관 시작일 (ISO 8601 형식)
  completedDates: string[];  // 완료한 날짜 목록 (예: ["2025-10-10", "2025-10-11"])
}