import { Users } from "../model/users.js";

export const userSignUp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.find({ email: email });
    if (user[0]) {
          return res.status(202).json(user[0])
    }
    const newUser = await Users.create({
        email: email,
    });
    const users = await Users.find();
    res.status(202).json(users);
  } catch (error) {
    console.log(error);
  }
};


export const userLogIn=async(req,res)=>{
  try {
    const {body}=req
    res.status(202).json(body)
  } catch (error) {
    res.status(404).json(error.message)
  }
}