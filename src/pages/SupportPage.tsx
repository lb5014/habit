import React from "react";
import { Link } from "react-router-dom";
import "./SupportPage.css";

const SupportPage: React.FC = () => {
  const supportChannels = [
    {
      icon: "📧",
      title: "이메일 문의",
      description: "support@buildinghabit.com",
      action: "이메일 보내기",
      link: "mailto:support@buildinghabit.com",
    },
    {
      icon: "💬",
      title: "문의하기",
      description: "온라인 문의 양식을 작성해주세요",
      action: "문의 양식 작성",
      link: "/contact",
    },
    {
      icon: "❓",
      title: "자주 묻는 질문",
      description: "FAQ에서 빠른 답변을 확인하세요",
      action: "FAQ 보기",
      link: "/qna",
    },
  ];

  const helpTopics = [
    {
      title: "시작하기",
      description: "Building Habit을 처음 사용하시나요?",
      items: [
        "회원가입 방법",
        "첫 습관 등록하기",
        "알림 설정하기",
      ],
      link: "/features",
    },
    {
      title: "계정 관리",
      description: "계정 관련 도움이 필요하신가요?",
      items: [
        "비밀번호 변경",
        "계정 설정",
        "프로필 관리",
      ],
      link: "/settings",
    },
    {
      title: "결제 및 요금제",
      description: "결제 관련 문의사항이 있으신가요?",
      items: [
        "요금제 안내",
        "결제 방법",
        "환불 정책",
      ],
      link: "/pricing",
    },
    {
      title: "기능 사용법",
      description: "기능 사용에 도움이 필요하신가요?",
      items: [
        "습관 관리 방법",
        "캘린더 보기",
        "통계 확인하기",
      ],
      link: "/features",
    },
  ];

  return (
    <div className="support-page">
      <section className="support-hero">
        <div className="support-hero-content">
          <p className="eyebrow">SUPPORT</p>
          <h1>
            Building Habit 고객 지원
            <br />
            언제든지 도와드리겠습니다
          </h1>
          <p className="description">
            궁금한 점이나 문제가 있으시면 언제든지 문의해주세요.
            <br />
            빠르고 친절하게 답변드리겠습니다.
          </p>
        </div>
      </section>

      <section className="support-channels">
        <div className="section-header">
          <h2>지원 채널</h2>
          <p>가장 편한 방법으로 문의해주세요</p>
        </div>
        <div className="channels-grid">
          {supportChannels.map((channel) => (
            <article key={channel.title} className="channel-card">
              <div className="channel-icon">{channel.icon}</div>
              <h3>{channel.title}</h3>
              <p className="channel-description">{channel.description}</p>
              {channel.link.startsWith("mailto:") ? (
                <a
                  href={channel.link}
                  className="btn channel-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {channel.action}
                </a>
              ) : (
                <Link to={channel.link} className="btn channel-btn">
                  {channel.action}
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="support-hours">
        <div className="hours-card">
          <div className="hours-content">
            <div className="hours-icon">🕐</div>
            <div className="hours-text">
              <h3>지원 시간</h3>
              <p>
                평일: 오전 9시 ~ 오후 6시 (KST)
                <br />
                주말 및 공휴일: 휴무
              </p>
              <p className="hours-note">
                이메일 문의는 24시간 접수 가능하며, 평일 기준 1-2일 내에
                답변드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="help-topics">
        <div className="section-header">
          <h2>도움말 주제</h2>
          <p>원하는 주제를 선택하여 자세한 정보를 확인하세요</p>
        </div>
        <div className="topics-grid">
          {helpTopics.map((topic) => (
            <article key={topic.title} className="topic-card">
              <h3>{topic.title}</h3>
              <p className="topic-description">{topic.description}</p>
              <ul className="topic-items">
                {topic.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to={topic.link} className="topic-link">
                자세히 보기 →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="support-cta">
        <div>
          <p className="eyebrow">NEED MORE HELP?</p>
          <h2>추가 도움이 필요하신가요?</h2>
          <p>
            위의 방법으로 해결되지 않는 문제가 있으시면
            <br />
            문의 양식을 작성해주시면 빠르게 도와드리겠습니다.
          </p>
        </div>
        <div className="cta-actions">
          <Link to="/contact" className="btn primary">
            문의하기
          </Link>
          <Link to="/qna" className="btn outline">
            FAQ 보기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;

