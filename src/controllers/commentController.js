const mongoose = require('mongoose');
const commentModel = require("../models/commentModel");
const postModel = require('../models/postModel');


const createComment = async (req, res) => {
    try {
        let data = req.body;
        data.postId = req.params.postId
        data.authorId = req.user_Id

        let {comment, postId} = data;
        console.log(data)

        if(Object.keys(data).length == 0) return res.status(404).send({status:false, message:"body required"})
        if(!comment) return res.status(404).send({status: false, message:"provide comment"})
        if(!postId) return res.status(404).send({status: false, message:`provide ${postId} in param`})
        if(!mongoose.isValidObjectId(postId)) return res.status(404).send({status:false ,message:`invalid ${postId}`});

        const existPost = await postModel.findOne({_id:postId, isDeleted:false})

        if(!existPost) return res.status(404).send({status:false, message:`Post not found or deleted`});

        const savedData =  await commentModel.create(data)

        await postModel.findOneAndUpdate({_id:postId },{$push:{comments:savedData._id}})

        res.status(201).send({status:true, message:`Comment added successfully on Post with id :${postId}` ,data:savedData })
      
    } catch (error) {
        res.status(500).send({status:false, message:error.message});
    }
}

module.exports.createComment = createComment;

//what if token present but user/author deleted