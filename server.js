const express = require('express')
const cors = require('cors')
const files = require('./routes/file')
const user = require('./routes/user')
var path = require('path')
require('dotenv').config()
require('./db/db.js')


const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))


const port = process.env.PORT || 3000;

const dirPublic = path.join(__dirname,'./artworks')
app.use(express.static(dirPublic))

app.use('/files',files)
app.use('/user', user)

app.listen(port, ()=>{
    console.log(`Server up at port ${port}`)
})