import mongoose from "mongoose"

export const connection=()=>{
    mongoose.connect(process.env.connection)
    .then(
        ()=>{
        console.log("Connected to mongoDB successfully...")
    })
   .catch((error)=>{
    console.log(error)
   })
}