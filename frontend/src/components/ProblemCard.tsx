import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import {ThumbUpAlt,ThumbDownAlt} from "@mui/icons-material"
import { Card } from "./Card";
import { Loader } from "./Loader";
import {Quotes} from "../utils/Quotes.ts"

export const ProblemCard = () => {
  const { id } = useParams();
  const user = useRecoilState(userAtom);
  const [value,setValue]=useState("")
  const [loading,setLoading]=useState(false)
  const [customInput,setCustomInput]=useState("")

  
  console.log(user[0].user?.email);
  const userEmail = user[0].user?.email;
  const [problem, setProblem] = useState<{
    _id: string;
    title: string;
    description: string;
    answer: string;
    category:string;
  }>();
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");
  console.log(id);
  
  const fetchProblem = async () => {
    const res = axios
      .get(`https://solveit-pi.vercel.app/api/problems/${id}`)
      .then((res) => {
        setProblem(res.data);
      });
  };
  const checkAnswer = async() => {
    setLoading(true)
    const res = await axios
      .post(`https://solveit-pi.vercel.app/api/problems/${id}/answer`, {
        answer:answer,
        email:userEmail
      })
      .then((res) => {
        console.log(res.data)
        setLoading(false)
        if(res.status===201){
          setResponse(res.data)
        }
        if(res.status===203){
          setError(res.data)
        }
      });
  };

  
const index=useMemo(()=>{
 return Math. floor(Math. random()*10);
},[])

const likeProblem=async()=>{
  const res=await axios.post(`https://solveit-pi.vercel.app/api/problems/${id}/like`,userEmail)
}

 
  
useEffect(() => {
fetchProblem();

  }, []);
  
  return (
    <div className="w-full flex gap-[10px]">
      <div className="mt-2 shadow-lg w-full bg-white ">
        <div className="mx-[10px] flex flex-col gap-2  ">
      
          {problem ? (
            <div className="flex h-full w-full gap-[10px]">
            <div className="flex flex-col gap-[15px] py-[10px] w-full">
              <span className="text-[22px]">Problem</span>
              <div className="flex flex-col gap-[15px]">
                <span className="text text-[22px] font-semibold">{problem.title}</span>
                <div className="flex  my-2 justify-between xs:w-[60%] md:w-[30%]  ">
                {problem.category==="1" && <span className="text-green-700 text-[18px] font-medium ">Easy</span>}
                {problem.category==="2" && <span className="text-orange-500 text-[18px] font-medium ">Medium</span>}
                {problem.category==="3" && <span className="text-red-600 text-[18px] font-medium ">Hard</span>}
                <ThumbUpAlt fontSize='small' color="action" style={{cursor:"pointer"}} onClick={likeProblem} />
                <ThumbDownAlt fontSize='small' color="action" style={{cursor:"pointer"}} onClick={likeProblem}  />
                </div>
                <span className="text-[16px] font-medium">{problem.description}</span>
                
                <div className="xs:w-[80%] md:w-[45%] flex  h-7 bg-slate-200 rounded-sm outline-none ">
                  <input className="ml-4 h-full bg-transparent outline-none" value={answer} onChange={(e)=>{
                    setAnswer(e.target.value)
                    setError("")
                    setResponse("")
                  }}/>
                </div>
              <div>
               
                {error && <span className="text-red-600">{error}</span>}
                {response &&  <span className="text-green-600">{response}</span>}
              </div>
              <button
                className="px-1 py-1 bg-green-600 w-[70px] h-[30px] flex justify-center items-center my-2 rounded-sm text-white outline-none"
                onClick={checkAnswer}
                >
                {loading?(<div className="">
                   <div className="h-4 w-4 rounded-full animate-spin border-b-2 border-white"/>
                   </div>
                ):("Submit")}
                </button>
               
              </div>
            </div>
            
            </div>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
      <Card>
      <p className="font-medium">{Quotes[index].quote}</p><br/>{Quotes[index].by}


      </Card>
    </div>
  );
};
