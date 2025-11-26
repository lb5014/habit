import React from "react";
import { Link } from "react-router-dom";
import "./FeaturesPage.css";

const featureHighlights = [
  {
    title: "스마트 습관 등록",
    subtitle: "하고 싶은 일을 구체적인 행동으로 바꿔요",
    description:
      "습관 이름, 한 줄 설명, 반복 주기를 한 번에 설정하고 필요하면 푸시 알림까지 켤 수 있어요. 매일 혹은 요일별로 반복을 선택해 상황에 맞춘 루틴을 만들 수 있습니다.",
    bullets: [
      "매일 / 요일별 반복 주기 선택",
      "설명과 메모를 추가해 의도를 분명하게 기록",
      "알림 시간 지정으로 놓치지 않고 체크",
    ],
  },
  {
    title: "원터치 체크와 토스트 알림",
    subtitle: "그날의 성취를 바로 확인",
    description:
      "습관 카드에서 버튼 한 번으로 완료 여부를 기록하면 상단 토스트로 완료 메시지가 나타나 동기 부여를 도와줍니다. 실수로 눌러도 취소가 가능해요.",
    bullets: [
      "완료 / 취소 모두 한 번의 클릭",
      "성공·실패 메시지로 즉각적인 피드백",
      "오늘 날짜 기준으로 자동 기록",
    ],
  },
  {
    title: "오늘의 달성률 & 통계",
    subtitle: "숫자로 확인하는 꾸준함",
    description:
      "오늘 진행 예정인 습관만 걸러서 완료 개수와 퍼센티지를 계산해줘요. 대시보드에서 전체 현황을 확인하고 부족한 부분을 바로 파악할 수 있습니다.",
    bullets: [
      "오늘 일정에 잡힌 습관만 자동 계산",
      "완료 / 전체 개수와 %를 동시에 표시",
      "Progress Ring으로 직관적인 시각화",
    ],
  },
  {
    title: "월간 캘린더 히스토리",
    subtitle: "연속성으로 동기 부여",
    description:
      "각 습관의 완료 여부를 달력에 표시해 빈칸 없이 채워나가는 재미를 제공합니다. 패턴이 한눈에 보여서 언제 쉬었는지도 쉽게 알 수 있어요.",
    bullets: [
      "한 달 단위 성취 흐름 확인",
      "습관별 색상과 아이콘으로 가독성 향상",
      "연속 달성일을 시각적으로 강조",
    ],
  },
];

const supportingFeatures = [
  {
    title: "맞춤형 알림",
    description:
      "PWA와 Firebase Cloud Messaging 연동으로 브라우저에서도 푸시 알림을 받을 수 있어요. 서비스 워커가 자동으로 토큰을 갱신해 안정적으로 알림을 보내줍니다.",
  },
  {
    title: "라이트 · 다크 테마",
    description:
      "상단 토글로 테마를 즉시 전환할 수 있어요. 밤에는 눈이 편한 다크 테마로, 낮에는 선명한 라이트 테마로 환경에 맞게 기록하세요.",
  },
  {
    title: "안전한 계정 관리",
    description:
      "Firebase Auth 기반으로 로그인과 회원가입이 이뤄지며, 보호된 페이지는 인증된 사용자만 접근할 수 있도록 라우트가 잠겨 있습니다.",
  },
  {
    title: "문의 & QnA",
    description:
      "궁금한 점은 QnA 페이지와 문의 페이지에서 바로 확인하고 연락할 수 있어요. 서비스 개선을 위해 항상 열려 있습니다.",
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="features-page">
      <section className="features-hero">
        <div className="features-hero-content">
          <p className="eyebrow">FEATURES</p>
          <h1>
            Building Habit의
            <br />
            모든 기능을 한눈에
          </h1>
          <p className="description">
            실제 앱 화면과 동일한 기능을 사용자가 이해하기 쉬운 언어로
            정리했습니다. 어떤 문제를 해결하고 어떤 가치를 주는지 살펴보세요.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn primary">
              무료로 가입하기
            </Link>
            <Link to="/app" className="btn secondary">
              데모 화면 보기
            </Link>
          </div>
        </div>
        <div className="features-hero-card">
          <div className="stat">
            <span>오늘 달성률</span>
            <strong>82%</strong>
          </div>
          <div className="stat">
            <span>완료 / 전체</span>
            <strong>9 / 11</strong>
          </div>
          <p>
            대시보드에서 오늘 완료해야 할 습관을 자동으로 계산해줘요. 할 일에만
            집중할 수 있습니다.
          </p>
        </div>
      </section>

      <section className="features-grid-section">
        <div className="section-header">
          <h2>핵심 기능 자세히 보기</h2>
          <p>실제 서비스 화면에 기반한 사용 시나리오 중심 설명</p>
        </div>
        <div className="features-grid">
          {featureHighlights.map((feature) => (
            <article key={feature.title} className="feature-card">
              <p className="card-eyebrow">{feature.subtitle}</p>
              <h3>{feature.title}</h3>
              <p className="card-description">{feature.description}</p>
              <ul>
                {feature.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-section">
        <div className="section-header">
          <h2>하루 사용 흐름</h2>
          <p>앱 안에서 사용자가 겪는 경험을 4단계로 요약했습니다.</p>
        </div>
        <div className="experience-steps">
          {[
            {
              step: "01",
              title: "습관을 등록해요",
              text: "HabitForm에서 목표, 반복 주기, 알림을 설정합니다.",
            },
            {
              step: "02",
              title: "오늘 해야 할 일만 표시돼요",
              text: "스케줄 필터가 오늘에 해당하는 습관만 보여줘요.",
            },
            {
              step: "03",
              title: "완료하면 즉시 피드백",
              text: "토스트 메시지와 통계 카드가 실시간으로 갱신됩니다.",
            },
            {
              step: "04",
              title: "달력으로 패턴 확인",
              text: "CalendarView에서 빈칸 없이 채워지는지 확인하며 동기부여를 얻어요.",
            },
          ].map((item) => (
            <div key={item.step} className="experience-card">
              <span className="step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="supporting-section">
        <div className="section-header">
          <h2>사용 편의 기능</h2>
          <p>꾸준히 쓰기를 돕는 디테일을 더했습니다.</p>
        </div>
        <div className="supporting-grid">
          {supportingFeatures.map((feature) => (
            <article key={feature.title} className="supporting-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <p className="eyebrow">GET STARTED</p>
          <h2>지금 바로 새로운 습관을 시작하세요</h2>
          <p>
            회원가입 후 대시보드로 이동하면 위 기능들을 모두 직접 사용할 수
            있습니다.
          </p>
        </div>
        <div className="cta-actions">
          <Link to="/signup" className="btn primary">
            무료로 가입하기
          </Link>
          <Link to="/login" className="btn outline">
            기존 계정 로그인
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;

