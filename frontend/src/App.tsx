import "./App.css"
import "./index.css" 
import {Landing} from "./components/Landing"
import { SignIn } from "./components/SignIn";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { app } from "./utils/firebase";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "./store/atoms/user";
export const auth=getAuth(app)
function App() {
const [user,setUser]=useRecoilState(userAtom)

useEffect(()=>{
onAuthStateChanged(auth,(user) => { 
  if (user && user.email) { 
   // User is signed in 
   setUser({
    loading:false,
    user:{
      email:user.email
    }
   })
      console.log("User Signed In"); 
      var uid = user.uid; 
   } else { 
      // User is signed out 
      setUser({
        loading:false
      })
      console.log("There is no logged-in User"); 
      // ... 
  } 
});
},[])

  return (
    <>
      <div>
      <Landing/>
      <SignIn/>
      </div>
    </>
  )
}

export default App
