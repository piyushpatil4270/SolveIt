import { GoogleAuthProvider } from "firebase/auth";
import {  signInWithPopup} from "firebase/auth";
import { auth } from "../App";
import cover from "../../src/assets/problem-solving.png"
import gmailLogo from "../../src/assets/download (1).png"
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
{/*<button className="bg-green-700" onClick={()=>onSignIn()}>Sign-In</button>*/}
<div className="w-full h-dvh flex">
  <div className="w-[30%] bg-black h-full flex justify-center items-center">
    <span className="text-transparent text-[45px] bg-clip-text bg-gradient-to-r from-[#4A1D96] to-[#8d76b6] font-medium">SolveIt</span>
  </div>
  <div className="w-[70%] bg-[#e8e8e8a7]  h-dvh flex flex-col justify-center items-center">
  <div className="flex w-full  items-center justify-center">
      <img src={cover} alt="logo" className="w-[60px] h-[60px] rounded-full " />
      <span className="text text-xl font-normal">CodeIt</span>
    </div>
    <div className="flex w-full flex-col items-center my-7 gap-5 justify-center">
       <input className="w-[40%] outline-none h-8 rounded-sm" />
       <input className="w-[40%] outline-none h-8 rounded-sm" />
    </div>
    <div className="w-[50%] h-[1px] bg-[#2e2e2e82]" />
    <div className="w-[45px] h-[45px] cursor-pointer flex  justify-center my-7 items-center bg-white rounded-full " onClick={()=>onSignIn()} >
      <img src={gmailLogo} alt="google" className="rounded-full object-cover" />
    </div>

  </div>
</div>
  </div>;
};
