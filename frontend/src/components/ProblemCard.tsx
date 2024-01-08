import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import Editor from "@monaco-editor/react"
export const ProblemCard = () => {
  const { id } = useParams();
  const user = useRecoilState(userAtom);
  const editorRef=useRef(null)
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
  const initialCode="class Solution:\n void(vector<int>&board){\n return board;\n}"
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

  const editorDidMount=(editor:any,monaco:any)=>{
    editorRef.current=editor;
  }

  const getEditorValue=()=>{
      // @ts-ignore: Object is possibly 'null'.
   alert(editorRef.current.getValue());
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
                onMount={editorDidMount}
                width="100%"
                height="80%"
                value={initialCode}
                
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
