import { useState, useEffect, useRef } from "react";
import { Habit, Schedule } from "../types/habit";
import { db } from "../firebase";
import { ref, onValue, set, push, remove, update } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
import { showNotification } from "../utils/notifications";

export function useHabits() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const notificationTimerIdsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!user) {
      setHabits([]);
      notificationTimerIdsRef.current.forEach((timerId) =>
        clearTimeout(timerId)
      );
      notificationTimerIdsRef.current = [];
      return;
    }

    const habitsRef = ref(db, `habits/${user.uid}`);

    const unsubscribe = onValue(habitsRef, (snapshot) => {
      const data = snapshot.val();

      // [수정됨] Firebase는 빈 배열을 저장하지 않으므로,
      // completedDates가 없을 경우(undefined)를 대비해 항상 빈 배열로 초기화해줍니다.
      const loadedHabits = data
        ? Object.keys(data).map((key) => {
            const habitData = data[key];
            return {
              id: key,
              ...habitData,
              completedDates: habitData.completedDates || [],
            };
          })
        : [];

      setHabits(loadedHabits);

      // 4. 기존 타이머를 ref에서 읽어와 모두 취소
      notificationTimerIdsRef.current.forEach((timerId) =>
        clearTimeout(timerId)
      );

      // 5. ref를 비웁니다. (새 타이머로 채울 준비)
      notificationTimerIdsRef.current = [];

      const now = new Date();

      loadedHabits.forEach((habit) => {
        if (habit.notificationOn && habit.notificationTime) {
          const [hours, minutes] = habit.notificationTime
            .split(":")
            .map(Number);
          const notificationDateTime = new Date();
          notificationDateTime.setHours(hours, minutes, 0, 0);

          if (now < notificationDateTime) {
            const msUntilNotify =
              notificationDateTime.getTime() - now.getTime();

            const timerId = setTimeout(() => {
              showNotification(
                "습관 실천할 시간이에요! 💡",
                `오늘은 "${habit.title}" 하는 날입니다. 잊지 마세요!`
              );
            }, msUntilNotify);

            // 6. 상태(setState) 대신 ref에 직접 타이머 ID를 추가
            notificationTimerIdsRef.current.push(timerId);
          }
        }
      });
      // --- 👆 알림 예약 로직 끝 ---
    });

    return () => {
      // 7. 컴포넌트가 언마운트되면 ref에 저장된 모든 타이머를 취소
      notificationTimerIdsRef.current.forEach((timerId) =>
        clearTimeout(timerId)
      );
      unsubscribe();
    };

    // 8. 의존성 배열에서 notificationTimers를 제거 (무한 루프 방지)
  }, [user]);

  const addHabit = (
    title: string,
    description: string,
    schedule: Schedule,
    notificationOn: boolean,
    notificationTime?: string
  ) => {
    if (!user) {
      console.warn(
        "로그인하지 않은 상태에서는 습관 데이터를 저장할 수 없습니다."
      );
      return;
    }
    const habitsRef = ref(db, `habits/${user.uid}`);
    const newHabitRef = push(habitsRef);

    const newHabitData = {
      title,
      description,
      schedule,
      notificationOn,
      notificationTime,
      startDate: new Date().toISOString(),
      completedDates: [], // 저장 시에는 빈 배열로 보내는 것이 맞습니다.
    };

    set(newHabitRef, newHabitData);
  };

  const editHabit = (
    id: string,
    newTitle: string,
    newDescription: string,
    newSchedule: Schedule,
    newNotificationOn: boolean,
    newNotificationTime?: string
  ) => {
    if (!user) return;
    update(ref(db, `habits/${user.uid}/${id}`), {
      title: newTitle,
      description: newDescription,
      schedule: newSchedule,
      notificationOn: newNotificationOn,
      notificationTime: newNotificationTime,
    });
  };

  const toggleToday = (id: string) => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];
    const habitToUpdate = habits.find((h) => h.id === id);
    if (!habitToUpdate) return;

    const habitRef = ref(db, `habits/${user.uid}/${id}`);
    // 이 부분은 이미 안전하게 처리되어 있었지만, 로드 시 처리하는 것이 더 근본적인 해결책입니다.
    const completedDates = habitToUpdate.completedDates || [];
    const alreadyDone = completedDates.includes(today);

    const updatedDates = alreadyDone
      ? completedDates.filter((date) => date !== today)
      : [...completedDates, today];

    // [수정된 알림 로직]
    // isDone (완료 여부)에 따라 분기
    const isDone = !alreadyDone;

    update(habitRef, { completedDates: updatedDates });
  };

  const deleteHabit = (id: string) => {
    if (!user) return;
    if (window.confirm("정말로 이 습관을 삭제하시겠습니까?")) {
      remove(ref(db, `habits/${user.uid}/${id}`));
    }
  };

  return { habits, addHabit, toggleToday, deleteHabit, editHabit };
}
