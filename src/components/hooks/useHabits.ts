/**
 * 습관 관리를 위한 커스텀 훅
 * 
 * 이 훅은 습관 데이터의 CRUD 작업과 로컬 스토리지 동기화를 담당합니다.
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// React 훅과 필요한 타입, 유틸리티 함수들 import
import { useState, useEffect } from "react";
import { Habit } from "../../types/habit";
import { loadHabits, saveHabits } from "../../utils/storage";
import { v4 as uuidv4 } from "uuid";

/**
 * 습관 관리를 위한 커스텀 훅
 * 
 * @returns {Object} 습관 데이터와 관련 함수들
 * @returns {Habit[]} habits - 습관 목록
 * @returns {Function} addHabit - 습관 추가 함수
 * @returns {Function} toggleToday - 오늘 완료 상태 토글 함수
 * @returns {Function} deleteHabit - 습관 삭제 함수
 * @returns {Function} editHabit - 습관 수정 함수
 */
export function useHabits() {
  // 습관 목록 상태 관리
  const [habits, setHabits] = useState([]);

  /**
   * 컴포넌트 마운트 시 로컬 스토리지에서 습관 데이터 로드
   */
  useEffect(() => {
    setHabits(loadHabits());
  }, []);

  /**
   * 습관 데이터가 변경될 때마다 로컬 스토리지에 자동 저장
   */
  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  /**
   * 새로운 습관을 추가하는 함수
   * 
   * @param {string} title - 습관 제목
   * @param {string} description - 습관 설명
   * @param {'daily'|'weekly'} frequency - 습관 빈도 (매일/주간)
   */
  const addHabit = (title: string, description: string, frequency: 'daily' | 'weekly') => {
    const newHabit: Habit = {
      id: uuidv4(), // 고유 ID 생성
      title,
      description,
      frequency,
      startDate: new Date().toISOString(), // 시작 날짜를 현재 시간으로 설정
      completedDates: [], // 완료된 날짜 목록 (초기값: 빈 배열)
    };
    setHabits([...habits, newHabit]);
  };

  /**
   * 특정 습관의 오늘 완료 상태를 토글하는 함수
   * 
   * @param {string} id - 습관 ID
   */
  const toggleToday = (id: string) => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 오늘 날짜 생성
    
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const alreadyDone = habit.completedDates.includes(today);
        return {
          ...habit,
          // 이미 완료된 경우: 완료 목록에서 제거, 완료되지 않은 경우: 완료 목록에 추가
          completedDates: alreadyDone
            ? habit.completedDates.filter(date => date !== today)
            : [...habit.completedDates, today]
        };
      }
      return habit;
    }));
  };

  /**
   * 습관을 삭제하는 함수
   * 
   * @param {string} id - 삭제할 습관의 ID
   */
  const deleteHabit = (id: string) => {
    // 사용자 확인 후 삭제
    if (window.confirm("정말로 이 습관을 삭제하시겠습니까?")) {
      setHabits(habits.filter((habit) => habit.id !== id));
    }
  };

  /**
   * 습관 정보를 수정하는 함수
   * 
   * @param {string} id - 수정할 습관의 ID
   * @param {string} newTitle - 새로운 제목
   * @param {string} newDescription - 새로운 설명
   * @param {'daily'|'weekly'} newFrequency - 새로운 빈도
   */
  const editHabit = (id: string, newTitle: string, newDescription: string, newFrequency: 'daily' | 'weekly') => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          return {
            ...habit,
            title: newTitle,
            description: newDescription,
            frequency: newFrequency,
          };
        }
        return habit;
      })
    );
  };

  // 습관 데이터와 관련 함수들을 반환
  return { habits, addHabit, toggleToday, deleteHabit, editHabit };
}