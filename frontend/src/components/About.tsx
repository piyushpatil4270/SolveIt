import { signOut } from "firebase/auth";
import { auth } from "../App";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import { Card } from "./Card";

export const About = () => {
  const reset = useResetRecoilState(userAtom);
  const handleLogout = async () => {
    reset()
    auth && signOut(auth)
    
  };
  return (
    <div className="flex gap-[10px] items-start">
      <div className="flex mt-2 shadow-lg gap-2 w-full h-[50%] bg-white ">
        <div className="ml-[10px]  my-[10px] xs:w-[60%]">
          <div>
            <span className="text-[25px]">About</span>
          </div>
          <div className="w-full ">
            <span className="text-[20px] w-full">
              SolveIt is a platform for math geeks where they can practice their
              problem solving skills and enhance them.
            </span>
            <span className="text-[20px]">
              SolveIt contains various problems including basic addition,
              subtraction, multiplication and division to complex mathematical
              computational problems.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Illum repellat nobis provident reprehenderit optio aspernatur recusandae eum odio quod quas tenetur,
              culpa rerum ipsa nesciunt?
            </span>
          </div>
        </div>
      </div>
      
      <Card >
        <span className="xs:hidden text-[15px]  sm:flex">Without mathematics, there's nothing you can do. Everything around you is mathematics</span>
        <button
          className="bg-green-600 text-[12px] w-[55px] h-[25px] rounded-sm"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </Card>
      </div>
  
  );
};
