const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    token:{
        type:String,
    }

}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)