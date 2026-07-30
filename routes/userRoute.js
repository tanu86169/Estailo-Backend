const express = require('express')
const userRouter = express.Router()

const {registerUser, loginUser, forgotPassword, resetPassword} = require('../controllers/userController')
const auth = require('../middleware/auth')

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)


userRouter.post('/forgot-password',forgotPassword)
userRouter.post('/reset-password',resetPassword)

// check-token

userRouter.get('/check-token',auth,(req,res)=>{
        res.status(200).json({message:"Token is valid",user:req.user})
})


module.exports = userRouter