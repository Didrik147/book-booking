// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCm0RhmCYRp7PDJb8-3tCfl7WCFhFU2mTs",
    authDomain: "anette-s-booking.firebaseapp.com",
    projectId: "anette-s-booking",
    storageBucket: "anette-s-booking.appspot.com",
    messagingSenderId: "413204140380",
    appId: "1:413204140380:web:1ae5149f3d4d6c3db27199"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Lager en referanse til databasen
let db = firebase.firestore();