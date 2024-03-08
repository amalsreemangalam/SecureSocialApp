const express = require('express')
const { CreateUser, loginUser } = require('../controllers/userController')
const router = express.Router()


router.get('/', (req, res) => {
    res.status(200).send({ status: true, message: "This api is working fine !" })
})

router.post("/createUser", CreateUser)
router.get("/login",loginUser)
module.exports = router