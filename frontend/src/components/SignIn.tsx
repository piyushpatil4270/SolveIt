import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { useState, useSyncExternalStore } from "react";

const actionCodeSettings={
    url:"http://localhost:3000",
    handleCodeInApp:true,
}

export const SignIn = () => {
  const auth = getAuth();
  const [email,setEmail]=useState("")
  async function onSignIn() {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem("emailForSignin", email);
      alert("sent email")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

   

  return <div>
    <input type="text" placeholder="Email"  onChange={(e)=>{
        setEmail(e.target.value)

    }} ></input>
    <button className="bg-green-700" onClick={()=>onSignIn()}>Sign-In</button>
  </div>;
};
