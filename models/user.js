const mongoose = require('mongoose')
const validator = require('validate')
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
    }
},{
    timestamps: true
});

userSchema.virtual('artwork',{
    ref:'Artwork',
    localField: '_id',
    foreignField: 'user'
})

const User = mongoose.model('User', userSchema);

module.exports = User;