import express from "express"
import { connection } from "./connection/connection.js"
import userRouter from "./routes/users.js"
import problemsRouter from "./routes/problems.js"
import cors from "cors"
import "dotenv/config.js"
import { Users } from "./model/users.js"

const app=express()
connection()
app.use(express.json())
app.use(cors({
   // origin:["https://solve-it-woad.vercel.app"],
    methods:["POST","GET"],
    credentials:true
}))

let port;
port=5000

app.get("/",async(req,res)=>{
    const users= await Users.find()
    res.status(202).send(users)
})
app.use("/api/users",userRouter)
app.use("/api/problems",problemsRouter)


app.listen(port,()=>console.log(`Server started on port ${port}`))