import { useState, useEffect } from "react";
import { Habit, Schedule } from "../types/habit"; 
import { db } from "../firebase"; 
import { ref, onValue, set, push, remove, update } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";

export function useHabits() {
  const { user } = useAuth(); 
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    if (!user) {
      setHabits([]);
      return;
    }

    const habitsRef = ref(db, `habits/${user.uid}`);
    
    const unsubscribe = onValue(habitsRef, (snapshot) => {
      const data = snapshot.val();

      // [수정됨] Firebase는 빈 배열을 저장하지 않으므로,
      // completedDates가 없을 경우(undefined)를 대비해 항상 빈 배열로 초기화해줍니다.
      const loadedHabits = data ? Object.keys(data).map(key => {
        const habitData = data[key];
        return {
          id: key,
          ...habitData,
          completedDates: habitData.completedDates || [], 
        };
      }) : [];
      
      setHabits(loadedHabits);
    });

    return () => unsubscribe();
  }, [user]);

  const addHabit = (
    title: string,
    description: string,
    schedule: Schedule,
    notificationOn: boolean,
    notificationTime?: string
  ) => {
    if (!user) {
      console.warn("로그인하지 않은 상태에서는 습관 데이터를 저장할 수 없습니다.");
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
    const habitToUpdate = habits.find(h => h.id === id);
    if (!habitToUpdate) return;
    
    const habitRef = ref(db, `habits/${user.uid}/${id}`);
    // 이 부분은 이미 안전하게 처리되어 있었지만, 로드 시 처리하는 것이 더 근본적인 해결책입니다.
    const completedDates = habitToUpdate.completedDates || [];
    const alreadyDone = completedDates.includes(today);

    const updatedDates = alreadyDone
      ? completedDates.filter(date => date !== today)
      : [...completedDates, today];
      
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