const mongoose = require('mongoose')
const encryption = require('mongoose-encryption')

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
    token: {
        type: String,
    }

}, { timestamps: true })

const Secret_Key = "Atg-end-to-end-encryption"

userSchema.plugin(encryption, {
    secret: Secret_Key,
    encryptedFields: ['username', 'Email']
})
module.exports = mongoose.model('user', userSchema)