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

export const checkAnswer=async(req,res)=>{
    try {
        const {id}=req.params
        const {answer,email}=req.body
        const problem=await Problems.find({_id:id})
        const user= await Users.find({email:email})
        const solution=problem[0].answer
        if(solution===Number(answer)){
        let userSubmission={title:problem[0].title,status:"Accepted"}
        /* db.students.updateOne(
             { _id: 1 },
             { $push: { scores: 89 } }
        )*/
       await  Users.updateOne(
            {email:email},
            { $inc: { points: +1}},
            {$push:{submissions:userSubmission}}
        )
        return res.status(201).json("Correct Answer")
        }
        let userSubmission={title:problem[0].title,status:"Rejected"}
        await Users.updateOne(
            {email:email},
            {$push:{submissions:userSubmission}}
        )
        return res.status(203).json("Wrong Answer")
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