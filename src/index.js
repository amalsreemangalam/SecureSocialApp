const express = require('express')
const cors = require("cors")
const route = require('./routes/route')

const app = express()
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://sumit:sumit@cluster0.8dflsuw.mongodb.net/ATG")
    .then(() => {
        console.log("MongoDb is connected")
    }).catch((err) => { console.log(err.message) })

app.use('/', route)

port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})