const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const encryption = require('mongoose-encryption')

const commentSchema = new mongoose.Schema({
    authorId: {
        type: ObjectId,
        ref: "user"
    },
    postId: {
        type: ObjectId,
        ref: "post"
    },
    comment: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    DeletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

const Secret_Key = "Atg-end-to-end-encryption"
commentSchema.plugin(encryption, { secret: Secret_Key, encryptedFields: ["comment"] })
module.exports = mongoose.model('comment', commentSchema)