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
    }
]


export const LeaderBoard = ({
  leaderboard,
}: {
  leaderboard: { name: string; image: string; points: number }[];
}) => {
    return (
        <div>
        {leaderboard.map((user)=>(
            <div>
                <span>{user.name}</span>
                <span>{user.image}</span>
                <span>{user.points}</span>
            </div>
        ))}
        </div>
    )
};


