import { Problems } from "../model/problems.js"
import { Submissions } from "../model/submissions.js"
import { Compile } from "../utils/CheckCompile.js"
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
        const {userCode,email,output}=req.body
        const {id} =req.params
        const problem= await Problems.find({_id:id})
        const currentProblem= problem[0]
       // const result = Compile({answer:currentProblem.answer.toString(),output,mainFunction:currentProblem.functionName,userCode})
       // return res.status(202).json({usercode:userCode,email,output})
       const answer = String(currentProblem.answer)
       const code=String(userCode)
      
      const mainFunction=currentProblem.functionName
       if(output.includes(answer) && code.includes(mainFunction))  return res.status(202).json("correct")
       else if(output.includes(answer) && !code.includes(mainFunction) )  return res.status(202).json(mainFunction)
       else if(output.includes("error"))  return res.status(202).json(output)
       return res.status(202).json(output)


      // return res.status(202).json(req.body)
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