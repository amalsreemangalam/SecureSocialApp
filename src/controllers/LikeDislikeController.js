const mongoose = require('mongoose')
const postModel = require('../models/postModel')

//todo solve only one like can possible by one person
const likeDislikePost = async (req, res) => {
    try {
        let Id = req.params.postId

        if (!Id) return res.status(400).send({ status: false, message: "PostId not found" })
        if (!mongoose.isValidObjectId) return res.status(400).send({ status: false, message: `invalid ${Id}` });

        let existPost = await postModel.findOne({ _id: Id, isDeleted: false }).lean()
        if (!existPost) return res.status(400).send({ status: false, message: "No Post Found!" })

        //validating liked or not
        //    const index = existPost.likes.indexOf(req.user_Id)
        //    console.log(index, req.user_Id, existPost) 
        //    if(index !== -1){
        //     // existPost.likes.splice(index, 1);
        //     await postModel.findByIdAndUpdate(Id, {$pull:{likes:req.user_Id}})
        //    }else{
        //     await postModel.findByIdAndUpdate(Id, {$push:{likes:req.user_Id}})
        //    }

        let saveData = await postModel.findOne({ $and: [{ _id: Id }, { likes: req.user_Id }] })
        if (saveData) {
            await postModel.findByIdAndUpdate(Id, { $pull: { likes: req.user_Id } })
        } else {
            await postModel.findByIdAndUpdate(Id, { $push: { likes: req.user_Id } })
        }

        res.status(200).send({status:true, message:"success"})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.likeDislikePost = likeDislikePost