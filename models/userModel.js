const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    firstName: String,
    surname: String,
    country: String,
    birthday: String,
    gender: Array,
    hobbies: Array,
    profileImgName: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PostModel',
        },
    ],
});

const model = mongoose.model('UserModel', UserSchema);

module.exports = model;
