import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDwUJcjJXzhJUhrT0QJOIyxmF4_IgPTp3k",
  authDomain: "code-snippet-hub.firebaseapp.com",
  projectId: "code-snippet-hub",
  storageBucket: "code-snippet-hub.firebasestorage.app",
  messagingSenderId: "480098491173",
  appId: "1:480098491173:web:3b88089cb5a8133cd7d8cc",
  measurementId: "G-Y4HRVBJ66R"
};

// Initialize Firebase
console.log('Firebase config:', firebaseConfig);
console.log('Initializing Firebase');
const app = initializeApp(firebaseConfig);
console.log('Firebase initialized:', app);

// Initialize Firestore
console.log('Initializing Firestore');
const db = getFirestore(app);
console.log('Firestore initialized:', db);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics }; 