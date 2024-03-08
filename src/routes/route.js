const express = require('express')
const { CreateUser } = require('../controllers/userController')
const router = express.Router()


router.get('/', (req, res) => {
    res.status(200).send({ status: true, message: "This api is working fine !" })
})

router.post("/createUser", CreateUser)
module.exports = router