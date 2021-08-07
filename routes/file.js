const router = require('express').Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`
        cb(null, fileName)
    }
})

const upload = multer({storage})

router.post('/',(req, res, next)=>{
    try{

        upload.single('image')(req, res, (err)=>{
            if(err)
                throw new Error(err.message)
            console.log(req.file)
            return res.send({
                'message':'File successfully uploaded',
                'address': req.file.path
            })
        })
    }
    catch(e){
        res.send({
            error : e.message
        })
    }
})

module.exports = router