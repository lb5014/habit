/**
 * 습관 달성률을 시각화하는 차트 컴포넌트
 * 
 * Chart.js와 react-chartjs-2를 사용하여 습관별 달성률을 
 * 막대 차트 형태로 표시합니다.
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// React와 Chart.js 관련 라이브러리 import
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

// Chart.js에 필요한 컴포넌트들 등록
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

/**
 * ProgressChart 컴포넌트의 Props 타입 정의
 */
interface Props {
  habits: Habit[]; // 습관 목록
}

/**
 * 습관 달성률 차트 컴포넌트
 * 
 * @param {Props} props - 컴포넌트 props
 * @returns {JSX.Element} 습관 달성률 차트 UI
 */
const ProgressChart = ({ habits }: Props) => {
  // 오늘 날짜를 YYYY-MM-DD 형식으로 생성
  const today = new Date().toISOString().split("T")[0];

  /**
   * 각 습관별 달성률을 계산하는 함수
   * 달성률 = (완료된 날짜 수 / 총 경과 일수) * 100
   */
  const labels = habits.map((habit) => habit.title); // 차트의 X축 라벨 (습관 제목들)
  const dataValues = habits.map((habit) => {
    // 습관 시작일부터 오늘까지의 총 일수 계산
    const totalDays =
      (new Date(today).getTime() - new Date(habit.startDate).getTime()) /
        (1000 * 60 * 60 * 24) + 1; // 밀리초를 일수로 변환하고 1을 더함 (시작일 포함)
    
    const completed = habit.completedDates.length; // 완료된 날짜 수
    return Math.round((completed / totalDays) * 100); // 달성률 계산 (소수점 반올림)
  });

  // Chart.js에 전달할 데이터 객체
  const data = {
    labels, // X축 라벨
    datasets: [
      {
        label: "달성률 (%)", // 범례 라벨
        data: dataValues, // Y축 데이터 (달성률 값들)
        borderColor: "rgb(75, 192, 192)", // 선 색상
        backgroundColor: "rgba(75, 192, 192, 0.4)", // 배경 색상 (투명도 포함)
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">습관 달성률</h2>
      {/* 습관이 있는 경우 차트 표시, 없는 경우 안내 메시지 표시 */}
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