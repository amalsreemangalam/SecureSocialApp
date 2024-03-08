const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRETKEY = "Registration_key"

const CreateUser = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {
        let data = req.body

        if (!data.username) return res.status(400).send({ status: false, message: "username require!" })
        if (!data.Email) return res.status(400).send({ status: false, message: "Email require!" })
        if (!data.password) return res.status(400).send({ status: false, message: "password require!" })

        let exist_Email = await userModel.findOne({Email:data.Email})
        if(exist_Email) return res.status(400).send({status:false, message:"Email already exist!"})
        let exist_username = await userModel.findOne({username:data.username})
        if(exist_username) return res.status(400).send({status:false, message:"username already exist!"})

        const salt = await bcrypt.genSalt(10)
        const secure_Password = await bcrypt.hash(data.password, salt)
        const saveData = await userModel.create({ username: data.username, Email: data.Email, password: secure_Password })

        const token = jwt.sign({ user_Id: saveData.id }, JWT_SECRETKEY)
        res.setHeader('ATG-API-KEY', token);

        res.status(200).send({ status: true, token: token })

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

        let validate_Username = await userModel.findOne({username:data.username})
        if(!validate_Username) return res.status(404).send({status:false, message:"Invalid user!"})

        let password_Compare = await bcrypt.compare(data.password, validate_Username.password)
        if(!password_Compare)  return res.status(404).send({status:false, message:"Invalid password!"})

        let token = jwt.sign({user_Id:validate_Username.id}, JWT_SECRETKEY)
        res.setHeader("ATG-API-KEY",token)

        res.status(200).send({status:true, message:"Login Successfull!", token:token})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.CreateUser = CreateUser
module.exports.loginUser = loginUser