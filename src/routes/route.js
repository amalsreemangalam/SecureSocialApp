const express = require('express')
const { CreateUser, loginUser, Forget_Password, Reset_Password } = require('../controllers/userController')
const { createPost, getPostById, getPost, updatePostById } = require('../controllers/postController')
const { authentication } = require('../middleware/auth')
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
router.post("/createPost", createPost)
router.get("/posts/:postId", getPostById)
router.get("/posts",getPost)
router.put("/posts/:postId",authentication, updatePostById)
module.exports = router