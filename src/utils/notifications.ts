/**
 * 브라우저 데스크탑 알림 유틸리티
 */

// 1. 앱 시작 시 권한 요청 함수
export const requestNotificationPermission = async (): Promise<void> => {
  if (!("Notification" in window)) {
    console.log("이 브라우저는 데스크탑 알림을 지원하지 않습니다.");
    return;
  }

  // 권한 상태 확인
  if (Notification.permission === "granted") {
    console.log("알림 권한이 이미 허용되어 있습니다.");
    return;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한이 허용되었습니다.");
    }
  }
};

// 2. 알림 표시 함수
export const showNotification = (title: string, body: string): void => {
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    new Notification(title, {
      body: body,
      icon: "/logo.png", // public 폴더의 로고 사용
    });
  }
};


