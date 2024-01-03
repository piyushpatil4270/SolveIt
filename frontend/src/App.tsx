import "./App.css"
import "./index.css" 
import {Landing} from "./components/Landing"
import { SignIn } from "./components/SignIn";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDdnIepHj3UuV_2gic18QoAP1yHJdO-EPg",
  authDomain: "solve-it-79344.firebaseapp.com",
  projectId: "solve-it-79344",
  storageBucket: "solve-it-79344.appspot.com",
  messagingSenderId: "884820258003",
  appId: "1:884820258003:web:fcc1b965d1e72a33ee3826",
  measurementId: "G-JE3SPY7RHC"
};
export const app = initializeApp(firebaseConfig);
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
