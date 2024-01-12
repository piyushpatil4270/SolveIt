import {Schema,model} from "mongoose"

const users=Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    points:{
        type:Number,
        default:0
    },
    submissions:{
        type:Array,
        default:[]
    },
    likes:{
        type:Array,
        default:[]
    },
    dislikes:{
        type:Array,
        default:[]
    }
})

export const Users=model("Users",users)