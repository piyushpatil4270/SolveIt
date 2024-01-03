import "./App.css"
import "./index.css" 
import {Landing} from "./components/Landing"
import { SignIn } from "./components/SignIn";
import { getAuth } from "firebase/auth";
import { app } from "./utils/firebase";
export const auth=getAuth(app)
function App() {

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
