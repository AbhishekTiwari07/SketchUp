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
    likes: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

const Image = mongoose.model('Image',imageSchema);

module.exports = Image;