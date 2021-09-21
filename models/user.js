const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose;
const Artwork = require('./artwork')

const userSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    awtwork: {
        type: Number
    }
},{
    timestamps: true
});

userSchema.virtual('artowork',{
    ref:'Image',
    localField: 'artwork',
    foreignField: '_id'
})

const User = mongoose.model('User', userSchema);

module.exports = User;