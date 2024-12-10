const { login } = require('../../controllers/sellerController')


const sellerRouter = require('express').Router()


sellerRouter.post('/login', login)

module.exports = sellerRouter