import { GoogleAuthProvider } from "firebase/auth";
import {  signInWithPopup} from "firebase/auth";
import { auth } from "../App";
import cover from "../../src/assets/network.jpg"

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
      console.log("USER",user.email)
      console.log("RESULT",result)
      
      
    })
    .catch((error) => {
      
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Error",error.message)
    });
    }

   

  return <div className="w-[100%] h-full">
<button className="bg-green-700" onClick={()=>onSignIn()}>Sign-In</button>
{/*<div className="w-full h-dvh flex">
  <div className="w-[30%] bg-black h-full flex justify-center items-center">
    <span className="text-transparent text-[45px] bg-clip-text bg-gradient-to-r from-violet-900 to-violet-400">SolveIt</span>
  </div>
  <div className="w-auto h-dvh flex flex-col justify-center items-center">
   <span>Log In</span>

  </div>
</div>*/}
  </div>;
};
