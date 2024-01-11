export const Compile=async({answer,output,mainFunction,userCode})=>{
  try {
     if(output.includes(answer) && userCode.includes(mainFunction)) return "correct"
     else if(output.includes(answer) && !userCode.includes(mainFunction) ) return "invalid"
     else return output
  } catch (error) {
    console.log(error)
  }
}