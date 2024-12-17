const userDb = require("../Models/sellerModel")
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { cloudinaryInstance } = require("../config/cloudinaryConfig")




const register = async (req, res)=>{
    try {
        const {name, email, mobile, password } = req.body

        if (!name || !email || !mobile || !password){

           return res.status(400).json({ error : "All fields are required" })
        }

        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
        console.log("upload result=====", uploadResult)

        const userAlreadyExist = await userDb.findOne({ email })

        if (userAlreadyExist){
            return res.status(400).json({error:"Seller Already Exist"})
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
       
        
        const  newUser = new userDb({
            name, email, password:hashedPassword, mobile
        })

    
        {const newUser = new userDb ({image : uploadResult.url, name, email, mobile, password})}

        const savedUser = await newUser.save()
        
        res.status(200).json({message : "Seller Created Successfully", data: savedUser })
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})

    }
}



const login = async (req, res) => { 
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await userDb.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Seller does not exist" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch, "passwordMatch");

        if (!passwordMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        
        if (user.role !== 'seller') {
            return res.status(403).json({ error: "Access denied. Only sellers can log in here." });
        }

        const token = generateToken(user, "seller");
        console.log(token, "=======token");

        res.cookie("token", token);
        res.status(200).json({ message: "Login successfull", data: user });
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};


const sellerProfile = async (req, res ) => {
    try {
       const userId = req.user.id;
       
       const userData = await userDb.findById(userId) 

       res.status(200).json({message:"Seller profile fetched", data: userData })
    } catch (error) {
      res.status(error.status || 500).json({error:error.message || "Internal Server Error"})
    }
}


const sellerLogout = async (req, res) => {

    try {
      res.clearCookie("token");
  
      res.status(200).json({ message: "Seller logout success" });
    } catch (error) {

        res.status(error.status || 500).json({error:error.message || "Internal Server Error"})

    }
  };


module.exports = { register, login, sellerProfile, sellerLogout }