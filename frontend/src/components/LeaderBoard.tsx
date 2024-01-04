const logo=""

export const LeaderboardItems=[
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    },
    {
        name:"Ayush",
        image:logo,
        points:5
    }
]


export const LeaderBoard = ({
  leaderboard,
}: {
  leaderboard: { name: string; image: string; points: number }[];
}) => {
    return (

        <div className="mt-1 shadow-lg ">
            <span className="text-[20px] ml-[10px] mt-[10px]">LeaderBoard</span>
            <div className="mx-[10px] flex flex-col gap-2">
            {leaderboard.map((user,i)=>(
            <div className="flex  shadow-sm w-full h-[50px] items-center justify-between ">
                <span className="">{i+1}.</span>
                <span className="">{user.name}</span>
                <span className="">{user.image}</span>
                <span className="">{user.points}</span>
            </div>
        ))}
        </div>
        </div>
    )
};


