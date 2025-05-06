import { User } from "../models/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const login= async (req,res)=>{
    const {username,password,remember}=req.body;
    const user=await User.findOne({username})

    if(!user) return res.status(404).json({status:'error',message:'utente/password errata'})

    if(await bcrypt.compare(password,user.password)) {
        const token=jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET)
        return res.status(200).json({ status: 'ok', data: token});
    }

    res.status(401).json({status:'error',message:'utente/password errata'})
}

export const register = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || typeof username != "string") {
    return res.json({ status: "error", message: "username non valido" });
  }

  if (!password || typeof username != "string") {
    return res.json({ status: "error", message: "password non valido" });
  }

  if (password.length < 6) {
    console.log(password.length);
    return res.status(500).json({ status: "error", message: "password troppo corta" });
  }  

  const passwordHashed= await bcrypt.hash(password,10)
  const user=new User({username:username,password:passwordHashed})

  try{
    await user.save()
    res.status(201).json(user)
  } 
  catch (error) {
    res.status(409).json({status:'error',message:error.message})
  }

};
