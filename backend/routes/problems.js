import { Router } from "express";
import {getProblem,getAllProblems,getProblemSolution,getUserSubmissions} from "../controllers/problems.js"
const router=Router()

router.get("/all",getAllProblems)
router.get("/:id",getProblem)
router.post("/:id/answer",getProblemSolution)
router.post('/user/submissions',getUserSubmissions)

export default router