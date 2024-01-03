import { GoogleAuthProvider } from "firebase/auth";
import {  signInWithPopup} from "firebase/auth";
import { auth } from "../App";

const  provider= new GoogleAuthProvider()
export const SignIn = () => {
  
  async function onSignIn() {
    signInWithPopup(auth, provider)
    .then((result) => {
      
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if(! credential){
          return ;
      }
      const token = credential.accessToken;
      const user = result.user;
      console.log(user)
      
    })
    .catch((error) => {
      
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Error",error.message)
    });
    }

   

  return <div>
    <button className="bg-green-700" onClick={()=>onSignIn()}>Sign-In</button>
  </div>;
};
