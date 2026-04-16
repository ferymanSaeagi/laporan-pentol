importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAILu80E4XZ3tYEg5q2KiGEYSRt-UXwbv8",
  authDomain: "pentol-jaya.firebaseapp.com",
  projectId: "pentol-jaya",
  storageBucket: "pentol-jaya.firebasestorage.app",
  messagingSenderId: "417031355177",
  appId: "1:417031355177:web:d9ccfc10457a44d0df1538",
  measurementId: "G-KM9Y92CC2G"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title || 'Pentol Jaya Service';
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    vibrate: [200, 100, 200]
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
