// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDaz5W4xlMtsXrUs4emi9c7QEkbN1U1d1Y',
  authDomain: 'todo-app-1abe9.firebaseapp.com',
  projectId: 'todo-app-1abe9',
  storageBucket: 'todo-app-1abe9.appspot.com',
  messagingSenderId: '1034042477144',
  appId: '1:1034042477144:web:996f4417aa98fcac57d82d',
  measurementId: 'G-DX62L8ET6B',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
