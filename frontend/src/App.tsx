import "./index.css" 
import {Landing} from "./components/Landing"
import { SignIn } from "./components/SignIn";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { app } from "./utils/firebase";
import { useEffect } from "react";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "./store/atoms/user";
import { TopBar } from "./components/TopBar";
import { LeaderBoard, LeaderboardItems } from "./components/LeaderBoard";
import { Route, Routes } from "react-router-dom";
import { About } from "./components/About";
import { Activity } from "./components/Activity";
import { Problems } from "./components/Problem";
export const auth=getAuth(app)
function App() {
 return <RecoilRoot>
          <StoreApp/>
       </RecoilRoot>
}

function StoreApp(){
  const [user, setUser]=useRecoilState(userAtom)

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
  
  
  if(!user){
    return <div>
      <span>Login</span>
    </div>
  }
  
  if(user.loading){
    <span>Loading...</span>
  }
    return (
      <>
      <div className="place-items-center grid">
          <div className="max-w-screen-lg w-full align-center px-5 pb-5 pt-8">
          <TopBar/>
          <Routes>
            <Route path="/about" Component={About}/>
            <Route path="/activity" Component={Activity} />
            <Route path="/problems" Component={Problems} />
            <Route path="/leaderboard" element={<LeaderBoard leaderboard={LeaderboardItems} />} />
          </Routes>
          {/*<LeaderBoard leaderboard={LeaderboardItems} />*/}
          </div>
        </div>
      </>
    )
}

export default App
