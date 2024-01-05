import axios from "axios";
import { useEffect, useState } from "react";

export const LeaderBoard = () => {
    const[leaderboard,setLeaderboard]=useState<{_id:string,email:string,points:number}[]>()
    const getLeaderboard=async()=>{
        const res=await axios.get("http://localhost:7000/api/users/leaderboard")
        .then((res)=>{
            console.log("Leaderboard",res.data)
            setLeaderboard(res.data)
        })
       
    }
    useEffect(()=>{
        getLeaderboard()
    },[])
    return (

        <div className="mt-1 shadow-lg ">
            <span className="text-[20px] ml-[10px] mt-[10px]">LeaderBoard</span>
            <div className="mx-[10px] flex flex-col gap-2">
            {leaderboard?.map((user,i)=>(
            <div className="flex  shadow-sm w-full h-[50px] items-center justify-between ">
                <span className="">{i+1}.</span>
                <span className="">{user.email}</span>
                <span className="">{user.points}</span>
            </div>
        ))}
        </div>
        </div>
    )
};


