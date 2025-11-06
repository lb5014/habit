import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * 테마 타입 정의
 */
type Theme = 'light' | 'dark' | 'system';

/**
 * 테마 컨텍스트 타입 정의
 */
interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark'; // 실제 적용되는 테마
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

/**
 * 테마 컨텍스트 생성
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * 테마 Provider Props 타입 정의
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * 테마 상태 관리 Provider 컴포넌트
 * 
 * @param {ThemeProviderProps} props - 컴포넌트 props
 * @returns {JSX.Element} 테마 컨텍스트 Provider
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // 로컬 스토리지에서 테마 설정을 가져오거나 기본값(라이트 모드) 사용
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('habit-tracker-theme');
    return (savedTheme as Theme) || 'light';
  });

  // 실제 적용되는 테마 계산
  const actualTheme = theme === 'system' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  // 다크모드 여부 계산
  const isDark = actualTheme === 'dark';

  /**
   * 테마 설정 함수
   */
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('habit-tracker-theme', newTheme);
  };

  /**
   * 테마 토글 함수 (light <-> dark만)
   */
  const toggleTheme = () => {
    const newTheme = actualTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // 시스템 테마 변경 감지
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        // 시스템 테마가 변경되면 강제로 리렌더링
        setThemeState('system');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // 테마 변경 시 body 클래스 업데이트
  useEffect(() => {
    document.body.className = actualTheme;
  }, [actualTheme]);

  const value: ThemeContextType = {
    theme,
    actualTheme,
    setTheme,
    toggleTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * 테마 컨텍스트 사용을 위한 커스텀 훅
 * 
 * @returns {ThemeContextType} 테마 컨텍스트 값
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
