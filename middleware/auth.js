const jwt = require('jsonwebtoken')
const auth = (req,res,next)=>{
    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({
            message:"Token Missing"
        })
    }
    try {
        const decode = jwt.verify(
            token,
            
            process.env.JWT_SECRET_KEY
        )
        req.user= decode
        next()
        
    } catch (error) {
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({
                message:"Token expired, Please login again"
            })
        }
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}

module.exports=auth

