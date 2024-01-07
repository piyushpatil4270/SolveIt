import mongoose from "mongoose"

export const connection=()=>{
    mongoose.connect("mongodb+srv://piyushpatil4270:piyushpatil4270@cluster0.z6g6hlu.mongodb.net/")
    .then(
        ()=>{
        console.log("Connected to mongoDB successfully...")
    })
   .catch((error)=>{
    console.log(error)
   })
}