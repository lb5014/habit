// public/firebase-messaging-sw.js
// Firebase SDK v9 compat 빌드 사용 (서비스 워커 환경)
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// TODO: 아래 firebaseConfig를 실제 프로젝트 설정값으로 교체하세요.
// 보통 src/firebase.ts의 환경 변수에 대응합니다.
// 예) process.env.REACT_APP_FIREBASE_*
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 백그라운드 메시지 수신 핸들러 (옵션)
messaging.onBackgroundMessage((payload) => {
  // eslint-disable-next-line no-restricted-globals
  console.log("백그라운드 메시지 수신: ", payload);
  const notificationTitle = payload?.notification?.title || "알림";
  const notificationOptions = {
    body: payload?.notification?.body || "새 메시지가 도착했습니다.",
    icon: "/logo.png",
  };
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});


