import React, { useState, useEffect } from "react";
import { Schedule, DayOfWeek, Habit } from "../types/habit";

interface Props {
  addHabit?: (
    title: string,
    description: string,
    schedule: Schedule,
    notificationOn: boolean,
    notificationTime?: string
  ) => void;
  editHabit?: (
    id: string,
    title: string,
    description: string,
    schedule: Schedule,
    notificationOn: boolean,
    notificationTime?: string
  ) => void;
  initialData?: Habit;
  onSuccess?: () => void;
}

const HabitForm = ({ addHabit, editHabit, initialData, onSuccess }: Props) => {
  const isEditMode = !!initialData && !!editHabit;
  const habitId = initialData?.id;

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [scheduleType, setScheduleType] = useState<'daily' | 'weekly'>(
    initialData?.schedule.type || "daily"
  );
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>(
    initialData?.schedule.days || []
  );
  const [notificationOn, setNotificationOn] = useState(
    initialData?.notificationOn || false
  );
  const [notificationTime, setNotificationTime] = useState(
    initialData?.notificationTime || "09:00"
  );

  // initialData가 변경되면 폼 상태 업데이트
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
      setScheduleType(initialData.schedule.type);
      setSelectedDays(initialData.schedule.days || []);
      setNotificationOn(initialData.notificationOn);
      setNotificationTime(initialData.notificationTime || "09:00");
    }
  }, [initialData]);

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

    if (isEditMode && editHabit && habitId) {
      editHabit(habitId, title, description, schedule, notificationOn, notificationTime);
    } else if (addHabit) {
      addHabit(title, description, schedule, notificationOn, notificationTime);
      // 추가 모드일 때만 폼 초기화
      setTitle("");
      setDescription("");
      setScheduleType("daily");
      setSelectedDays([]);
      setNotificationOn(false);
    }

    // 성공 콜백 호출
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      {/* 습관 기본 정보 섹션 */}
      <div className="form-section">
        <div className="form-section-header">
          <h4>기본 정보</h4>
          <p>
            {isEditMode
              ? "습관의 이름과 설명을 수정하세요"
              : "새로운 습관의 이름과 설명을 입력하세요"}
          </p>
        </div>
        
        <div className="form-group">
          <label className="form-label">
            <span className="label-text">습관 이름</span>
            <span className="label-required">*</span>
          </label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="예: 아침 7시 기상, 물 2L 마시기, 운동 30분" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="label-text">설명 (선택)</span>
          </label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="습관에 대한 추가 설명이나 목표를 입력하세요" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
      </div>

      {/* 주기 설정 섹션 */}
      <div className="form-section">
        <div className="form-section-header">
          <h4>실행 주기</h4>
          <p>이 습관을 얼마나 자주 실행할지 선택하세요</p>
        </div>

        <div className="schedule-type-selector">
          <button
            type="button"
            className={`schedule-type-button ${scheduleType === 'daily' ? 'active' : ''}`}
            onClick={() => setScheduleType('daily')}
          >
            <div className="button-icon">📅</div>
            <div className="button-content">
              <span className="button-title">매일</span>
              <span className="button-description">매일 실행</span>
            </div>
          </button>

          <button
            type="button"
            className={`schedule-type-button ${scheduleType === 'weekly' ? 'active' : ''}`}
            onClick={() => setScheduleType('weekly')}
          >
            <div className="button-icon">📆</div>
            <div className="button-content">
              <span className="button-title">요일별</span>
              <span className="button-description">특정 요일에만</span>
            </div>
          </button>
        </div>
        
        {scheduleType === 'weekly' && (
          <div className="day-selector-container">
            <label className="form-label">실행 요일 선택</label>
            <div className="day-selector">
              {weekDays.map(day => (
                <button
                  type="button"
                  key={day.value}
                  onClick={() => handleDayClick(day.value)}
                  className={`day-button ${selectedDays.includes(day.value) ? 'selected' : ''}`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 알림 설정 섹션 */}
      <div className="form-section">
        <div className="form-section-header">
          <h4>알림 설정</h4>
          <p>습관 실행을 위한 알림을 설정하세요</p>
        </div>

        <div className="notification-setting">
          <div className="notification-toggle">
            <input 
              type="checkbox" 
              id={isEditMode ? `notification-toggle-${habitId}` : "notification-toggle"}
              className="custom-checkbox" 
              checked={notificationOn} 
              onChange={(e) => setNotificationOn(e.target.checked)} 
            />
            <label htmlFor={isEditMode ? `notification-toggle-${habitId}` : "notification-toggle"} className="notification-label">
              <span className="label-text">알림 받기</span>
              <span className="label-description">매일 알림을 받아서 습관을 잊지 않게 도와드려요</span>
            </label>
          </div>
          
          {notificationOn && (
            <div className="notification-time">
              <label className="form-label">알림 시간</label>
              <input 
                type="time" 
                className="form-input time-input" 
                value={notificationTime} 
                onChange={(e) => setNotificationTime(e.target.value)} 
              />
            </div>
          )}
        </div>
      </div>
      
      {/* 제출 버튼 */}
      <div className="form-actions">
        <button type="submit" className="form-button primary">
          <span className="button-icon">{isEditMode ? "💾" : "✨"}</span>
          <span>{isEditMode ? "습관 수정하기" : "습관 만들기"}</span>
        </button>
      </div>
    </form>
  );
};

export default HabitForm;