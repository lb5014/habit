/**
 * 습관 목록을 표시하고 관리하는 컴포넌트
 * 
 * 습관 목록을 표시하고, 각 습관에 대해 다음 기능을 제공합니다:
 * - 오늘 완료 상태 토글
 * - 습관 수정 (인라인 편집)
 * - 습관 삭제
 * - 드롭다운 메뉴를 통한 액션 선택
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// React와 필요한 타입 import
import React, { useState } from "react";
import { Habit } from "../types/habit";
import CalendarView from "./CalendarView";

/**
 * HabitList 컴포넌트의 Props 타입 정의
 */
interface Props {
  habits: Habit[]; // 습관 목록
  toggleToday: (id: string) => void; // 오늘 완료 상태 토글 함수
  deleteHabit: (id: string) => void; // 습관 삭제 함수
  editHabit: (id: string, title: string, description: string, frequency: 'daily' | 'weekly') => void; // 습관 수정 함수
  onSelectHabit?: (id: string) => void; // 습관 선택 시 호출 (달성률 위젯 표시용)
}

/**
 * 습관 목록 컴포넌트
 * 
 * @param {Props} props - 컴포넌트 props
 * @returns {JSX.Element} 습관 목록 UI
 */
const HabitList = ({ habits, toggleToday, deleteHabit, editHabit, onSelectHabit }: Props) => {
  // 오늘 날짜를 YYYY-MM-DD 형식으로 생성
  const today = new Date().toISOString().split("T")[0];
  
  // 편집 상태 관리
  const [editingId, setEditingId] = useState(null); // 현재 편집 중인 습관의 ID
  const [editForm, setEditForm] = useState({ title: '', description: '', frequency: 'daily' }); // 편집 폼 데이터
  

  /**
   * 습관 편집을 시작하는 함수
   * 
   * @param {Habit} habit - 편집할 습관 객체
   */
  const startEdit = (habit) => {
    setEditingId(habit.id);
    setEditForm({
      title: habit.title,
      description: habit.description,
      frequency: habit.frequency
    });
  };

  /**
   * 습관 편집을 저장하는 함수
   */
  const saveEdit = () => {
    // 제목이 비어있지 않을 때만 저장
    if (editForm.title.trim()) {
      editHabit(editingId, editForm.title, editForm.description, editForm.frequency);
      setEditingId(null);
      setEditForm({ title: '', description: '', frequency: 'daily' });
    }
  };

  /**
   * 습관 편집을 취소하는 함수
   */
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', description: '', frequency: 'daily' });
  };


  return (
    <div className="habit-list">
      {/* 습관이 없는 경우 안내 메시지 표시 */}
      {habits.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
          <p>아직 등록된 습관이 없습니다. 새로운 습관을 추가해보세요!</p>
        </div>
      ) : (
        /* 습관 목록 렌더링 */
        habits.map((habit) => {
          const doneToday = habit.completedDates.includes(today); // 오늘 완료 여부 확인
          const isEditing = editingId === habit.id; // 현재 편집 중인 습관인지 확인

          return (
            <div key={habit.id} className="habit-item">
              <div onClick={() => onSelectHabit && onSelectHabit(habit.id)}>
                {/* 편집 모드일 때 표시되는 편집 폼 */}
                {isEditing ? (
                  <div className="habit-edit-form">
                    {/* 습관 제목 편집 필드 */}
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className="form-input"
                      placeholder="습관 이름"
                    />
                    
                    {/* 습관 설명 편집 필드 */}
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="form-input"
                      placeholder="설명"
                    />
                    
                    {/* 습관 빈도 편집 드롭다운 */}
                    <select
                      value={editForm.frequency}
                      onChange={(e) => setEditForm({...editForm, frequency: e.target.value})}
                      className="form-select"
                    >
                      <option value="daily">매일</option>
                      <option value="weekly">주간</option>
                    </select>
                    
                    {/* 편집 액션 버튼들 */}
                    <div className="edit-buttons">
                      <button onClick={saveEdit} className="form-button save-button">
                        저장
                      </button>
                      <button onClick={cancelEdit} className="form-button cancel-button">
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 일반 보기 모드 */
                  <>
                    {/* 습관 정보 섹션 */}
                    <div className="habit-info">
                      <h3>{habit.title}</h3>
                      <p>{habit.description}</p>
                      <span className="habit-frequency">{habit.frequency === 'daily' ? '매일' : '주간'}</span>
                    </div>
                    
                    {/* 습관 액션 버튼들 */}
                    <div className="habit-actions">
                      {/* 오늘 완료 상태 토글 버튼 */}
                      <button
                        onClick={() => toggleToday(habit.id)}
                        className={`habit-button ${doneToday ? "completed" : "pending"}`}
                      >
                        {doneToday ? "완료!" : "오늘 체크"}
                      </button>
                      
                      
                      {/* 드롭다운 메뉴 */}
                      <div className="dropdown">
                        <button className="dropdown-toggle">
                          ⋯
                        </button>
                        <div className="dropdown-menu">
                          {/* 수정 버튼 */}
                          <button onClick={() => startEdit(habit)} className="dropdown-item">
                            수정
                          </button>
                          {/* 삭제 버튼 */}
                          <button onClick={() => deleteHabit(habit.id)} className="dropdown-item delete">
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default HabitList;