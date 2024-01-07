import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";

export const ProblemCard = () => {
  const { id } = useParams();
  const user = useRecoilState(userAtom);
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
  useEffect(() => {
    fetchProblem();
  }, []);
  return (
    <div>
      <div className="mt-1 shadow-lg">
        <div className="mx-[10px] flex flex-col gap-2">
          {problem ? (
            <div className="flex flex-col gap-[15px] py-[10px]">
              <span className="text-[22px]">Problem</span>
              <div className="flex flex-col gap-[10px]">
                <span className="text text-[18px]">{problem.title}</span>
                <span className="text-[16px]">{problem.description}</span>
                <div className=" flex py-1  bg-slate-300 rounded-sm w-[30%]">
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
                </div>
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
