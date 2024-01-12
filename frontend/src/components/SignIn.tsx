import { GoogleAuthProvider } from "firebase/auth";
import {  signInWithPopup} from "firebase/auth";
import { auth } from "../App";
import cover from "../../src/assets/problem-solving.png"
import gmailLogo from "../../src/assets/download (1).png"
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import axios from "axios";
const  provider= new GoogleAuthProvider()
export const SignIn = () => {
   const [user,setUser]  = useRecoilState(userAtom)
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  
  const handleChange=(value:any,name:any)=>{
    setFormData({
      ...formData,
      [name]:value
    })
  }

  async function logIn(){
    if(formData.email && formData.password){
      const res=axios.post("https://solveit-pi.vercel.app/api/users/login",formData)
    }
  }

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

   
 console.log(formData)
  return <div className="w-[100%] h-full">
{/*<button className="bg-green-700" onClick={()=>onSignIn()}>Sign-In</button>*/}
<div className="w-full h-dvh flex">
  <div className="w-[30%] bg-black h-full hidden sm:flex justify-center items-center">
    <span className="text-transparent text-[45px] bg-clip-text bg-gradient-to-r from-[#4A1D96] to-[#8d76b6] font-medium">SolveIt</span>
  </div>
  <div className="sm:w-[70%] xs:w-full  bg-[#e8e8e8a7]  h-dvh flex flex-col justify-center items-center">
  <div className="flex w-full my-2  items-center justify-center ">
      <img src={cover} alt="logo" className="w-[60px] h-[60px] rounded-full " />
      <span className="text text-xl font-normal">SolveIt</span>
    </div>
    <div className="flex w-full flex-col items-center my-7 gap-5 justify-center">
       <input placeholder="  Enter your email" className="xs:w-[60%] md:w-[40%] outline-none h-8 rounded-sm" value={formData.email} name="email" onChange={(e)=>{handleChange(e.target.value,"email")}} />
       <input placeholder="  Enter your password" className="xs:w-[60%] md:w-[40%] outline-none h-8 rounded-sm" value={formData.password} name="password" onChange={(e)=>{handleChange(e.target.value,"password")}} />
       <button className="w-fit h-fit py-1 px-3 bg-green-500 rounded-sm" onClick={logIn} >Login</button>
    </div>
    <div className="w-[50%] h-[1px] bg-[#2e2e2e82]" />
    <div className="w-[45px] h-[45px] cursor-pointer flex  justify-center my-7 items-center bg-white rounded-full " onClick={()=>onSignIn()} >
      <img src={gmailLogo} alt="google" className="rounded-full object-cover" />
    </div>

  </div>
</div>
  </div>;
};
