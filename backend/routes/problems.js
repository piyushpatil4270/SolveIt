import { Router } from "express";
import {getProblem,getAllProblems,getUserSubmissions, checkAnswer,likeProblem} from "../controllers/problems.js"
const router=Router()

router.get("/all",getAllProblems)
router.get("/:id",getProblem)
router.post("/:id/answer",checkAnswer)
router.post("/:id/like",likeProblem)
router.post('/user/submissions',getUserSubmissions)

export default router