/**
 * 사용자 인증 관련 타입 정의
 * 
 * @author 습관 추적기 개발팀
 * @version 1.0.0
 */

/**
 * 사용자 정보 타입
 */
export interface User {
  uid: string; // 사용자 고유 ID
  email: string; // 이메일 (로그인 ID)
  name: string; // 사용자 이름
  createdAt: string; // 계정 생성일
}

/**
 * 로그인 폼 데이터 타입
 */
export interface LoginForm {
  email: string; // 이메일
  password: string; // 비밀번호
}

/**
 * 회원가입 폼 데이터 타입
 */
export interface SignupForm {
  name: string; // 사용자 이름
  email: string; // 이메일
  password: string; // 비밀번호
  confirmPassword: string; // 비밀번호 확인
}

/**
 * 인증 상태 타입
 */
export interface AuthState {
  user: User | null; // 현재 로그인한 사용자 (null이면 로그아웃 상태)
  isLoading: boolean; // 인증 상태 로딩 중인지 여부
  isAuthenticated: boolean; // 인증된 사용자인지 여부
}

/**
 * 인증 컨텍스트 타입
 */
export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>; // 로그인 함수
  signup: (name: string, email: string, password: string) => Promise<boolean>; // 회원가입 함수
  logout: () => void; // 로그아웃 함수
  loginWithGoogle: () => Promise<boolean>; // 구글 로그인 함수
}
