import {Schema,model} from "mongoose"

const users=Schema({
    email:{
        type:String,
        require:true
    },
    points:{
        type:Number,
        default:0
    }
})

export const Users=model("Users",users)