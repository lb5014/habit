// src/hooks/useCommunity.ts

import { useState, useEffect } from "react";
import { Community } from "../types/community";
import { db } from "../firebase"; // `useHabits.ts`와 동일한 db 인스턴스
import { ref, onValue, set, push, update } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";

export function useCommunity() {
  const { user } = useAuth(); // 현재 로그인한 사용자
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Realtime Database의 'communities' 최상위 경로를 구독합니다.
    const communitiesRef = ref(db, 'communities');

    const unsubscribe = onValue(communitiesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedCommunities = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
        members: data[key].members || {}, // members가 없을 경우 빈 객체
      })) : [];
      
      setCommunities(loadedCommunities);
      setIsLoading(false);
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, []);

  /**
   * 새 커뮤니티를 생성하는 함수
   */
  const addCommunity = async (name: string, description: string) => {
    if (!user) throw new Error("로그인이 필요합니다.");

    const communitiesRef = ref(db, 'communities');
    const newCommunityRef = push(communitiesRef); // 새 ID 생성

    const newCommunityData = {
      name,
      description,
      ownerId: user.uid,
      createdAt: new Date().toISOString(),
      members: {
        [user.uid]: true // 생성자를 첫 멤버로 자동 추가
      }
    };

    await set(newCommunityRef, newCommunityData);
    return newCommunityRef.key; // 생성된 커뮤니티 ID 반환
  };

  /**
   * 커뮤니티에 가입하는 함수
   */
  const joinCommunity = async (communityId: string) => {
    if (!user) throw new Error("로그인이 필요합니다.");

    // 'members' 객체 하위에 사용자 UID를 키로 추가 (데이터 업데이트)
    const memberRef = ref(db, `communities/${communityId}/members/${user.uid}`);
    await set(memberRef, true);
  };

  /**
   * 커뮤니티를 탈퇴하는 함수
   */
  const leaveCommunity = async (communityId: string) => {
    if (!user) throw new Error("로그인이 필요합니다.");

    // 'members' 객체 하위에서 사용자 UID 키를 제거
    const memberRef = ref(db, `communities/${communityId}/members/${user.uid}`);
    await set(memberRef, null); // Realtime DB에서 null로 set하면 데이터가 삭제됨
  };

  return { communities, isLoading, addCommunity, joinCommunity, leaveCommunity };
}