importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-messaging.js');
var config = {
    apiKey: "AIzaSyBQ8t_DXQc5MSlAsfe_3TUJTYRXhnVE40I",
    authDomain: "realtime-shop.firebaseapp.com",
    databaseURL: "https://realtime-shop.firebaseio.com",
    projectId: "realtime-shop",
    storageBucket: "realtime-shop.appspot.com",
    messagingSenderId: "493967644576"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();



messaging.setBackgroundMessageHandler(function(payload) {
  //console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
