import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
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
  const checkAnswer = async () => {
    const res = await axios
      .post<GetSolution>(`https://solveit-pi.vercel.app/api/problems/${id}/answer`, {
        answer: answer,
        email: userEmail,
      })
      .then((res) => {
        if (res.status === 203) {
          setResponse(res.data.answer);
        } else {
          setError(res.data?.answer);
        }
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
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        console.log("res.token",token)
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
                <span className="text text-[18px]">{problem.title}</span>
                <span className="text-[16px]">{problem.description}</span>
               {/*  <div className=" flex py-1  bg-slate-300 rounded-sm w-[30%]">
                 <input
                    className="bg-transparent outline-none ml-[10px] w-full"
                    placeholder="Enter Answer"
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setError("");
                      setResponse("");
                    }}
                  />
                </div>*/}
                {response ? (
                  <span className="text-[14px] text-green-700">{response}</span>
                ) : (
                  <span className="text-[12px] text-red-700">{error}</span>
                )}
                {answer && (
                  <button
                    className="w-fit h-fit py-[2px] px-[4px] bg-green-500 rounded-sm text-white"
                    onClick={() => {
                      checkAnswer();
                    }}
                  >
                    Submit
                  </button>
                )}
               {/*<Editor
                theme="vs-dark"
                defaultLanguage="python"
                height="150px"
                width="150px"
                />*/}
              </div>
            </div>
            <div className="w-[65%]">
             {/*<button onClick={()=>getEditorValue()}>Get editor value</button>*/}
            <Editor
                theme="vs-dark"
                defaultLanguage="python"
                width="100%"
                height="80%"
                value={value}
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
