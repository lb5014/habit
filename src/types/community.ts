// src/types/community.ts

/**
 * 커뮤니티 멤버의 데이터 구조
 * 간단하게 true 값을 사용하거나, 가입일 등 추가 정보를 넣을 수 있습니다.
 */
export interface CommunityMember {
    [userId: string]: true; // 예: { "user-uid-1": true, "user-uid-2": true }
  }
  
  /**
   * 커뮤니티(Community)의 전체 데이터 구조를 정의합니다.
   */
  export interface Community {
    id: string; // Firebase의 push key
    name: string; // 커뮤니티 이름
    description: string; // 커뮤니티 설명
    ownerId: string; // 커뮤니티를 생성한 사용자 UID
    createdAt: string; // 생성일 (ISO 8601)
    members: CommunityMember; // 커뮤니티에 가입한 사용자 목록
  }