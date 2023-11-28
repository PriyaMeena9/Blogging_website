import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';
 
const firebaseConfig = {
  apiKey: "AIzaSyC6MgwOO4e_Ow81IMn4NbiK_pbw6vGchkw",
  authDomain: "blogging-website-ff672.firebaseapp.com",
  projectId: "blogging-website-ff672",
  storageBucket: "blogging-website-ff672.appspot.com",
  messagingSenderId: "281686132667",
  appId: "1:281686132667:web:92a1399af5a19a69c8e69e"
};

const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const db=getFirestore(app);
const storage=getStorage(app);
  

export{auth ,db,storage}