importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Konfigurasi Firebase untuk Service Worker (Harus sama dengan yang di index.html)
const firebaseConfig = {
  apiKey: "AIzaSyAILu80E4XZ3tYEg5q2KiGEYSRt-UXwbv8",
  authDomain: "pentol-jaya.firebaseapp.com",
  projectId: "pentol-jaya",
  storageBucket: "pentol-jaya.firebasestorage.app",
  messagingSenderId: "417031355177",
  appId: "1:417031355177:web:d9ccfc10457a44d0df1538",
  measurementId: "G-KM9Y92CC2G"
};

// Inisialisasi Firebase di Background
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Fungsi ini yang bertugas memunculkan Notifikasi di HP saat Web/Chrome sedang ditutup
messaging.onBackgroundMessage(function(payload) {
  console.log('Notifikasi background diterima: ', payload);
  
  const notificationTitle = payload.notification.title || 'Pentol Jaya Service';
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // Icon default
    badge: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    vibrate: [200, 100, 200, 100, 200] // Efek getar biar penjual/owner langsung sadar
  };

  // Menampilkan notifikasi ke layar HP
  self.registration.showNotification(notificationTitle, notificationOptions);
});
