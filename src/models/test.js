const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model("test", testSchema)