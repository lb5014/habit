import React from "react";
import { Link } from "react-router-dom";
import "./PricingPage.css";

const PricingPage: React.FC = () => {
  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="pricing-hero-content">
          <p className="eyebrow">PRICING</p>
          <h1>
            Building Habit의
            <br />
            요금제를 확인하세요
          </h1>
          <p className="description">
            합리적인 가격으로 습관 관리의 모든 기능을 이용하실 수 있습니다.
            <br />
            월간 또는 연간 플랜을 선택하여 더욱 경제적으로 이용하세요.
          </p>
        </div>
      </section>

      <section className="pricing-plans">
        <div className="pricing-grid">
          {/* 월간 플랜 */}
          <article className="pricing-card">
            <div className="pricing-card-header">
              <h3>월간 플랜</h3>
              <p className="pricing-subtitle">매월 결제</p>
            </div>
            <div className="pricing-price">
              <span className="price-amount">2,900</span>
              <span className="price-currency">원</span>
              <span className="price-period">/월</span>
            </div>
            <ul className="pricing-features">
              <li>✓ 모든 습관 관리 기능</li>
              <li>✓ 무제한 습관 등록</li>
              <li>✓ 캘린더 히스토리</li>
              <li>✓ 통계 및 달성률 확인</li>
              <li>✓ 푸시 알림</li>
              <li>✓ 라이트/다크 테마</li>
            </ul>
            <Link to="/signup" className="btn pricing-btn">
              시작하기
            </Link>
          </article>

          {/* 연간 플랜 */}
          <article className="pricing-card featured">
            <div className="pricing-badge">추천</div>
            <div className="pricing-card-header">
              <h3>연간 플랜</h3>
              <p className="pricing-subtitle">연간 결제</p>
            </div>
            <div className="pricing-price">
              <span className="price-amount">29,000</span>
              <span className="price-currency">원</span>
              <span className="price-period">/년</span>
            </div>
            <div className="pricing-savings">
              <span className="savings-badge">월 2,417원</span>
              <span className="savings-text">월간 플랜 대비 17% 할인</span>
            </div>
            <ul className="pricing-features">
              <li>✓ 모든 습관 관리 기능</li>
              <li>✓ 무제한 습관 등록</li>
              <li>✓ 캘린더 히스토리</li>
              <li>✓ 통계 및 달성률 확인</li>
              <li>✓ 푸시 알림</li>
              <li>✓ 라이트/다크 테마</li>
              <li>✓ 우선 고객 지원</li>
            </ul>
            <Link to="/signup" className="btn pricing-btn primary">
              시작하기
            </Link>
          </article>
        </div>
      </section>

      <section className="pricing-faq">
        <div className="section-header">
          <h2>자주 묻는 질문</h2>
          <p>요금제에 대한 궁금한 점을 확인하세요</p>
        </div>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>무료 체험 기간이 있나요?</h3>
            <p>
              네, 회원가입 후 7일간 모든 기능을 무료로 체험하실 수 있습니다.
              체험 기간 중 언제든지 취소 가능하며, 결제는 체험 기간 종료 후에
              진행됩니다.
            </p>
          </div>
          <div className="faq-item">
            <h3>결제는 어떻게 하나요?</h3>
            <p>
              신용카드, 체크카드, 계좌이체 등 다양한 결제 수단을 지원합니다.
              안전한 결제 시스템을 통해 진행되며, 결제 정보는 암호화되어
              보관됩니다.
            </p>
          </div>
          <div className="faq-item">
            <h3>언제든지 취소할 수 있나요?</h3>
            <p>
              네, 언제든지 취소 가능합니다. 취소 시 남은 기간에 대한 환불은
              정책에 따라 진행되며, 다음 결제일부터 자동 결제가 중단됩니다.
            </p>
          </div>
          <div className="faq-item">
            <h3>연간 플랜으로 전환할 수 있나요?</h3>
            <p>
              월간 플랜 사용 중 언제든지 연간 플랜으로 전환하실 수 있습니다.
              남은 기간에 대한 차액을 계산하여 연간 플랜으로 전환해드립니다.
            </p>
          </div>
        </div>
      </section>

      <section className="pricing-cta">
        <div>
          <p className="eyebrow">READY TO START?</p>
          <h2>지금 바로 시작하세요</h2>
          <p>
            무료 체험으로 Building Habit의 모든 기능을 경험해보세요.
            <br />
            습관 관리의 새로운 경험을 만나보실 수 있습니다.
          </p>
        </div>
        <div className="cta-actions">
          <Link to="/signup" className="btn primary">
            무료로 시작하기
          </Link>
          <Link to="/features" className="btn outline">
            기능 알아보기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;

