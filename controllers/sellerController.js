const userDb = require("../Models/sellerModel")
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");





const login = async (req, res) => { 
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await userDb.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
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
        res.status(200).json({ message: "Login successful", data: user });
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};