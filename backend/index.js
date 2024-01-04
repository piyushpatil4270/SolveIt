import express from "express"
import { connection } from "./connection/connection.js"
import userRouter from "./routes/users.js"
import problemsRouter from "./routes/problems.js"
import cors from "cors"

const app=express()
connection()
app.use(express.json())
app.use(cors())


const port=7000

app.use("/api/users",userRouter)
app.use("/api/problems",problemsRouter)


app.listen(port,()=>console.log(`Server started on port ${port}`))