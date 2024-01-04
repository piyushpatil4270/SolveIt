import { Router } from "express";
import {userSignUp} from "../controllers/user.js"
const router=Router()


router.post("/signup",userSignUp)


export default router