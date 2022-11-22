// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBNx-Nmols5Zk_uiC4W7nrUX1B-NVhMKw4',
  authDomain: 'doe-tracker.firebaseapp.com',
  projectId: 'doe-tracker',
  storageBucket: 'doe-tracker.appspot.com',
  messagingSenderId: '186176063546',
  appId: '1:186176063546:web:8b731979139bb0d7f7cd03',
  measurementId: 'G-PWBM6BY43D',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
