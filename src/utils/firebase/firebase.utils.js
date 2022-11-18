import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKl0O2jH3AqWFjeupSO0ENJFOnIwplsmM",
  authDomain: "gadgetsecommerce-e684d.firebaseapp.com",
  projectId: "gadgetsecommerce-e684d",
  storageBucket: "gadgetsecommerce-e684d.appspot.com",
  messagingSenderId: "1028884172169",
  appId: "1:1028884172169:web:17a7307b4510d38ba4a558",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if(!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);


  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userDocRef;
};
 export const createAuthUsersWithEmailAndPassword = async (email, password) =>{
  if (!email && !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
 }