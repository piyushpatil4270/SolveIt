import "./App.css"
import "./index.css" 
import {Landing} from "./components/Landing"
import { SignIn } from "./components/SignIn";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { app } from "./utils/firebase";
import { useEffect } from "react";
import firebase from "firebase/compat/app";
export const auth=getAuth(app)
function App() {


useEffect(()=>{
onAuthStateChanged(auth,(user) => { 
  if (user) { 
   // User is signed in 
      console.log("User Signed In"); 
      var uid = user.uid; 
   } else { 
      // User is signed out 
      console.log("User Signed Out"); 
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
