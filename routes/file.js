const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const auth = require('../middleware/auth')
require('dotenv').config()
const Image = require('../models/artwork')
const User = require('../models/user')

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

const upload = multer({storage});

router.get('/collection', async (req, res)=>{
    try{
        const art = await Image.find();
        res.send({
            art
        });
    }
    catch(e){
        res.send({
            "message": e.message
        })
    }
});

router.post('/changeowner/:id', async (req, res)=>{
    try{
        const {user} = req.body;

        const art = await Image.findOneAndUpdate({_id: req.params.id},{
            user
        });

        res.status(400).send({
            "message": 'Owner Updated',
            art
        });
    }
    catch(e){
        res.status(400).send({
            "message": e.message
        })
    }
});

router.post('/upload', auth, upload.single('image'), async (req,res)=>{
    const image = new Image({
        name: req.body.name,
        path: `/artworks/${req.file.filename}`
    });

    await image.save()

    var user = await User.findOne({
        _id: req.user.id
    });

    user.artworks.push(image);

    const response = await user.save();

    res.status(200).send({
        message: 'File uploaded',
        response
    });
    
}, (err, req, res, next)=>{
    res.status(400).send({
        message: err.message
    })
});

module.exports = router