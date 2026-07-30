const orderRouter = require('express').Router()

const {createOrder} = require('../controllers/orderController')

const auth = require('../middleware/auth')

orderRouter.post('/create-order',auth,createOrder)

module.exports = orderRouter