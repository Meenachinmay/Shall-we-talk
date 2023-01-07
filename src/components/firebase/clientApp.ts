import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBoI38bOlRVugLMkXd_yYKiLtN2oOjsbgI",
  authDomain: "swt1-b53de.firebaseapp.com",
  projectId: "swt1-b53de",
  storageBucket: "swt1-b53de.appspot.com",
  messagingSenderId: "107806266978",
  appId: "1:107806266978:web:9185d8566a441b6452a33b"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const firestore = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { app, firestore, auth, storage }
