import { Router } from "express";
import {userSignUp} from "../controllers/user.js"
import { getLeaderboard } from "../controllers/problems.js";
const router=Router()


router.post("/signup",userSignUp)
router.get("/leaderboard",getLeaderboard)

export default router