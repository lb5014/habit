import React from 'react';
import './AdComponent.css';

/**
 * 광고 컴포넌트 Props 타입 정의
 */
interface AdComponentProps {
  size?: 'sidebar' | 'footer' | 'banner';
  className?: string;
}

/**
 * 광고 컴포넌트
 * 
 * 구글 애드센스나 다른 광고 스크립트가 들어갈 자리를 표시하는 컴포넌트입니다.
 * 실제 광고 스크립트는 이 컴포넌트 내부에 추가할 수 있습니다.
 * 
 * @param props - 컴포넌트 props
 * @returns JSX.Element 광고 컴포넌트
 */
const AdComponent: React.FC<AdComponentProps> = ({ size = 'sidebar', className = '' }) => {
  // 크기에 따른 스타일 클래스 결정
  const getSizeClass = () => {
    switch (size) {
      case 'sidebar':
        return 'ad-sidebar';
      case 'footer':
        return 'ad-footer';
      case 'banner':
        return 'ad-banner';
      default:
        return 'ad-sidebar';
    }
  };

  return (
    <div className={`ad-component ${getSizeClass()} ${className}`}>
      <div className="ad-placeholder">
        <div className="ad-content">
          <div className="ad-icon">📢</div>
          <div className="ad-text">광고 영역</div>
          <div className="ad-subtext">
            {size === 'sidebar' && '사이드바 광고'}
            {size === 'footer' && '하단 광고'}
            {size === 'banner' && '배너 광고'}
          </div>
        </div>
        <div className="ad-note">
          구글 애드센스 스크립트가 여기에 삽입됩니다
        </div>
      </div>
    </div>
  );
};

export default AdComponent;

