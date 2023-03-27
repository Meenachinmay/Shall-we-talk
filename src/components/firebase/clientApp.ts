import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  // apiKey: "AIzaSyBoI38bOlRVugLMkXd_yYKiLtN2oOjsbgI",
  // authDomain: "swt1-b53de.firebaseapp.com",
  // projectId: "swt1-b53de",
  // storageBucket: "swt1-b53de.appspot.com",
  // messagingSenderId: "107806266978",
  // appId: "1:107806266978:web:9185d8566a441b6452a33b"
  apiKey: "AIzaSyBfX70sgkVeffXlTsMvDLnDnY3BQxPK1NE",
  authDomain: "shallwetalk-49372.firebaseapp.com",
  projectId: "shallwetalk-49372",
  storageBucket: "shallwetalk-49372.appspot.com",
  messagingSenderId: "37269763139",
  appId: "1:37269763139:web:adfeded51f4a0258bc50f6",
  measurementId: "G-N6DKQ91ETT"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const firestore = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { app, firestore, auth, storage }





// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBfX70sgkVeffXlTsMvDLnDnY3BQxPK1NE",
//   authDomain: "shallwetalk-49372.firebaseapp.com",
//   projectId: "shallwetalk-49372",
//   storageBucket: "shallwetalk-49372.appspot.com",
//   messagingSenderId: "37269763139",
//   appId: "1:37269763139:web:adfeded51f4a0258bc50f6",
//   measurementId: "G-N6DKQ91ETT"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);