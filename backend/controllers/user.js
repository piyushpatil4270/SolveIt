import { Users } from "../model/users.js"


export const userSignUp=async(req,res)=>{
    try {
        const {email}=req.body
      const user=await Users.create({
        email:email
       }) 
    res.status(202).json(user)
    } catch (error) {
        console.log(error)
    }
}