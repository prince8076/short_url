const mongoose = require('mongoose');
const { emit } = require('./url');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,

    },
    role:{
        type: String,
        required: true,
        default:"NORMAL",

    },

    password:{
        type:String,
        required:true,

    }
},{timestamps:true})


const User = mongoose.model('user',userSchema); //model
module.exports= User;