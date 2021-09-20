const router = require('express').Router()
const multer = require('multer')
const path = require('path')
require('dotenv').config()


const upload = multer({
    dest: 'artworks',
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/))
            return cb(new Error('Please upload image file'));

        cb(null,true)
    }
})

router.post('/upload', upload.single('image'), (req,res)=>{
    try{
        res.send('uploaded')
    }
    catch(e){
        res.send(e.message)
    }
});

module.exports = router