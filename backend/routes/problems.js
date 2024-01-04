import { Router } from "express";
import {getAllProblems} from "../controllers/problems.js"
const router=Router()

router.get("/all",getAllProblems)


export default router