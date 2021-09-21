const router = require('express').Router()
const multer = require('multer')
const path = require('path')
require('dotenv').config()
const Image = require('../models/artwork')
const User = require('../models/User')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'artworks/');
    },
  
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/))
            return cb(new Error('Please upload image file'));
        cb(null,true)
    }
});

const upload = multer({storage})

router.post('/upload', upload.single('image'), async (req,res)=>{
    const image = new Image({
        name: req.body.name,
        path: `/artworks/${req.file.filename}`
    });
    const result = await image.save()

    await User.findOne({
        id: req.user.id
    }).populate('artwork');

    res.status(200).send({
        message: 'File uploaded',
        result
    })
}, (err, req, res, next)=>{
    res.status(400).send({
        message: err.message
    })
});

module.exports = router