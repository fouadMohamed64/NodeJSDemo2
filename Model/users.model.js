const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minLength: [3 , 'You must provide more than 3 chars'], 
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

const usersModel = mongoose.model('user' , userSchema);
module.exports = usersModel;