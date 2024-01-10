import { Problems } from "../model/problems.js"
import { Submissions } from "../model/submissions.js"
import {Users} from "../model/users.js"
import {ObjectId} from "mongodb"
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

export const checkSolution=async(req,res)=>{
    try {
        const {answer,email,memory}=req.body
        const {id} =req.params
        var problem= await Problems.find({_id:id})
        var currentproblem=problem[0]
        if (answer.includes('error:')) return res.status(202).json(answer)
        if(answer.includes(currentproblem.answer.toString() && answer.includes(currentproblem.mainFunction()))) return res.status(202).json("Submitted")
        if(answer.includes(currentproblem.answer.toString() && !answer.includes(currentproblem.mainFunction()))) return res.status(202).json("Write function with specified name")
        
        return res.status(202).json(answer)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export const getLeaderboard=async(req,res)=>{
    try {
        //db.restaurants.find().sort( { "borough": 1 } )
        const users= await Users.find().sort({"points":-1})
        res.status(202).json(users)

    } catch (error) {
        res.status(404).json(error.message)
        
    }
}

export const getUserSubmissions=async(req,res)=>{
    try {
        const {email}=req.body
        const user=await Users.find({email:email})
        const submissions=user[0]?.submissions
        
        res.status(202).json(submissions)
    } catch (error) {
        res.status(404).json(error.message)
    }
}