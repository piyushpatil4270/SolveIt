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
        let today = new Date().toISOString().slice(0, 10)
        if(solution===Number(answer)){
        let userSubmission1={title:problem[0].title,status:"Accepted",date:today}
        /* db.students.updateOne(
             { _id: 1 },
             { $push: { scores: 89 } }
        )*/
       await  Users.updateOne(
            {email:email},
            {$push:{submissions:userSubmission1}},
            { $inc: { points: +1}}
        )
        await Users.updateOne(
            {email:email},
            { $inc: { points: +1}}
        )
        return res.status(201).json("Correct Answer...")
        }
        let userSubmission2={title:problem[0].title,status:"Rejected",date:today}
        await Users.updateOne(
            {email:email},
            {$push:{submissions:userSubmission2}}
        )
        return res.status(203).json("Wrong Answer...")
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
        submissions.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
          });
        
        res.status(202).json(submissions)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export const likeProblem=async()=>{
    try {
        res.status(201).json("Liked the problem")
    } catch (error) {
        res.status(404).json(error.message)
    }
}