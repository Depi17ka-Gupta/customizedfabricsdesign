
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyALfoP7p9VhwX1l5Eezm33SfS5wBbwBTpQ",
  authDomain: "design-b7272.firebaseapp.com",
  projectId: "design-b7272",
  storageBucket: "design-b7272.appspot.com",
  messagingSenderId: "794476669651",
  appId: "1:794476669651:web:ea86aaee6770412d24c226"
};


const app = initializeApp(firebaseConfig);
export const imagedb=getStorage(app)

