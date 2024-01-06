import { signOut } from "firebase/auth";
import { auth } from "../App";
import { useResetRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";

export const About = () => {
  const reset = useResetRecoilState(userAtom);
  const handleLogout = async () => {
    signOut(auth).then(() => {
      reset;
      console.log("Signout Successfully");
    });
  };
  return (
    <div className="flex gap-[10px]">
      <div className="flex mt-1 shadow-lg gap-2 w-full ">
        <div className="ml-[10px]  my-[10px] w-[70%]">
          <div>
            <span className="text-[20px]">About</span>
          </div>
          <div className="w-full ">
            <span className="text-[15px] w-full">
              SolveIt is a platform for math geeks where they can practice their
              problem solving skills and enhance them.
            </span>
            <span className="text-[15px]">
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
      <div className="shadow-lg w-[30%] flex items-center justify-center">
        <button
          className="bg-green-600 text-[12px] w-[55px] h-[25px] rounded-sm"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
