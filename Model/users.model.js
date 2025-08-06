const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    },
    role: {
        type: String,
        enum: ['user' , 'admin'],
        default: 'user'
    }
})

userSchema.pre('save' , async function (){
    let salt = await bcrypt.genSalt(10);
    console.log(this)  // the current document {userName:.. , email: ,,, password: 123456}
    let hashedPassword = await bcrypt.hash( this.password , salt);
    this.password = hashedPassword;
})

const usersModel = mongoose.model('user' , userSchema);
module.exports = usersModel;