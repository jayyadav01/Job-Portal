const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required : true,
    },
    email : {
        type: String,
        required : true,
    },
    phoneNumber : {
        type: Number,
        required : true
    },
    password : {
        type: String,
        required : true,
    },
    role : {
        type : String,
        enum : ['recruiter','student'],
        required : true
    },
    profile : {
        bio: {type: String},
        skills: [{type: String}],
        resume: {type: String},
        resumeOriginalName: {type: String},
        company: {   
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        profilePhoto: {
            type: String,
            default: ''
        },
        profilePhotoOriginalName: {type: String}
    }
},{timestamps : true});

const User = mongoose.model('User', userSchema)
module.exports = User