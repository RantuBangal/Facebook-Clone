const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    coverPhoto: { type: String, default: '' },
    dateOfBirth: { type: String, default: '' }
}, {
    versionKey: false
});
  
// creating user modely
const UserModel = mongoose.model('users', userSchema);

module.exports = {
    UserModel
};

