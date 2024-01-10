import { Router } from "express";
import {getProblem,getAllProblems,checkSolution,getUserSubmissions} from "../controllers/problems.js"
const router=Router()

router.get("/all",getAllProblems)
router.get("/:id",getProblem)
router.post("/:id/answer",checkSolution)
router.post('/user/submissions',getUserSubmissions)

export default router