export const Card=({children}:{children:React.ReactNode})=>{
    return <div className="max-w-sm  xs:h-[100px] md:flex flex-col xs:hidden sm:h-[200px] w-[40%]  gap-[10px] justify-center items-center p-6 bg-white border border-gray-100 shadow-lg">
        {children}
    </div>
}