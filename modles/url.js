const mongoose = require('mongoose');

//schema
const urlSchema = new mongoose.Schema({
    shortId: {
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory: [{timestamp:{type : Number}}],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, // we are creating checking which user create this id
        ref:"users",
    }
},
    {timestamps:true}
);
//create url
const URL = mongoose.model('url',urlSchema);
module.exports = URL;