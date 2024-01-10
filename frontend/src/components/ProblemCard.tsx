import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import {ThumbUpAlt,ThumbDownAlt} from "@mui/icons-material"
import Editor from "@monaco-editor/react"


export const ProblemCard = () => {
  const { id } = useParams();
  const user = useRecoilState(userAtom);
  const [value,setValue]=useState("")
  const [processing,setProcessing]=useState(false)
  const [customInput,setCustomInput]=useState("")

  
  console.log(user[0].user?.email);
  const userEmail = user[0].user?.email;
  const [problem, setProblem] = useState<{
    _id: string;
    title: string;
    description: string;
    answer: string;
    starterCode:string
  }>();
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [answer, setAnswer] = useState("");
  console.log(id);
  type GetSolution = {
    answer: string;
    email: string;
  };
  const fetchProblem = async () => {
    const res = axios
      .get(`https://solveit-pi.vercel.app/api/problems/${id}`)
      .then((res) => {
        setProblem(res.data);
      });
  };
  const checkAnswer = async (value:string) => {
    const res = await axios
      .post<GetSolution>(`https://solveit-pi.vercel.app/api/problems/${id}/answer`, {
        answer: "value",
        email: userEmail,
      })
      .then((res) => {
        console.log(res.data)
      });
  };

  const handleEditorChange=(value:any)=>{
   setValue(value)
   console.log("editor value",value)
  }
  
 

  const handleCompilation=()=>{
    setProcessing(true);
    const formData = {
      language_id: 71,
      // encode source code in base64
      source_code: btoa(value),
      stdin: btoa(customInput),
    };
    const options = {
      method: 'POST',
      url: 'https://online-code-compiler.p.rapidapi.com/v1/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '39315176b8msh06ed59e28e589e7p111e04jsn49f7d47501c0',
        'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
      },
      data: {
        language: 'cpp',
        version: 'latest',
        code: value,
        input: null
      }
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        console.log("res.token",token)
        checkAnswer(response.data?.output)
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  }

  
  useEffect(() => {
    fetchProblem();
  }, []);
  return (
    <div className="w-full">
      <div className="mt-1 shadow-lg w-full ">
        <div className="mx-[10px] flex flex-col gap-2 h-dvh ">
          {problem ? (
            <div className="flex h-full w-full gap-[15px]">
            <div className="flex flex-col gap-[15px] py-[10px] xs:w-[50%] sm:w-[35%]">
              <span className="text-[22px]">Problem</span>
              <div className="flex flex-col gap-[10px]">
                <span className="text text-[22px] font-semibold">{problem.title}</span>
                <div className="flex  my-2 justify-between w-[50%]  ">
                <span className="text-green-700 text-[18px] font-medium">Easy</span>
                
                <ThumbUpAlt fontSize='small' color="success"/>
                <ThumbDownAlt fontSize='small' color="warning"/>
                </div>
                <span className="text-[16px] font-medium">{problem.description}</span>
               {/*response ? (
                  <span className="text-[14px] text-green-700">{response}</span>
                ) : (
                  <span className="text-[12px] text-red-700">{error}</span>
                )*/}
                {/*answer && (
                  <button
                    className="w-fit h-fit py-[2px] px-[4px] bg-green-500 rounded-sm text-white"
                    onClick={() => {
                      checkAnswer();
                    }}
                  >
                    Submit
                  </button>
                  )*/}
                <button
                className="px-1 py-1 bg-green-600 w-fit my-2 rounded-sm text-white outline-none"
                onClick={handleCompilation}
                >
                  Compile and Run
                </button>
               
              </div>
            </div>
            <div className="w-[65%]">
             
             <Editor
                theme="vs-dark"
                defaultLanguage="python"
                height="70%"
                width="100%"
                value={problem.starterCode}
                onChange={handleEditorChange}
                />
            </div>
            </div>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};
