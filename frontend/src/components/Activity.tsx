import axios from "axios"
import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"
import { useEffect, useState } from "react"

export const Activity=()=>{
    const user=useRecoilState(userAtom)
    const userEmail = user[0].user?.email;
    const [submissions,setSubmissions]=useState<{answer:string}[]>()
    const userSubmissions=async()=>{
        const res=axios.post(`http://localhost:7000/api/problems/user/submissions`,{email:userEmail})
        .then((res)=>{
            setSubmissions(res.data)
        })
    }
    useEffect(()=>{
        userSubmissions()
    },[])
    return <div>
        <span>Activity</span>
        {submissions?(
        <div>
            {submissions.map((submission)=>(
                <span>{submission?.answer}</span>
            ))}
        </div>
        ):("Loading...")}
        {}
    </div>
}