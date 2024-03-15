const express = require('express')
const { CreateUser, loginUser, Forget_Password, Reset_Password } = require('../controllers/userController')
const { createPost, getPostById, getPost, updatePostById, deletePostById } = require('../controllers/postController')
const { authentication } = require('../middleware/auth')
const { likePost, likeDislikePost } = require('../controllers/LikeDislikeController')
const { createComment } = require('../controllers/commentController')
const router = express.Router()


router.get('/', (req, res) => {
    res.status(200).send({ status: true, message: "This api is working fine !" })
})

//user
router.post("/createUser", CreateUser)
router.get("/login", loginUser)
router.post("/forget", Forget_Password)
router.get("/reset", Reset_Password)

//post
router.post("/createPost", authentication, createPost)
router.get("/posts/:postId", authentication, getPostById)
router.get("/posts", authentication, getPost)
router.put("/posts/:postId", authentication, updatePostById)
router.put("/delete/:postId", authentication, deletePostById)

//likes
router.put('/likes/:postId', authentication, likeDislikePost)

//comments
router.post("/comment/:postId", authentication, createComment)
module.exports = router