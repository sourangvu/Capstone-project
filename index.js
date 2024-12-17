const express = require('express')
const connectDB = require('./config/db')
const apiRouter = require('./routes')
const cookieParser = require('cookie-parser')
require('dotenv').config()




const app = express()

connectDB()

app.use(express.json())
app.use(cookieParser())

app.use("/api", apiRouter)

app.all("*", (req, res) =>{
    return res.status(404).json({message:"End-point does not exists"})
})


app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
    }else{
        console.log(`Server Starts on Port ${process.env.PORT}`)
    }

})


