import { Problems } from "../model/problems.js"

export const getProblem=async(req,res)=>{
    try {
       const {id}=req.params 
       const problem=await Problems.findById(id) 
       res.status(202).json(problem)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const getAllProblems=async(req,res)=>{
    try {
        const problems=await Problems.find()
        res.status(202).json(problems)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const getProblemSolution=async(req,res)=>{
    try {
        const {answer}=req.body
        const {id}=req.params
        const problem= await Problems.findById(id)
        if(problem.answer == Number(answer)) return res.status(203).json({answer:"Correct Answer"})
        res.status(202).json({answer:"Wrong Answer"})
    } catch (error) {
        res.status(404).json(error)
    }
}