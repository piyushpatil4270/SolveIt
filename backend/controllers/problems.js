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

export const getProblemSolution=async(req,res)=>{
    try {
        const {answer,email}=req.body
        const {id}=req.params
        const problem= await Problems.findById(id)
        
        await Submissions.findOneAndUpdate(
            {"_id":"6598061a9979f1cb2cc7a695"},
            {$inc: {"count":+1}}
            )
        if(problem.answer == Number(answer)) {

            let submitted={id:id,title:problem.title,status:"Accepted"}
           const update= await Users.findOneAndUpdate(
            {"email":email},
            {$inc:{"points":+1}},
            

        )
        const update2=await Users.updateOne(
            {email:email},
            {$push:{submissions:submitted}}
        )
        
        const user=await Users.find({email:email})
         console.log(email)
        return res.status(203).json({answer:"Correct Answer"})
        //return res.status(203).json(user[0])
        }
        let rejected={id:id,title:problem.title,status:"Rejected"}
        const update3= await Users.updateOne(
            {email:email},
            {$push:{submissions:rejected}}
        )
         
        res.status(202).json({answer:"Wrong Answer"})
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