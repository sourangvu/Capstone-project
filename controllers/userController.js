const userDb = require("../Models/userModel")
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");


const register = async (req, res)=>{
    try {
        const {name, email, mobile, password } = req.body

        if (!name || !email || !mobile || !password){

           return res.status(400).json({ error : "All fields are required" })
        }

        const userAlreadyExist = await userDb.findOne({ email })

        if (userAlreadyExist){
            return res.status(400).json({error:"User Already Exist"})
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
       
        
        const  newUser = new userDb({
            name, email, password:hashedPassword, mobile
        })

        const savedUser = await newUser.save()

        res.status(200).json({message : "User Created Successfully", data: savedUser })
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})

    }
}

const login = async (req, res) =>{
    try {
        const {email, password} = req.body
        if (!email || !password){
        return  res.status(400).json({error:"All fields are required"})
        }

        const user = await userDb.findOne({ email })

        if (!user) {
           return res.status(400).json({error:"User not exist"})
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        console.log(passwordMatch, "passwordMatch");

        if (!passwordMatch){
            return res.status(400).json({ error:"Incorrect Password"})
        }

        const  token = generateToken(user,"user");
        console.log(token, "=======token");
        res.cookie("token", token)


        res.status(200).json({message:"Login Successfull", data: user })
       
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
        
    }
}



const userProfile = async (req, res ) =>{
    try {
       const userId = req.user.id;
       
       const userData = await userDb.findById(userId) 

       res.status(200).json({message:"User profile fetched", data: userData })
    } catch (error) {
      res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}


const userLogout = async (req, res) => {

    try {
      res.clearCookie("token");
  
      res.status(200).json({ message: "User logout success" });
    } catch (error) {

        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})

    }
  };

module.exports = { register, login, userProfile, userLogout}