/**
 * 사용자 인증 상태 관리 Context
 * 
 * 전역적으로 사용자 인증 상태를 관리하고, 로그인/회원가입/로그아웃 기능을 제공합니다.
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

// React와 필요한 타입들 import
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, AuthState } from '../types/user';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';

/**
 * AuthContext 생성
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider 컴포넌트의 Props 타입
 */
interface AuthProviderProps {
  children: ReactNode; // 자식 컴포넌트들
}

/**
 * 인증 상태 관리 Provider 컴포넌트
 * 
 * @param {AuthProviderProps} props - 컴포넌트 props
 * @returns {JSX.Element} 인증 컨텍스트 Provider
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 인증 상태 관리
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  /**
   * 컴포넌트 마운트 시 로컬 스토리지에서 사용자 정보 로드
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const currentUser: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email || '사용자',
          createdAt: firebaseUser.metadata?.creationTime || new Date().toISOString(),
          providerData: firebaseUser.providerData || [],
        };
        setAuthState({
          user: currentUser,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  /**
   * 로그인 함수
   * 
   * @param {string} email - 이메일
   * @param {string} password - 비밀번호
   * @returns {Promise<boolean>} 로그인 성공 여부
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error('로그인 실패:', error);
      return false;
    }
  };

  /**
   * 회원가입 함수
   * 
   * @param {string} name - 사용자 이름
   * @param {string} email - 이메일
   * @param {string} password - 비밀번호
   * @returns {Promise<boolean>} 회원가입 성공 여부
   */
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      return true;
    } catch (error) {
      console.error('회원가입 실패:', error);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return true;
    } catch (error) {
      console.error('구글 로그인 실패:', error);
      return false;
    }
  };


  /**
   * 로그아웃 함수
   */
  const logout = async () => {
    await signOut(auth);
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  // 컨텍스트 값 생성
  const contextValue: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * AuthContext를 사용하기 위한 커스텀 훅
 * 
 * @returns {AuthContextType} 인증 컨텍스트 값
 * @throws {Error} AuthProvider 외부에서 사용 시 에러 발생
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용되어야 합니다.');
  }
  return context;
};
