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
    artworks: [{
        type: Schema.Types.ObjectId,
        ref: "Step"
    }]
},{
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password'))
        this.password = await bcrypt.hash(this.password,8)
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;