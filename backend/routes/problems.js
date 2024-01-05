import { Router } from "express";
import {getProblem,getAllProblems,getProblemSolution} from "../controllers/problems.js"
const router=Router()

router.get("/all",getAllProblems)
router.get("/:id",getProblem)
router.post("/:id/answer",getProblemSolution)

export default router