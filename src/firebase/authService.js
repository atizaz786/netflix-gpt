import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "./firebase.utils";

export const signUpWithEmailAndPassword = async (email, password, username) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  console.log(userCredential)
  const user = userCredential.user;
  // Create a user document in Firestore
  const userRef = doc(firestore, "users", user.uid);
  await setDoc(userRef, {
    username: username,
    email: email,
    // Add other user details you want to store
  });
  // You can add additional logic to store the username in your database or Firebase profile
  return userCredential;
};

export const getUserData = async (userId) => {
    const userRef = doc(firestore, "users", userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Handle the case where the user doesn't have a Firestore document
    }
  };

export const signInWithEmail = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = await getUserData(user.uid);
    return userData;
  };
  
  export const signInWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = userCredential.user;
    const userData = await getUserData(user.uid);
    return userData;
  };
  
