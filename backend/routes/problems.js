import { Router } from "express";
import {getProblem,getAllProblems,getUserSubmissions, checkAnswer} from "../controllers/problems.js"
const router=Router()

router.get("/all",getAllProblems)
router.get("/:id",getProblem)
router.post("/:id/answer",checkAnswer)
router.post('/user/submissions',getUserSubmissions)

export default router