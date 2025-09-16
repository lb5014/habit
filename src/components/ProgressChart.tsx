/**
 * 습관 달성률을 시각화하는 원형 차트 컴포넌트
 * 
 * Chart.js와 react-chartjs-2를 사용하여 습관별 달성률을 
 * 원형 차트(도넛 차트) 형태로 표시합니다.
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// React와 Chart.js 관련 라이브러리 import
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Habit } from "../types/habit";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Chart.js에 필요한 컴포넌트들 등록
ChartJS.register(ArcElement, Tooltip, Legend, Title);

/**
 * ProgressChart 컴포넌트의 Props 타입 정의
 */
interface Props {
  habits: Habit[]; // 습관 목록
}

/**
 * 습관 달성률 원형 차트 컴포넌트
 * 
 * @param {Props} props - 컴포넌트 props
 * @returns {JSX.Element} 습관 달성률 원형 차트 UI
 */
const ProgressChart = ({ habits }: Props) => {
  // 오늘 날짜를 YYYY-MM-DD 형식으로 생성
  const today = new Date().toISOString().split("T")[0];

  /**
   * 각 습관별 달성률을 계산하는 함수
   * 하루를 최대 100%로 설정하여 완료된 날짜 수만큼 퍼센트 표시
   */
  const labels = habits.map((habit) => habit.title); // 차트의 라벨 (습관 제목들)
  const dataValues = habits.map((habit) => {
    const completed = habit.completedDates.length; // 완료된 날짜 수
    return completed; // 완료된 날짜 수를 그대로 사용 (하루 = 100%)
  });

  // 원형 차트용 색상 배열
  const backgroundColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 205, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(199, 199, 199, 0.8)',
    'rgba(83, 102, 255, 0.8)',
  ];

  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 205, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(199, 199, 199, 1)',
    'rgba(83, 102, 255, 1)',
  ];

  // Chart.js에 전달할 데이터 객체
  const data = {
    labels: labels.map((label, index) => `${label} (${dataValues[index]}일)`), // 습관 제목과 완료 일수 표시
    datasets: [
      {
        label: "완료 일수", // 범례 라벨
        data: dataValues, // 완료된 날짜 수
        backgroundColor: backgroundColors.slice(0, habits.length), // 습관 수만큼 색상 사용
        borderColor: borderColors.slice(0, habits.length), // 테두리 색상
        borderWidth: 2, // 테두리 두께
      },
    ],
  };

  // 차트 옵션 설정
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value}일 완료`;
          }
        }
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">습관 완료 현황</h2>
      {/* 습관이 있는 경우 원형 차트 표시, 없는 경우 안내 메시지 표시 */}
      {habits.length > 0 ? (
        <div style={{ height: '250px', width: '100%' }}>
          <Doughnut data={data} options={options} />
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#718096', padding: '1rem' }}>
          등록된 습관이 없습니다.
        </p>
      )}
    </div>
  );
};

export default ProgressChart;