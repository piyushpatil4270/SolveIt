import { Problems } from "../model/problems"
export const getAllProblems=async(req,res)=>{
    try {
        const problems=await Problems.find()
        res.status(202).json(problems)
    } catch (error) {
        console.log(error)
    }
}