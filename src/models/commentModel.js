const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({
    authorId: {
        type: ObjectId,
        ref: user
    },
    comment: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        dafault: false
    },
    DeletedAt: {
        type: Boolean,
        default: false
    }
}, { timestamps:true })

module.exports = mongoose.model('comment', commentSchema)