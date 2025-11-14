import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QnAPage.css';

/**
 * Q&A 페이지 컴포넌트
 * 
 * 자주 묻는 질문(FAQ)을 아코디언 형태로 제공합니다.
 */
const QnAPage: React.FC = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Q&A 데이터
  const qnaList = [
    {
      question: 'Building Habit은 무료인가요?',
      answer: '네, Building Habit은 완전 무료로 제공됩니다. 모든 기능을 제한 없이 사용하실 수 있습니다.'
    },
    {
      question: '습관을 몇 개까지 등록할 수 있나요?',
      answer: '습관 개수에 제한이 없습니다. 원하시는 만큼 습관을 등록하고 관리하실 수 있습니다.'
    },
    {
      question: '데이터는 어디에 저장되나요?',
      answer: '모든 데이터는 Firebase를 통해 안전하게 클라우드에 저장됩니다. 로그인한 계정으로 여러 기기에서 동일한 데이터에 접근할 수 있습니다.'
    },
    {
      question: '알림 기능은 어떻게 사용하나요?',
      answer: '습관 추가 시 알림 설정을 활성화하고 원하는 시간을 선택하시면, 매일 해당 시간에 습관 수행을 알려드립니다. 설정 페이지에서 알림을 켜고 끌 수 있습니다.'
    },
    {
      question: '습관을 삭제하면 데이터도 함께 삭제되나요?',
      answer: '네, 습관을 삭제하면 해당 습관의 모든 기록(완료 날짜, 통계 등)이 함께 삭제됩니다. 삭제된 데이터는 복구할 수 없으니 신중하게 결정해주세요.'
    },
    {
      question: '다른 기기에서도 사용할 수 있나요?',
      answer: '네, 로그인한 계정으로 여러 기기에서 동일한 데이터에 접근할 수 있습니다. 모바일, 태블릿, PC 어디서든 사용 가능합니다.'
    },
    {
      question: '비밀번호를 잊어버렸어요. 어떻게 해야 하나요?',
      answer: '로그인 페이지에서 "비밀번호 찾기" 기능을 이용하시거나, Firebase 인증을 통해 비밀번호 재설정 이메일을 받으실 수 있습니다.'
    },
    {
      question: '회원 탈퇴는 어떻게 하나요?',
      answer: '설정 페이지 > 계정 탭에서 회원 탈퇴 버튼을 클릭하시면 됩니다. 탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.'
    },
    {
      question: '습관 달성률은 어떻게 계산되나요?',
      answer: '습관 달성률은 설정한 일정에 따라 계산됩니다. 예를 들어, 주 5일 습관의 경우 한 주에 5일 중 완료한 날짜의 비율로 계산됩니다.'
    },
    {
      question: '캘린더에서 과거 날짜도 체크할 수 있나요?',
      answer: '네, 캘린더에서 과거 날짜를 클릭하여 습관 완료를 기록할 수 있습니다. 다만 미래 날짜는 체크할 수 없습니다.'
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="qna-page">
      {/* 헤더 */}
      <div className="qna-header">
        <button onClick={handleGoBack} className="back-button">
          <span className="back-icon">←</span>
          뒤로 가기
        </button>
        <h1 className="qna-title">자주 묻는 질문</h1>
        <p className="qna-subtitle">Building Habit에 대해 궁금한 점을 확인해보세요</p>
      </div>

      {/* Q&A 리스트 */}
      <div className="qna-content">
        <div className="qna-list">
          {qnaList.map((item, index) => (
            <div key={index} className={`qna-item ${openIndex === index ? 'open' : ''}`}>
              <button
                className="qna-question"
                onClick={() => toggleQuestion(index)}
                aria-expanded={openIndex === index}
              >
                <span className="question-text">{item.question}</span>
                <span className="question-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="qna-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 추가 문의 안내 */}
        <div className="qna-footer">
          <div className="qna-footer-content">
            <h3>원하는 답변을 찾지 못하셨나요?</h3>
            <p>추가 문의사항이 있으시면 문의하기 페이지를 이용해주세요.</p>
            <button
              onClick={() => navigate('/contact')}
              className="contact-button"
            >
              문의하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnAPage;

