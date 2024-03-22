const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const encryption = require('mongoose-encryption')

const postSchema = new mongoose.Schema({
    authorId: {
        type: ObjectId,
        ref: 'user',
        require: true
    },
    post: {
        type: String,
        require: true
    },
    likes: [{
        type: ObjectId,
        ref: 'user'
    }],
    comments: [{
        type: ObjectId,
        ref: "comment"
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    DeletedAt: {
        type: Date,
        default: null
    }
},
    { timestamps: true })

const Secret_Key = "Atg-end-to-end-encryption"

postSchema.plugin(encryption, {
    secret: Secret_Key,
    encryptedFields: ['post']
})

module.exports = mongoose.model('post', postSchema)