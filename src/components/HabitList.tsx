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
        <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
          <p>아직 등록된 습관이 없습니다. 새로운 습관을 추가해보세요!</p>
        </div>
      ) : (
        habits.map((habit) => {
          const doneToday = habit.completedDates.includes(today);
          const isEditing = editingId === habit.id;

          return (
            <div key={habit.id} className="habit-item">
              {isEditing ? (
                <div className="habit-edit-form">
                  {/* ... 수정 폼 UI는 기존과 동일 ... */}
                  <input type="text" value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} />
                  {/* ... */}
                  <div className="edit-buttons">
                    <button onClick={saveEdit}>저장</button>
                    <button onClick={cancelEdit}>취소</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="habit-info" onClick={() => onSelectHabit && onSelectHabit(habit.id)}>
                    <h3>{habit.title}</h3>
                    <p>{habit.description}</p>
                    <div className="frequency-section">
                      <span className="habit-frequency">{formatSchedule(habit.schedule)}</span>
                    </div>
                  </div>
                  
                  <div className="habit-actions">
                    <button onClick={() => toggleToday(habit.id)} className={`habit-button ${doneToday ? "completed" : "pending"}`}>
                      {doneToday ? "완료!" : "오늘 체크"}
                    </button>
                    
                    <div className="dropdown">
                      {/* [수정됨] onClick 이벤트 핸들러 추가 */}
                      <button onClick={() => handleToggleDropdown(habit.id)} className="dropdown-toggle">⋯</button>
                      
                      {/* [수정됨] openDropdownId 상태에 따라 'open' 클래스를 동적으로 추가 */}
                      <div className={`dropdown-menu ${openDropdownId === habit.id ? 'open' : ''}`}>
                        <button onClick={() => { startEdit(habit); setOpenDropdownId(null); }} className="dropdown-item">수정</button>
                        <button onClick={() => deleteHabit(habit.id)} className="dropdown-item delete">삭제</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default HabitList;