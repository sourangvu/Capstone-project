const  v1Router = require("express").Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')





v1Router.use("/user",userRouter)
v1Router.use("/product",productRouter)
v1Router.use("/cart",cartRouter)

module.exports = v1Router