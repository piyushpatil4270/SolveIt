import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { auth } from "../App";
const provider= new GoogleAuthProvider()


const actionCodeSettings={
    url:"http://localhost:3000",
    handleCodeInApp:true,
}

export const SignIn = () => {

  const [email,setEmail]=useState("")
  async function onSignIn() {
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

   

  return <div>
    <input type="text" placeholder="Email"  onChange={(e)=>{
        setEmail(e.target.value)

    }} ></input>
    <button className="bg-green-700" onClick={()=>onSignIn()}>Sign-In</button>
  </div>;
};
