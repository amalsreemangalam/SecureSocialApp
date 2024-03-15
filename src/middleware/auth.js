const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const JWT_SECRETKEY = "Registration_key"

const authentication = async (req, res, next) => {
    try {
        let token = req.headers["x-api-key"]
        console.log(token)

        if (!token) return res.status(400).send({ status: false, message: "please provide a token" });

        jwt.verify(token, JWT_SECRETKEY, (err, decode) => {
            if (err) {
                // console.log(err)
                return res.status(400).send({ status: false, message: err.message });
            }
            else{
                const {user_Id} = decode
                req.user_Id = user_Id
                // console.log(user_Id)
                next();
            }
           
        })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
        console.log(error)
    }
}

module.exports.authentication = authentication;