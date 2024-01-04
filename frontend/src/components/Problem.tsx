import axios from "axios"
import { useEffect } from "react"

export const Problems=()=>{
    const fetchProblems=async()=>{
        const res= await axios.get("http://localhost:7000/api/problems/all")
        .then((res)=>{
            console.log(res.data)
        })
    }

    useEffect(()=>{
     fetchProblems()
    },[])
    return <div>
        Problems
    </div>
}