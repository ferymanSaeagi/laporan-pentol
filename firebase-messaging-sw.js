// 1. Script PWA dari Progressier (Memastikan Progressier tetap jalan)
importScripts("https://progressier.app/imj2AS3jOOXTAzcCJ5PV/sw.js");

// 2. Import Firebase Compat khusus untuk Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// 3. Konfigurasi Firebase (Sama persis dengan yang di index.html)
const firebaseConfig = {
  apiKey: "AIzaSyAILu80E4XZ3tYEg5q2KiGEYSRt-UXwbv8",
  authDomain: "pentol-jaya.firebaseapp.com",
  projectId: "pentol-jaya",
  storageBucket: "pentol-jaya.firebasestorage.app",
  messagingSenderId: "417031355177",
  appId: "1:417031355177:web:d9ccfc10457a44d0df1538",
  measurementId: "G-KM9Y92CC2G"
};

// 4. Inisialisasi
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 5. Handler saat notifikasi masuk dan web sedang ditutup (Background)
messaging.onBackgroundMessage(function(payload) {
  console.log('Notif Background Masuk:', payload);
  
  const notificationTitle = payload.notification.title || 'Pentol Jaya Gresik';
  const notificationOptions = {
    body: payload.notification.body || 'Ada laporan atau pesan baru!',
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    vibrate: [200, 100, 200, 100, 200],
    tag: 'laporan-pentol', // Agar notifikasi tidak menumpuk memenuhi layar
    renotify: true,
    data: {
        click_action: payload.notification.click_action || '/laporan-pentol/' 
    }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 6. Handler saat notifikasi di-klik oleh pengguna
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  // Ambil URL spesifik jika ada, atau kembalikan ke halaman awal laporan pentol
  const urlToOpen = event.notification.data?.click_action || '/laporan-pentol/'; 

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // Jika tab website sudah ada yang buka, arahkan fokus ke tab tersebut
      for (let i = 0; i < windowClients.length; i++) {
        let client = windowClients[i];
        if (client.url.includes(urlToOpen) && 'focus' in client) {
          return client.focus();
        }
      }
      // Jika belum ada tab yang terbuka sama sekali, buka tab/window baru
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
