import React, { useState } from "react";
import { Habit, Schedule, DayOfWeek } from "../types/habit";

interface Props {
  habits: Habit[];
  toggleToday: (id: string) => void;
  deleteHabit: (id: string) => void;
  editHabit: (
    id: string,
    title: string,
    description: string,
    schedule: Schedule,
    notificationOn: boolean,
    notificationTime?: string
  ) => void;
  onSelectHabit?: (id: string) => void;
}

const HabitList = ({ habits, toggleToday, deleteHabit, editHabit, onSelectHabit }: Props) => {
  const today = new Date().toISOString().split("T")[0];
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // [추가] 현재 열려있는 드롭다운 메뉴의 ID를 저장하는 상태
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    scheduleType: 'daily' as 'daily' | 'weekly',
    selectedDays: [] as DayOfWeek[],
    notificationOn: false,
    notificationTime: '09:00',
  });

  const weekDays: { label: string; value: DayOfWeek }[] = [
    { label: "월", value: 1 }, { label: "화", value: 2 }, { label: "수", value: 3 },
    { label: "목", value: 4 }, { label: "금", value: 5 }, { label: "토", value: 6 }, { label: "일", value: 0 },
  ];
  
  const formatSchedule = (schedule: Schedule) => {
    if (!schedule) return ''; // schedule이 없을 경우를 대비
    if (schedule.type === 'daily') return '매일';
    if (schedule.type === 'weekly' && schedule.days) {
      const sortedDays = [...schedule.days].sort();
      const dayLabels = sortedDays.map(dayValue => {
        return weekDays.find(d => d.value === dayValue)?.label || '';
      });
      return `매주 ${dayLabels.join(', ')}`;
    }
    return '';
  };

  const startEdit = (habit: Habit) => {
    setEditingId(habit.id);
    setEditForm({
      title: habit.title,
      description: habit.description,
      scheduleType: habit.schedule.type,
      selectedDays: habit.schedule.days || [],
      notificationOn: habit.notificationOn,
      notificationTime: habit.notificationTime || '09:00',
    });
  };

  const saveEdit = () => {
    if (editingId && editForm.title.trim()) {
      const schedule: Schedule = editForm.scheduleType === 'daily'
        ? { type: 'daily' }
        : { type: 'weekly', days: editForm.selectedDays.sort() };

      editHabit(
        editingId,
        editForm.title,
        editForm.description,
        schedule,
        editForm.notificationOn,
        editForm.notificationTime
      );
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      title: '', description: '', scheduleType: 'daily',
      selectedDays: [], notificationOn: false, notificationTime: '09:00'
    });
  };
  
  const handleDayClickInEdit = (day: DayOfWeek) => {
    setEditForm(prev => {
      const newDays = prev.selectedDays.includes(day)
        ? prev.selectedDays.filter(d => d !== day)
        : [...prev.selectedDays, day];
      return { ...prev, selectedDays: newDays };
    });
  };

  // [추가] 드롭다운 메뉴를 열고 닫는 것을 처리하는 함수
  const handleToggleDropdown = (habitId: string) => {
    setOpenDropdownId(prevId => (prevId === habitId ? null : habitId));
  };

  return (
    <div className="habit-list">
      {habits.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <p>아직 등록된 습관이 없습니다.</p>
          <p>새로운 습관을 추가해보세요!</p>
        </div>
      ) : (
        habits.map((habit) => {
          const doneToday = habit.completedDates.includes(today);
          const isEditing = editingId === habit.id;
          const completedDates = habit.completedDates || [];
          const streakCount = completedDates.length;

          return (
            <div key={habit.id} className={`habit-item ${doneToday ? 'completed' : ''}`}>
              <div className="habit-item-content">
                {isEditing ? (
                  <div className="habit-edit-form">
                    <div className="edit-form-header">
                      <h4>습관 수정</h4>
                    </div>
                    
                    <div className="edit-form-content">
                      <div className="form-group">
                        <label className="form-label">
                          <span className="label-text">습관 이름</span>
                          <span className="label-required">*</span>
                        </label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={editForm.title} 
                          onChange={(e) => setEditForm({...editForm, title: e.target.value})} 
                          required 
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <span className="label-text">설명</span>
                        </label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={editForm.description} 
                          onChange={(e) => setEditForm({...editForm, description: e.target.value})} 
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <span className="label-text">실행 주기</span>
                        </label>
                        <div className="schedule-type-selector">
                          <button
                            type="button"
                            className={`schedule-type-button ${editForm.scheduleType === 'daily' ? 'active' : ''}`}
                            onClick={() => setEditForm({...editForm, scheduleType: 'daily'})}
                          >
                            <div className="button-icon">📅</div>
                            <div className="button-content">
                              <span className="button-title">매일</span>
                            </div>
                          </button>
                          <button
                            type="button"
                            className={`schedule-type-button ${editForm.scheduleType === 'weekly' ? 'active' : ''}`}
                            onClick={() => setEditForm({...editForm, scheduleType: 'weekly'})}
                          >
                            <div className="button-icon">📆</div>
                            <div className="button-content">
                              <span className="button-title">요일별</span>
                            </div>
                          </button>
                        </div>
                        
                        {editForm.scheduleType === 'weekly' && (
                          <div className="day-selector">
                            {weekDays.map(day => (
                              <button
                                type="button"
                                key={day.value}
                                onClick={() => handleDayClickInEdit(day.value)}
                                className={`day-button ${editForm.selectedDays.includes(day.value) ? 'selected' : ''}`}
                              >
                                {day.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="edit-form-actions">
                      <button onClick={saveEdit} className="form-button primary">
                        <span className="button-icon">💾</span>
                        <span>저장</span>
                      </button>
                      <button onClick={cancelEdit} className="form-button secondary">
                        <span className="button-icon">❌</span>
                        <span>취소</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="habit-info" onClick={() => onSelectHabit && onSelectHabit(habit.id)}>
                      <div className="habit-header">
                        <div className="habit-title-section">
                          <h3 className="habit-name">{habit.title}</h3>
                          {habit.description && (
                            <p className="habit-description">{habit.description}</p>
                          )}
                        </div>
                        <div className="habit-status">
                          <div className={`status-indicator ${doneToday ? 'completed' : 'pending'}`}>
                            {doneToday ? '✅' : '⏳'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="habit-details">
                        <div className="habit-meta">
                          <div className="habit-frequency">
                            <span className="meta-icon">📅</span>
                            <span className="meta-text">{formatSchedule(habit.schedule)}</span>
                          </div>
                          <div className="habit-streak">
                            <span className="meta-icon">🔥</span>
                            <span className="meta-text">{streakCount}일 연속</span>
                          </div>
                          {habit.notificationOn && (
                            <div className="habit-notification">
                              <span className="meta-icon">🔔</span>
                              <span className="meta-text">{habit.notificationTime}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="habit-actions">
                      <button 
                        onClick={() => toggleToday(habit.id)} 
                        className={`habit-action-button ${doneToday ? "completed" : "pending"}`}
                      >
                        <span className="button-icon">
                          {doneToday ? "✅" : "⏳"}
                        </span>
                        <span className="button-text">
                          {doneToday ? "완료!" : "오늘 체크"}
                        </span>
                      </button>
                      
                      <div className="habit-menu">
                        <button 
                          onClick={() => handleToggleDropdown(habit.id)} 
                          className="menu-toggle"
                          aria-label="메뉴 열기"
                        >
                          <span className="menu-icon">⋯</span>
                        </button>
                        
                        <div className={`menu-dropdown ${openDropdownId === habit.id ? 'open' : ''}`}>
                          <button 
                            onClick={() => { startEdit(habit); setOpenDropdownId(null); }} 
                            className="menu-item edit"
                          >
                            <span className="menu-item-icon">✏️</span>
                            <span className="menu-item-text">수정</span>
                          </button>
                          <button 
                            onClick={() => deleteHabit(habit.id)} 
                            className="menu-item delete"
                          >
                            <span className="menu-item-icon">🗑️</span>
                            <span className="menu-item-text">삭제</span>
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