const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
        },
        photo: {
            type: String,
            lowercase: true,
        },
    },
    { timestamps: true }
);

const model = mongoose.model('PostModel', PostSchema);

module.exports = model;
