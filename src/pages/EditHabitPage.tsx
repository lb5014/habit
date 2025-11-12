import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHabits } from "../hooks/useHabits";
import { useToast } from "../hooks/useToast";
import HabitForm from "../components/HabitForm";
import ToastContainer from "../components/ToastContainer";
import "./EditHabitPage.css";

/**
 * 습관 수정 페이지 컴포넌트
 * 
 * URL 파라미터에서 habitId를 가져와 해당 습관을 수정할 수 있는 페이지입니다.
 */
const EditHabitPage: React.FC = () => {
  const { habitId } = useParams<{ habitId: string }>();
  const navigate = useNavigate();
  const { habits, editHabit } = useHabits();
  const { toasts, removeToast, showSuccess, showError } = useToast();

  // habitId로 습관 찾기
  const habit = habitId ? habits.find((h) => h.id === habitId) : undefined;

  // 습관을 찾을 수 없으면 홈으로 리다이렉트
  useEffect(() => {
    if (habitId && !habit && habits.length > 0) {
      showError(
        "습관을 찾을 수 없습니다",
        "요청하신 습관이 존재하지 않습니다."
      );
      navigate("/app");
    }
  }, [habitId, habit, habits, navigate, showError]);

  // 뒤로 가기 핸들러
  const handleGoBack = () => {
    navigate("/app");
  };

  // 습관 수정 핸들러
  const handleEditHabit = (
    id: string,
    title: string,
    description: string,
    schedule: any,
    notificationOn: boolean,
    notificationTime?: string
  ) => {
    try {
      editHabit(id, title, description, schedule, notificationOn, notificationTime);
      showSuccess(
        "습관이 수정되었습니다!",
        `${title} 습관이 성공적으로 수정되었어요.`
      );
    } catch (error) {
      showError(
        "습관 수정 실패",
        "습관을 수정하는 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  // 성공 후 홈으로 이동
  const handleSuccess = () => {
    navigate("/app");
  };

  // 로딩 중 또는 습관이 없을 때
  if (!habitId || (habits.length > 0 && !habit)) {
    return (
      <div className="edit-habit-page">
        <div className="edit-habit-header">
          <button onClick={handleGoBack} className="back-button">
            <span className="back-icon">←</span>
            뒤로 가기
          </button>
          <h1 className="edit-habit-title">습관 수정</h1>
        </div>
        <div className="edit-habit-content">
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>습관을 찾을 수 없습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  // 습관 데이터가 아직 로드되지 않았을 때
  if (habits.length === 0) {
    return (
      <div className="edit-habit-page">
        <div className="edit-habit-header">
          <button onClick={handleGoBack} className="back-button">
            <span className="back-icon">←</span>
            뒤로 가기
          </button>
          <h1 className="edit-habit-title">습관 수정</h1>
        </div>
        <div className="edit-habit-content">
          <div className="empty-state">
            <div className="empty-icon">⏳</div>
            <p>로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-habit-page">
      {/* 헤더 */}
      <div className="edit-habit-header">
        <button onClick={handleGoBack} className="back-button">
          <span className="back-icon">←</span>
          뒤로 가기
        </button>
        <h1 className="edit-habit-title">습관 수정</h1>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="edit-habit-content">
        <div className="habit-card">
          <div className="card-header">
            <h2>습관 수정</h2>
            <p>습관 정보를 수정하세요</p>
          </div>
          <HabitForm
            editHabit={handleEditHabit}
            initialData={habit}
            onSuccess={handleSuccess}
          />
        </div>
      </div>

      {/* 토스트 알림 컨테이너 */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
};

export default EditHabitPage;

