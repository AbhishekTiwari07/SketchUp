const jwt = require('json-web-token')
const User = require('../models/user')
require('dotenv').config()

const auth = async (req,res,next) =>{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET)
    try{
        const user = await User.findOne({ email : decoded})
        if(!user){
            throw new Error("error")
        }
        req.token = token
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