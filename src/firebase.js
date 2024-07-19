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
          // Add user information to Firestore
          await addDoc(collection(db, "users"), {
              uid: user.uid,
              name,
              authProvider: "local",
              email,
          });
      } catch (error) {
          console.error("Error signing up:", error.message);
          alert(`Failed to sign up: ${error.message}`);
      }
  };
  
  const login = async (email, password) => {
      try {
          await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
          console.error("Error logging in:", error.message);
          alert(`Failed to log in: ${error.message}`);
      }
  };
  
  const logout = async () => {
      try {
          await signOut(auth);
      } catch (error) {
          console.error("Error logging out:", error.message);
          alert(`Failed to log out: ${error.message}`);
      }
  };
  
  export { auth, db, login, signup, logout };