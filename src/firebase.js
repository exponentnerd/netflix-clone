import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC6tP7uH0FG4WlNP4qYjpFHpOQMqyNaHQg",
    authDomain: "netflix-clone-f4bfe.firebaseapp.com",
    projectId: "netflix-clone-f4bfe",
    storageBucket: "netflix-clone-f4bfe.appspot.com",
    messagingSenderId: "298936343498",
    appId: "1:298936343498:web:9bbe6f7619e65ba1368d33"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       });
    } catch (error) {
        console.error("Error signing up:", error);
        alert("Failed to sign up. Check the console for details.");
    }
};

const login = async (email, password) => {
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error logging in:", error);
        alert("Failed to log in. Check the console for details.");
    }
};

const logout = () => {
    try {
        signOut(auth);
    } catch (error) {
        console.error("Error logging out:", error);
        alert("Failed to log out. Check the console for details.");
    }
};

export { auth, db, login, signup, logout };
