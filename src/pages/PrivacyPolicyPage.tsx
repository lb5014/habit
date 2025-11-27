import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PrivacyPolicyPage.css';

/**
 * 개인정보처리방침 페이지 컴포넌트
 * 
 * Building Habit 서비스의 개인정보 처리 방침을 안내합니다.
 */
const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="policy-page">
      <div className="policy-header">
        <button onClick={handleGoBack} className="back-button">
          <span className="back-icon">←</span>
          뒤로 가기
        </button>
        <h1 className="policy-title">개인정보처리방침</h1>
        <p className="policy-subtitle">마지막 업데이트: 2025년 1월 15일</p>
      </div>

      <div className="policy-content">
        <div className="policy-section">
          <h2>1. 개인정보의 처리 목적</h2>
          <p>
            Building Habit은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul>
            <li>서비스 제공: 습관 관리 서비스 제공, 본인 인증, 회원 관리</li>
            <li>서비스 개선: 서비스 이용 통계 분석, 신규 기능 개발</li>
            <li>고객 지원: 문의사항 응대, 불만 처리</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>2. 개인정보의 처리 및 보유기간</h2>
          <p>
            회원 탈퇴 시까지 개인정보를 보유 및 이용합니다. 단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관합니다.
          </p>
          <ul>
            <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
            <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
            <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>3. 처리하는 개인정보의 항목</h2>
          <p>Building Habit은 다음의 개인정보 항목을 처리하고 있습니다:</p>
          <ul>
            <li>필수항목: 이메일, 이름, 비밀번호</li>
            <li>자동 수집 항목: IP 주소, 쿠키, 서비스 이용 기록, 기기 정보</li>
            <li>습관 데이터: 등록한 습관 정보, 완료 기록, 통계 데이터</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>4. 개인정보의 제3자 제공</h2>
          <p>
            Building Habit은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:
          </p>
          <ul>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            <li>서비스 제공에 따른 요금정산을 위해 필요한 경우</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>5. 개인정보처리의 위탁</h2>
          <p>
            Building Habit은 서비스 제공을 위해 다음 업체에 개인정보 처리 업무를 위탁하고 있습니다.
          </p>
          <ul>
            <li>위탁 업체: Google Firebase</li>
            <li>위탁 업무 내용: 데이터 저장, 인증 서비스, 클라우드 인프라</li>
            <li>위탁 기간: 회원 탈퇴 시까지</li>
          </ul>
          <p>
            위탁업체는 개인정보를 위탁받은 목적 외의 용도로 사용하지 않으며, 개인정보 보호를 위해 필요한 조치를 취하고 있습니다.
          </p>
        </div>

        <div className="policy-section">
          <h2>6. 정보주체의 권리·의무 및 그 행사방법</h2>
          <p>
            이용자는 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. 이러한 권리 행사는 설정 페이지에서 직접 처리하거나, 문의하기를 통해 요청할 수 있습니다.
          </p>
          <ul>
            <li>개인정보 열람 요구: 본인의 개인정보 처리 현황을 확인할 수 있습니다.</li>
            <li>개인정보 정정·삭제 요구: 잘못된 정보를 수정하거나 삭제를 요청할 수 있습니다.</li>
            <li>개인정보 처리정지 요구: 개인정보 처리 중단을 요청할 수 있습니다.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>7. 개인정보의 파기</h2>
          <p>
            회원 탈퇴 시 보유하고 있는 개인정보를 즉시 파기합니다. 단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관 후 파기합니다.
          </p>
          <p>파기 방법:</p>
          <ul>
            <li>전자적 파일 형태: 복구 및 재생되지 않도록 안전하게 삭제</li>
            <li>기록물, 인쇄물, 서면 등: 분쇄하거나 소각</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>8. 개인정보 보호책임자</h2>
          <p>
            개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <ul>
            <li>이메일: contact@buildinghabit.com</li>
            <li>문의: 문의하기 페이지를 통해 연락 가능</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>9. 개인정보 처리방침 변경</h2>
          <p>
            이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

