import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * 테마 토글 버튼 컴포넌트
 * 
 * @returns {JSX.Element} 테마 토글 버튼 UI
 */
const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      title={isDark ? '라이트 모드로 변경' : '다크 모드로 변경'}
      aria-label={isDark ? '라이트 모드로 변경' : '다크 모드로 변경'}
    >
      {isDark ? (
        // 라이트 모드 아이콘 (태양) - 더 큰 크기와 굵은 선
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3"
        >
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        // 다크 모드 아이콘 (달) - 더 큰 크기와 굵은 선
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
