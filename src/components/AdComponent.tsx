import React, { useEffect } from 'react';
import './AdComponent.css'; // 광고 스타일을 위한 CSS

// TypeScript에서 window.adsbygoogle를 인식하도록 타입 선언
declare global {
  interface Window {
    adsbygoogle?: { [key: string]: unknown }[];
  }
}

interface AdComponentProps {
  slotId: string; // 애드센스 광고 단위 슬롯 ID
  publisherId: string; // 애드센스 게시자 ID
}

const AdComponent: React.FC<AdComponentProps> = ({ slotId, publisherId }) => {
  useEffect(() => {
    try {
      // 컴포넌트가 마운트될 때마다 광고를 새로고침(push)
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []); // 마운트 시 1회 실행

  return (
    <div className="ad-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdComponent;