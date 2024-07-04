// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpyCeY65LUywfJIhzVDQXprTO21242OSc",
  authDomain: "question-55b41.firebaseapp.com",
  projectId: "question-55b41",
  storageBucket: "question-55b41.appspot.com",
  messagingSenderId: "567710036552",
  appId: "1:567710036552:web:8a7e666e7ebb4ab5001e7d",
  measurementId: "G-WJ1GWKTTKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;