const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const randomstring = require('randomstring')
const nodemailer = require('nodemailer')

const JWT_SECRETKEY = "Registration_key"

const CreateUser = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {
        let data = req.body

        if (!data.username) return res.status(400).send({ status: false, message: "username require!" })
        if (!data.Email) return res.status(400).send({ status: false, message: "Email require!" })
        if (!data.password) return res.status(400).send({ status: false, message: "password require!" })

        let exist_Email = await userModel.findOne({ Email: data.Email })
        if (exist_Email) return res.status(400).send({ status: false, message: "Email already exist!" })
        let exist_username = await userModel.findOne({ username: data.username })
        if (exist_username) return res.status(400).send({ status: false, message: "username already exist!" })

        const salt = await bcrypt.genSalt(10)
        const secure_Password = await bcrypt.hash(data.password, salt)
        const saveData = await userModel.create({ username: data.username, Email: data.Email, password: secure_Password })

        const token = jwt.sign({ user_Id: saveData.id }, JWT_SECRETKEY)
        res.setHeader('atg-api-key', token);

        res.status(200).send({ status: true, data: saveData, token: token })

    } catch (error) {
        res.status(500).send({ statue: false, message: error.message })
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {

        let data = req.body

        if (!data.username) return res.status(400).send({ status: false, message: "username require" })
        if (!data.password) return res.status(400).send({ status: false, message: "password require" })

        let validate_Username = await userModel.findOne({ username: data.username })
        if (!validate_Username) return res.status(404).send({ status: false, message: "Invalid user!" })

        let password_Compare = await bcrypt.compare(data.password, validate_Username.password)
        if (!password_Compare) return res.status(404).send({ status: false, message: "Invalid password!" })

        let token = jwt.sign({ user_Id: validate_Username.id }, JWT_SECRETKEY)
        res.setHeader("atg-api-key", token)

        res.status(200).send({ status: true, message: "Login Successfull!", token: token })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const Forget_Password = async (req, res) => {
    try {

        const data = req.body
        const randomString = randomstring.generate()

        if (!data.Email) return res.status(400).send({ status: false, message: "Email require!" })

        let exist_Email = await userModel.findOne({ Email: data.Email })
        if (!exist_Email) return res.status(404).send({ status: false, message: "Email does not exist!" })

        const updateUser = await userModel.updateOne({ Email: data.Email }, { $set: { token: randomString } })

        //nodemailer
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'sumokhan76342@gmail.com',
                pass: 'gsml ylbz zkgk mwae'
            }
        });

        const info = await transporter.sendMail({
            from: '"Sumit kumar"', // sender address
            to: data.Email, // list of receivers
            subject: "Password Reset", // Subject line
            text: "The password reset code below", // plain text body
            html: '<p><h2>Hii, ' + exist_Email.username + '</h2> Please copy thie link <a href="http://localhost:4000/reset?token=' + randomString + '">Link</a> and reset your password</p>' // html body
        }, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log("msg sent", info.response)
            }
        });

        res.status(200).send({ status: true, message: "Code sent!" })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const Reset_Password = async (req, res) => {
    try {
        let token = req.query.token;
        if (!token) return res.status(404).send({ statue: false, message: "token required!" })
        let validateUser = await userModel.findOne({ token: token })
        if (!validateUser) return res.status(400).send({ status: false, message: "token not valid or expired" })

        let data = req.body
        const { password } = data

        if (!password) return res.status(400).send({ status: false, message: "Password require" })

        const salt = await bcrypt.genSalt(10)
        const secure_Password = await bcrypt.hash(password, salt)
        const saveData = await userModel.findByIdAndUpdate({ _id: validateUser._id }, { $set: { password: secure_Password, token: "" } }, { new: true })

        res.status(200).send({ status: true, message: saveData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })

    }
}

module.exports.CreateUser = CreateUser
module.exports.loginUser = loginUser
module.exports.Forget_Password = Forget_Password
module.exports.Reset_Password = Reset_Password