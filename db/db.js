const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('db connected :)')).catch(e=>console.log(e.message))