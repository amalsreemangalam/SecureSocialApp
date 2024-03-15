const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const postSchema = new mongoose.Schema({
    authorId:{
        type: ObjectId,
        ref: 'user',
        require:true
    },
    post:{
        type: String,
        require:true
    },
    likes:[{
            type: ObjectId,
            ref: 'user'
        }],
    isDeleted:{
        type: Boolean,
        default: false
    },
    DeletedAt:{
        type: Date,
        default: null
    }
},
    {timestamps: true})

module.exports = mongoose.model('post', postSchema)