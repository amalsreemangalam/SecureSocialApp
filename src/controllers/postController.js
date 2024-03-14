const postModel = require('../models/postModel');
const userModel = require('../models/userModel');
var mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const createPost = async (req, res, next) => {
    try {
            const data  = req.body
            const {post,authorId} = data;

            if(Object.keys(data).length == 0) return res.status(404).send({status:false, message:"body require!"})
            if(!post) return res.status(404).send({status:false, message:"post require!"})
            if(!authorId) return res.status(404).send({status:false, message:"authorId require!"})
            if(!mongoose.isValidObjectId(authorId)) return res.status(404).send({status:false, message:"author id is not valid"})

            let checkAuthor = await userModel.findById(authorId)
            if(!checkAuthor) return res.status(404).send({status:false, message:"author not found"})

            const savedData = await postModel.create(data)
            res.status(201).send({ status: true, message: savedData })

    } catch (error) {
        res.status(500).send({status:false, message:error.message});
    }
}

const getPostById = async (req, res) => {
    try {
        let postId = req.params.postId

        if(!postId) return res.status(404).send({status:false, message:"postId require!"})
        if(!mongoose.isValidObjectId(postId)) return res.status(404).send({status:false, message:"Invalid postId"}) 

        const savedData = await postModel.findOne({_id:postId})

        if(!savedData) return res.status(404).send({status: false, message:'No Data Found'})
        if(savedData.isDeleted == true) return res.status(404).send({status:false, message:"Post id deleted!"})

        res.status(200).send({ status: true, message: savedData })

    } catch (error) {
        res.status(500).send({status:false, message:error.message});
    }
}




module.exports.createPost = createPost
module.exports.getPostById = getPostById
