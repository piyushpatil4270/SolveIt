import { Link } from "react-router-dom";
import Logo from "../assets/problem-solving.png";

export const TopBar = () => {
  return (
    <div className="flex xs:w-[100%] justify-center sm:w-full xs:h-[120px] sm:h-[150px] z-0 ">
      <div className="w-full bg-black h-full  flex flex-col justify-start items-center">
        <div className="flex w-full h-[70%] mx-[10%] justify-start items-center  gap-[10px]">
          <img src={Logo} className="xs:w-[40px] ml-[5%] sm:h-[40px]  sm:w-[80px] sx:h-[80px] object-contain" />
          <span className="text-white xs:text-[18px] sm:text-[25px] text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 ">
            SolveIt
          </span>
        </div>
        <div className="sm:w-full mx-[5%] xs:w-[100%] ">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

const TopBaritems = [
  {
    title: "About",
    route: "/",
  },
  {
    title: "Activity",
    route: "/activity",
  },
  {
    title: "Problems",
    route: "/problems",
  },
  {
    title: "Leaderboard",
    route: "/leaderboard",
  }
];

function NavbarItem({ title, route }: { title: string; route: string }) {
  return (
    <div className="sm:mx-10 xs:mx-4 text-slate-500 text-[lg] cursor-pointer hover:text-white">
      <Link to={route}>{title}</Link>
    </div>
  );
}

const Navbar = () => {
  return (
    <div className="flex xs:w-full xs:justify-start sm:justify-normal">
      {TopBaritems.map((item) => (
        <NavbarItem route={item.route} title={item.title} />
      ))}
    </div>
  );
};
