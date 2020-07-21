// const { Schema } = require("mongoose")

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type : String,
        require: true,
        lowercase:true,
        unique: true
    },
    phone:{
        type:String
    },
    password:{
        type: String
    }
   
},{timestamps: true})

const User = mongoose.model('user', userSchema)
module.exports = User