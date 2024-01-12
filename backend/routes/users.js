import { Router } from "express";
import {userSignUp,userLogIn} from "../controllers/user.js"
import { getLeaderboard } from "../controllers/problems.js";
const router=Router()


router.post("/signup",userSignUp)
router.post("/login",userLogIn)
router.get("/leaderboard",getLeaderboard)

export default router