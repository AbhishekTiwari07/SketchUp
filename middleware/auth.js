const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()

const auth = async (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET)
        const user = await User.findOne({ email : decoded.email})
        if(!user){
            throw new Error("error")
        }
        req.user = user
    }
    catch(e){
        return res.send({
            error : e.message,
            message : "Please Authenticate"})
    }
    next()
}

module.exports = auth