const router = require('express').Router()
const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
    destination: (req, res, cb) => cb(null, 'uploads'),
    filename: (req, res, cb) => {
        const fileName = `${Data.now}-${Math.random()*1E6}${path.extname(file.originalname)}`
        cb(null, fileName)
    }
})

let upload = multer({
    storage,
    limit : { fileSize: 10000000},
}).single('img')

router.post('/', (req, res)=>{
    try{
        if(!req.file)
            throw new Error('All fields are required')

        upload(req, res, async (err)=>{
            if(err)
                throw new Error(err.message)

        })
    }
    catch(e){
        res.send({
            error : e.message
        })
    }
})

module.exports = router