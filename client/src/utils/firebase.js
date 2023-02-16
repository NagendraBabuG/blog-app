// Import the functions you need from the SDKs you need
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApVjocGQ54ce4IoLT4lHMU_2oeTEHzrn8",
  authDomain: "practice-firebase-5ccd8.firebaseapp.com",
  projectId: "practice-firebase-5ccd8",
  storageBucket: "practice-firebase-5ccd8.appspot.com",
  messagingSenderId: "869415489289",
  appId: "1:869415489289:web:958250a978264e109e4dd8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt : "select_account"
});
export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider);         

export const db = getFirestore();


export const  createUserDocumentFromAuth = async(userAuth, additionalInformation={})=>
{
  console.log(additionalInformation)
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if(!userSnapshot.exists())
  {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation,});
    }
    catch(error)
    {
      console.log('error creating the user ', error.message)
    }
  
  }

 // console.log(userDocRef)
  return userDocRef;


};  


export const createAuthUserWithEmailAndPassword = async(email, password)=> {
    console.log(email, password)
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = () => signOut(auth);