import React, { useState } from "react";
import { Schedule, DayOfWeek } from "../types/habit";

interface Props {
  addHabit: (
    title: string,
    description: string,
    schedule: Schedule,
    notificationOn: boolean,
    notificationTime?: string
  ) => void;
}

const HabitForm = ({ addHabit }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduleType, setScheduleType] = useState<'daily' | 'weekly'>("daily");
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [notificationOn, setNotificationOn] = useState(false);
  const [notificationTime, setNotificationTime] = useState("09:00");

  const weekDays: { label: string; value: DayOfWeek }[] = [
    { label: "월", value: 1 }, { label: "화", value: 2 }, { label: "수", value: 3 },
    { label: "목", value: 4 }, { label: "금", value: 5 }, { label: "토", value: 6 }, { label: "일", value: 0 },
  ];

  const handleDayClick = (day: DayOfWeek) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (scheduleType === 'weekly' && selectedDays.length === 0) {
      alert("요일을 하나 이상 선택해주세요.");
      return;
    }

    const schedule: Schedule = scheduleType === 'daily'
      ? { type: 'daily' }
      : { type: 'weekly', days: selectedDays.sort() };

    addHabit(title, description, schedule, notificationOn, notificationTime);

    setTitle("");
    setDescription("");
    setScheduleType("daily");
    setSelectedDays([]);
    setNotificationOn(false);
  };

  return (
    // [수정됨] form-row 클래스를 사용하여 입력 필드를 가로로 배치
    <form onSubmit={handleSubmit} className="habit-form">
      <div className="form-row">
        {/* [수정됨] form-input 클래스 적용 */}
        <input type="text" className="form-input" placeholder="습관 이름 (예: 아침 7시 기상)" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" className="form-input" placeholder="설명 (선택)" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="form-group form-group-horizontal">
        {/* [수정됨] form-label 클래스 적용 */}
        <label className="form-label">주기:</label>
        {/* [수정됨] form-select 클래스 적용 */}
        <select className="form-select" value={scheduleType} onChange={(e) => setScheduleType(e.target.value as 'daily' | 'weekly')}>
          <option value="daily">매일</option>
          <option value="weekly">요일별</option>
        </select>
      </div>
      
      {scheduleType === 'weekly' && (
        <div className="day-selector">
          {weekDays.map(day => (
            // [수정됨] selection-button 클래스 적용
            <button
              type="button"
              key={day.value}
              onClick={() => handleDayClick(day.value)}
              className={`selection-button ${selectedDays.includes(day.value) ? 'active' : ''}`}
            >
              {day.label}
            </button>
          ))}
        </div>
      )}

      {/* 3단계: 알림 설정 */}
      <div className="form-group form-group-horizontal">
        <label className="form-label">알림:</label>
        
        {/* [수정됨] className="custom-checkbox" 추가 */}
        <input 
          type="checkbox" 
          className="custom-checkbox" 
          checked={notificationOn} 
          onChange={(e) => setNotificationOn(e.target.checked)} 
        />
        
        {notificationOn && (
          <input type="time" className="form-input" value={notificationTime} onChange={(e) => setNotificationTime(e.target.value)} />
        )}
      </div>
      
      {/* [수정됨] form-button 클래스 적용 (기존 submit-button -> form-button) */}
      <button type="submit" className="form-button">습관 추가</button>
    </form>
  );
};

export default HabitForm;