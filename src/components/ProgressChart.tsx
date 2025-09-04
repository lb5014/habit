// src/components/ProgressChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import { Habit } from "../types/habit";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

interface Props {
  habits: Habit[];
}

const ProgressChart = ({ habits }: Props) => {
  const today = new Date().toISOString().split("T")[0];

  // 각 습관별 완료율 계산
  const labels = habits.map((habit) => habit.title);
  const dataValues = habits.map((habit) => {
    const totalDays =
      (new Date(today).getTime() - new Date(habit.startDate).getTime()) /
        (1000 * 60 * 60 * 24) +
      1;
    const completed = habit.completedDates.length;
    return Math.round((completed / totalDays) * 100);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "달성률 (%)",
        data: dataValues,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">습관 달성률</h2>
      {habits.length > 0 ? (
        <Line data={data} />
      ) : (
        <p style={{ textAlign: 'center', color: '#718096', padding: '2rem' }}>
          등록된 습관이 없습니다.
        </p>
      )}
    </div>
  );
};

export default ProgressChart;