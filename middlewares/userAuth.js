const jwt = require('jsonwebtoken');


const userAuth = (req, res ,next) =>{
    try {
        console.log(req.cookies, "=======cookies")
        const{ token } = req.cookies;

        if(!token){
            return res.status(401).json({message:"Token not provided"});
        }
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded){
            return res.status(401).json({ message:"User not authorized"})
        }

        req.user = decoded;
        

     next();
    } catch (error) {
        res.status(error.status || 500).json({error:error.message || "Internal Server Error"}) 
    }
}
module.exports = userAuth