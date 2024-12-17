const { login, register, sellerProfile, sellerLogout } = require('../../controllers/sellerController')
const sellerAuth = require('../../middlewares/sellerAuth')
const { upload } = require("../../middlewares/multer")


const sellerRouter = require('express').Router()


sellerRouter.post('/signup', upload.single("profilePic"), register)
sellerRouter.post('/login', login)
sellerRouter.get('/profile', sellerAuth ,sellerProfile)
sellerRouter.post('/logout',sellerAuth ,sellerLogout)

module.exports = sellerRouter