// 1. Pakai versi compat yang stabil
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// 2. Konfigurasi (Udah bener punyamu)
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

// 3. Penangkap Notifikasi saat Background (HP Terkunci/App Tertutup)
messaging.onBackgroundMessage(function(payload) {
  console.log('Notif Background Masuk:', payload);
  
  const notificationTitle = payload.notification.title || 'Pentol Jaya Gresik';
  const notificationOptions = {
    body: payload.notification.body || 'Ada laporan masuk baru!',
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    vibrate: [200, 100, 200, 100, 200],
    tag: 'laporan-pentol', // Biar notif nggak numpuk
    renotify: true,
    data: {
        click_action: '/' // Kalau diklik buka webnya
    }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 4. Biar notifnya bisa diklik
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
