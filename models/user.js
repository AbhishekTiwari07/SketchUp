const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

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
    bio: String,
    artworks: [{
        type: Schema.Types.ObjectId,
        ref: "Image"
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