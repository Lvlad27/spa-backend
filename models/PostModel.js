const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
    },
    photo: {
        type: String,
        lowercase: true,
    },
    postDate: {
        type: Date,
        default: Date.now(),
    },
});

const model = mongoose.model('PostModel', PostSchema);

module.exports = model;
