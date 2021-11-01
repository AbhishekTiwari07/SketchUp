const mongoose = require('mongoose')
const { Schema } = mongoose;

const imageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path:{
        type: String,
        required: true
    },
    user: String
},{
    timestamps: true
})

const Image = mongoose.model('Image',imageSchema);

module.exports = Image;