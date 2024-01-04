import { Schema,model } from "mongoose";

const problems=Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    answer:{
        type:Number,
        required:true
    }
})

export const Problems=model("problems",problems)