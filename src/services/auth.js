import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const doSignInWithGoogle = () => signInWithPopup(auth, provider)
const doSignOut = () => signOut(auth);

onAuthStateChanged(auth, (user) => {
    if (user) {
        //const uid = user.uid;
        localStorage.setItem('authUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('authUser');
    }
});

export { app, doSignInWithGoogle, doSignOut }
