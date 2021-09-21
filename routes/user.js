const { response } = require('express')
const User = require('../models/User')
const router = require('express').Router()
require('dotenv').config()

router.get('/', async (req,res)=>{
    try{
        const result = await User.find({
            id: req.body.id
        })
        res.status(200).send(result)
    }
    catch(e){
        res.status(400).send({
            message: e.message
        })
    }
});

router.post('/', async (req,res)=>{
    try{
        const user = new User(req.body);
        const result = await user.save();
        res.status(200).send(result);
    }
    catch(e){
        res.status(400).send({
            message: e.message
        })
    }
})

router.post('/login',async (req,res)=>{
    try{
        
    }
    catch(e){

    }
})

module.exports = router;