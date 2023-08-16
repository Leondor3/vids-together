import { initializeApp } from 'firebase/app';
import { getStorage } from '@firebase/storage'
import { getAuth } from 'firebase/auth'

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBu-oGLcJjPQ49c1fKCDkSIlIUKgCeEDLY",
    authDomain: "datedash-a4953.firebaseapp.com",
    projectId: "datedash-a4953",
    storageBucket: "datedash-a4953.appspot.com",
    messagingSenderId: "564018866391",
    appId: "1:564018866391:web:26795f5da6f63bfab02892"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const firestore = getFirestore(app)

export { storage, app, auth, firestore };