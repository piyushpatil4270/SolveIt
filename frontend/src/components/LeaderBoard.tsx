import axios from "axios";
import { useEffect, useState } from "react";

export const LeaderBoard = () => {
    const[leaderboard,setLeaderboard]=useState<{_id:string,email:string,points:number}[]>()
    const getLeaderboard=async()=>{
        const res=await axios.get("https://solveit-pi.vercel.app/api/users/leaderboard")
        .then((res)=>{
            console.log("Leaderboard",res.data)
            setLeaderboard(res.data)
        })
       
    }
    const stringToColour = (str: string) => {
        let hash = 0;
        str.split('').forEach(char => {
          hash = char.charCodeAt(0) + ((hash << 5) - hash)
        })
        let colour = '#'
        for (let i = 0; i < 3; i++) {
          const value = (hash >> (i * 8)) & 0xff
          colour += value.toString(16).padStart(2, '0')
        }
        return colour
      }
      
   
    useEffect(()=>{
        getLeaderboard()
    },[])
    return (

        <div className="mt-2 shadow-lg  bg-white">
           {leaderboard?(
            <>
            <span className="text-[20px] ml-[10px] mt-[10px]">LeaderBoard</span>
            <div className="mx-[10px] flex flex-col gap-2">
            {leaderboard?.map((user,i)=>{

           let color=stringToColour(user.email)

            return <div className="flex  shadow-sm w-full h-[50px] items-center justify-start " key={i}>
                
                <span className="w-[10%]" >{i+1}.</span>
                <div className="w-[10%]">
                
                <div className={`w-[25px] h-[25px]  flex justify-center items-center rounded-full text-[#e6e6e6]`}  style={{backgroundColor:color}}>
                {user.email[0]?.toUpperCase()}
                </div>
                </div>
                <div className="flex xs:w-[50%] sm:w-[70%] justify-start">

                <span className="text-[18px]">{user.email.split("@")[0]}</span>
                </div>
                <span className="xs:w[40%] sm:w-[20%]">{user.points} points</span>
            </div>
})}
        </div>
        </>
           ):(
            "Loading..."
           )} 
           </div>
    )
    
};


