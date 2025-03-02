import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: [true, 'This email should be unique'],
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
    },
});

const User = mongoose.model('User', userSchema);
export default User;