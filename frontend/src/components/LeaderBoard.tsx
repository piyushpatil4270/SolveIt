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
           {leaderboard?(
            <>
            <span className="text-[20px] ml-[10px] mt-[10px]">LeaderBoard</span>
            <div className="mx-[10px] flex flex-col gap-2">
            {leaderboard?.map((user,i)=>(
            <div className="flex  shadow-sm w-full h-[50px] items-center justify-start ">
                <span className="w-[10%]" >{i+1}.</span>
                <div className="flex w-[70%] justify-start">
                <span className="">{user.email.split("@")[0]}</span>
                </div>
                <span className="w-[20%]">{user.points} points</span>
            </div>
        ))}
        </div>
        </>
           ):(
            "Loading..."
           )} 
           </div>
    )
    
};


