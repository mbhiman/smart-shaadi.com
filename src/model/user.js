const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        maxLength: 15,
        minLength: 3,
        unique: true
    },
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 15,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 15,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true,
        minLength: 8
    },
    gender: {
        type: String,
    },
    about :{
        type: String,
        maxLength: 100
    },
    skills: {
        type: [String]
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;