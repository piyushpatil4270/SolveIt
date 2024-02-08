import axios from "axios"
import { useRecoilState } from "recoil"
import { userAtom } from "../store/atoms/user"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Done,Close } from "@mui/icons-material"
dayjs.extend(relativeTime)
export const Activity=()=>{
    const user=useRecoilState(userAtom)
    const userEmail = user[0].user?.email;
    const [submissions,setSubmissions]=useState<{title:string,status:string,date:string}[]>()
    const userSubmissions=async()=>{
        const res=axios.post(`https://solveit-pi.vercel.app/api/problems/user/submissions`,{email:userEmail})
        .then((res)=>{
            setSubmissions(res.data)
        })
    }
    useEffect(()=>{
        userSubmissions()
    },[])
    return <div className=" shadow-lg mt-2 bg-white">
       <span className="text-[20px] ml-[10px] mt-[10px]">Activity</span>
       <div className="mx-[10px] flex flex-col gap-2">
        {submissions?(
        <div className="flex flex-col shadow-sm gap-[25px] w-full h-fit py-[15px]">
            {submissions.map((submission,i)=>(
                <div className="flex gap-[15px]" key={i}>
                <div className="w-[60%]">
                <span className="text-[18px]">{submission.title}</span>
                </div>
                <div className="w-[25%]">
                {/*<span className={`${submission.status==="Accepted"?`text-green-500`:`text-red-600`}`}>{submission.status}</span>*/}
                {submission.status==="Accepted" && <Done style={{color:"green"}} />}
                {submission.status==="Rejected" && <Close style={{color:"red"}} />}
                </div>
                <div>
                {dayjs(submission.date).fromNow()}
                </div>
                </div>
            ))}
        </div>
        ):("Loading...")}
        </div>
    </div>
}