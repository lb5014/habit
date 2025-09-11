/**
 * 사용자별 습관 데이터 저장/로드 유틸리티 함수
 * 
 * 로컬 스토리지를 사용하여 사용자별로 습관 데이터를 저장하고 로드합니다.
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// 필요한 타입 import
import { Habit } from "../types/habit";

/**
 * 현재 로그인한 사용자의 습관 데이터를 로드하는 함수
 * 
 * @returns {Habit[]} 사용자의 습관 목록
 */
export function loadHabits(): Habit[] {
  try {
    // 현재 로그인한 사용자 정보 가져오기
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      return []; // 로그인하지 않은 경우 빈 배열 반환
    }
    
    const user = JSON.parse(currentUser);
    const userHabitsKey = `habits_${user.id}`;
    const habits = localStorage.getItem(userHabitsKey);
    
    return habits ? JSON.parse(habits) : [];
  } catch (error) {
    console.error("습관 데이터 로드 실패:", error);
    return [];
  }
}

/**
 * 현재 로그인한 사용자의 습관 데이터를 저장하는 함수
 * 
 * @param {Habit[]} habits - 저장할 습관 목록
 */
export function saveHabits(habits: Habit[]): void {
  try {
    // 현재 로그인한 사용자 정보 가져오기
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      console.warn("로그인하지 않은 상태에서는 습관 데이터를 저장할 수 없습니다.");
      return;
    }
    
    const user = JSON.parse(currentUser);
    const userHabitsKey = `habits_${user.id}`;
    localStorage.setItem(userHabitsKey, JSON.stringify(habits));
  } catch (error) {
    console.error("습관 데이터 저장 실패:", error);
  }
}

/**
 * 특정 사용자의 습관 데이터를 로드하는 함수
 * 
 * @param {string} userId - 사용자 ID
 * @returns {Habit[]} 해당 사용자의 습관 목록
 */
export function loadUserHabits(userId: string): Habit[] {
  try {
    const userHabitsKey = `habits_${userId}`;
    const habits = localStorage.getItem(userHabitsKey);
    return habits ? JSON.parse(habits) : [];
  } catch (error) {
    console.error("사용자 습관 데이터 로드 실패:", error);
    return [];
  }
}

/**
 * 특정 사용자의 습관 데이터를 저장하는 함수
 * 
 * @param {string} userId - 사용자 ID
 * @param {Habit[]} habits - 저장할 습관 목록
 */
export function saveUserHabits(userId: string, habits: Habit[]): void {
  try {
    const userHabitsKey = `habits_${userId}`;
    localStorage.setItem(userHabitsKey, JSON.stringify(habits));
  } catch (error) {
    console.error("사용자 습관 데이터 저장 실패:", error);
  }
}