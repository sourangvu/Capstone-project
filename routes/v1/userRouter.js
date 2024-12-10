const { register, login, userProfile, userLogout } = require('../../controllers/userController')
const userAuth = require('../../middlewares/userAuth')

const userRouter = require('express').Router()


userRouter.post("/signup", register)
userRouter.post("/login", login)
userRouter.get("/profile", userAuth, userProfile )
userRouter.post("/logout", userAuth, userLogout )


module.exports = userRouter