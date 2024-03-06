import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAH1FldF818dreTrueLLXBKkp-7-Lj4Y-4",
  authDomain: "online-penalty-pay.firebaseapp.com",
  projectId: "online-penalty-pay",
  storageBucket: "online-penalty-pay.appspot.com",
  messagingSenderId: "398202743917",
  appId: "1:398202743917:web:836867e6b78a82a995a364"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { auth,db,storage};



