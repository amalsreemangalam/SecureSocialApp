const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({
    authorId: {
        type: ObjectId,
        ref: "user"
    },
    postId:{
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
        default:null
    }
}, { timestamps:true })

module.exports = mongoose.model('comment', commentSchema)