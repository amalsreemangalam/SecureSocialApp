const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRETKEY = "Registration_key"

const CreateUser = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {
        let data = req.body

        if (!data.username) return res.status(400).send({ status: false, message: "username require!" })
        if (!data.email) return res.status(400).send({ status: false, message: "email require!" })
        if (!data.password) return res.status(400).send({ status: false, message: "password require!" })

        let exist_user = await userModel.findOne({ Email: data.email })
        console.log(exist_Email, data)
        if (exist_Email) return res.status(404).send({ status: false, message: "Email already exist" })

        const salt = await bcrypt.genSalt(10)
        const secure_Password = await bcrypt.hash(data.password, salt)
        const saveData = await userModel.create({ username: data.username, Email: data.email, password: secure_Password })

        const token = jwt.sign({ userId: saveData.id }, JWT_SECRETKEY)
        res.setHeader('ATG-API-KEY', token);

        res.status(200).send({ status: true, token: token })

    } catch (error) {
        res.status(500).send({ statue: false, message: error.message })
    }
}

module.exports.CreateUser = CreateUser