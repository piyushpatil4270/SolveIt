import "./index.css" 
//import {Landing} from "./components/Landing"
//import { SignIn } from "./components/SignIn";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { app } from "./utils/firebase";
import { useEffect } from "react";
import { RecoilRoot, useRecoilState} from "recoil";
import { userAtom } from "./store/atoms/user";
import { TopBar } from "./components/TopBar";
import { LeaderBoard } from "./components/LeaderBoard";
import { Route, Routes } from "react-router-dom";
import { About } from "./components/About";
import { Activity } from "./components/Activity";
import { Problems } from "./components/Problem";
import { SignIn } from "./components/SignIn";
import axios from "axios";
import { ProblemCard } from "./components/ProblemCard";
export const auth=getAuth(app)
function App() {
 return <RecoilRoot>
          <StoreApp/>
       </RecoilRoot>
}

function StoreApp(){
  const [user, setUser]=useRecoilState(userAtom)
  const userSignUp=async(email:string)=>{
    const res=await axios.post("http://localhost:7000/api/users/signup",{email})
    .then((res)=>{
      console.log(res)
    })
    .catch((error)=>{
      console.log("axios-error",error)
    })
  }

  useEffect(()=>{
  onAuthStateChanged(auth,(user) => { 
    if (user && user.email) { 
      userSignUp(user.email)
     // User is signed in 
     setUser({
      loading:false,
      user:{
        email:user.email
      }
     })
        console.log("User Signed In"); 
        //var uid = user.uid; 
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
  
  
  /*if(!user.user?.email){
    return <>
      <SignIn/>
      </>
  }*/
  
  
 return (
      <>
      <div className="h-dvh">
     
          <div className="xs:w-[100%] sm:w-full align-center bg-[#f0f0f0dd] h-full">
          {user.user?.email?(
          <>
          <TopBar/>
          <div className="mx-2 ">
          <Routes>
           
            <Route path="/" Component={About}/>
            <Route path="/activity" Component={Activity} />
            <Route path="/problems" Component={Problems} />
            <Route path="/problems/:id" Component={ProblemCard} />
            <Route path="/leaderboard" Component={LeaderBoard} />
           
          </Routes>
          </div>
          </>
          )
          :(
            <SignIn/>
          )}
          {/*<LeaderBoard leaderboard={LeaderboardItems} />*/}
          
          </div>
          
        </div>
      </>
    )
}

export default App
