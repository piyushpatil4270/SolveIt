import Logo from "../assets/problem-solving.png"

export const TopBar=()=>{
    return<div className="flex justify-center w-full h-[150px] z-0 ">
      <div className="w-[80%] bg-black h-full  flex flex-col justify-start items-center" >
        <div className="flex w-full h-[70%] ml-[10%] justify-start items-center  gap-[10px]">
          <img src={Logo} className="w-[80px] h-[80px] object-contain" />
          <span className="text-white text-[25px] text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 ">SolveIt</span>
        </div>
        <div className="w-full ml-[5%]">
        <Navbar/>
        </div>
        
    </div>
    </div> 
}

const TopBaritems=[
    {
        title:"About",
        route:"/about"
    },
    {
        title:"Activity",
        route:"/activity"
    },
    {
        title:"Problems",
        route:"/problems"
    },
    {
        title:"Competitions",
        route:"/competitions"
    },
    {
        title:"Leaderboard",
        route:"/leaderboard"
    },
    {
        title:"Login",
        route:"/login"
    }
]


function NavbarItem({title,route}:{
    title:string,
    route:string,
}){
  return <div className="mx-10 text-slate-500 text-[lg] cursor-pointer hover:text-white">
    {title}
  </div>
}

const Navbar=()=>{
    return <div className="flex">
      {TopBaritems.map((item)=>(
        <NavbarItem route={item.route} title={item.title}/>
      ))}
    </div>
}