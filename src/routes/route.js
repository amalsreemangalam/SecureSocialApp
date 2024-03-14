const express = require('express')
const { CreateUser, loginUser, Forget_Password, Reset_Password } = require('../controllers/userController')
const { createPost, getPostById } = require('../controllers/postController')
const router = express.Router()


router.get('/', (req, res) => {
    res.status(200).send({ status: true, message: "This api is working fine !" })
})

router.post("/createUser", CreateUser)
router.get("/login", loginUser)
router.post("/forget", Forget_Password)
router.get("/reset", Reset_Password)

router.post("/createPost", createPost)
router.get("/posts/:postId", getPostById)
module.exports = router