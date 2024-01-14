import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Problems = () => {
  const [problems, setProblems] = useState<[{_id:string,title:string,description:string}]>();
  const fetchProblems = async () => {
    const res = await axios
      .get("https://solveit-pi.vercel.app/api/problems/all")
      .then((res) => {
        console.log(res.data);
        setProblems(res.data);
      });
  };

  useEffect(() => {
    fetchProblems();
  }, []);
  return <div>{problems ? <div className="mt-2  shadow-lg bg-white">
   <span className="text-[20px] ml-[10px] mt-[10px]">Problems</span>
   <div className="mx-[10px] flex flex-col gap-2">
    {problems && problems.map((problem,i)=>(
        <div className="flex  justify-between shadow-sm gap-[25px] w-full h-fit py-[15px]">
            <div className="flex gap-[35px] w-[60%]">
            <span className="w-auto">#{i+1}.</span>
            <span className="w-[80%]">{problem.title}</span>
            </div>
            <div className="w-auto mx-2">
              <Link to={`/problems/${problem._id}`}>
                <button className="w-fit h-fit xs:hidden sm:flex justify-center px-[5px] py-[2px] bg-green-500 rounded-sm text-white">
                    View Problem
                </button>
                <button className="w-fit xs:flex sm:hidden h-fit px-[5px] py-[2px] bg-green-500 rounded-sm text-white">
                    View
                </button>
                </Link>
            </div>
        </div>
      
        
    ))}
   </div>
  </div> : "Loading..."}</div>;
};
