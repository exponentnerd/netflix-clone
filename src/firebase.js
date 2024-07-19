import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

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

const signup = async (name, email, password)=>{
    try{
       const res = await createUserWithEmailAndPassword(auth,email,password);
       const user = res.user;
       await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider:"local",
        email,
       });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try{
       await signInWithEmailAndPassword(auth, email, password)

    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const  logout = () =>{
    signOut(auth)
}

export {auth, db, login, signup, logout};

