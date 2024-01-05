import {Schema,model} from "mongoose"

const submissions=Schema({
    count:{
    type:Number,
    default:0
}
})
export const Submissions=model("submissions",submissions)