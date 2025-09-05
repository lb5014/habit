/**
 * 습관 추가를 위한 폼 컴포넌트
 * 
 * 사용자가 새로운 습관을 추가할 수 있는 입력 폼을 제공합니다.
 * 습관 제목, 설명, 빈도를 입력받아 상위 컴포넌트로 전달합니다.
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// React와 필요한 훅 import
import React, { useState } from "react";
import { useHabits } from "../hooks/useHabits";

/**
 * HabitForm 컴포넌트의 Props 타입 정의
 */
interface Props {
  addHabit: (title: string, description: string, frequency: 'daily' | 'weekly') => void;
}

/**
 * 습관 추가 폼 컴포넌트
 * 
 * @param {Props} props - 컴포넌트 props
 * @param {Function} props.addHabit - 습관 추가 함수
 * @returns {JSX.Element} 습관 추가 폼 UI
 */
const HabitForm = ({ addHabit }: Props) => {
  // 폼 입력 상태 관리
  const [title, setTitle] = useState(""); // 습관 제목
  const [description, setDescription] = useState(""); // 습관 설명
  const [frequency, setFrequency] = useState("daily"); // 습관 빈도 (기본값: 매일)

  /**
   * 폼 제출 처리 함수
   * 
   * @param {any} e - 폼 제출 이벤트
   */
  const handleSubmit = (e: any) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    
    // 제목이 비어있으면 제출하지 않음
    if (!title) return;
    
    // 습관 추가
    addHabit(title, description, frequency);
    
    // 폼 초기화
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <div className="form-row">
        {/* 습관 제목 입력 필드 */}
        <input
          type="text"
          placeholder="습관 이름"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
        
        {/* 습관 설명 입력 필드 */}
        <input
          type="text"
          placeholder="설명 (선택)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
        />
        
        {/* 습관 빈도 선택 드롭다운 */}
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
          className="form-select"
        >
          <option value="daily">매일</option>
          <option value="weekly">주간</option>
        </select>
        
        {/* 습관 추가 버튼 */}
        <button type="submit" className="form-button">
          추가
        </button>
      </div>
    </form>
  );
};

export default HabitForm;