// src/components/HabitItem.tsx
import React from "react";
import { Habit } from "../types/habit";

interface TeamMember {
  id: string;
  name: string;
}

interface Props {
  habit: Habit;
  members?: TeamMember[];          // 팀원이 있을 경우
  toggleToday: (habitId: string, memberId?: string) => void; // memberId 없으면 개인
}

const HabitItem: React.FC<Props> = ({ habit, members, toggleToday }) => {
  const today = new Date().toISOString().split("T")[0];

  // 개인 체크 여부
  const doneToday = habit.completedDates.includes(today);

  return (
    <div className="p-3 border rounded mb-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">{habit.title}</h3>
          <p className="text-sm text-gray-600">{habit.description}</p>
        </div>

        {!members && (
          <button
            onClick={() => toggleToday(habit.id)}
            className={`px-3 py-1 rounded ${
              doneToday ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            {doneToday ? "완료!" : "오늘 체크"}
          </button>
        )}
      </div>

      {/* 팀원 체크 */}
      {members && (
        <div className="mt-2">
          <h4 className="font-semibold mb-1">팀원 상태</h4>
          <div className="flex flex-wrap gap-2">
            {members.map((member) => {
              const memberDoneToday = habit.completedDates.includes(
                `${today}-${member.id}`
              ); // 팀원별 체크 구분
              return (
                <button
                  key={member.id}
                  onClick={() => toggleToday(habit.id, member.id)}
                  className={`px-2 py-1 rounded text-sm ${
                    memberDoneToday
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {member.name} {memberDoneToday ? "✅" : "❌"}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitItem;