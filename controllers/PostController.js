const Post = require('../models/PostModel.js');

let controls = {
    create: async (req, res) => {
        try {
            let newPost = new Post(req.body);
            let savedPost = await newPost.save();
            res.json(savedPost);
        } catch (err) {
            res.json({ errors: err });
        }
    },
    readAll: async (req, res) => {
        try {
            let allPosts = await Post.find().populate({ path: 'postedBy', model: 'UserModel' });
            res.json(allPosts);
        } catch (err) {
            res.json({ errors: err });
        }
    },
    upload: async (req, res) => {
        try {
            res.send(req.file);
        } catch (err) {
            res.json({ errors: err });
        }
    },
    delete: async (req, res) => {
        try {
            let deletedUser = await User.findOneAndDelete({ email: req.body.email }, req.body);
            res.json(deletedUser);
        } catch (err) {
            res.json({ errors: err });
        }
    },
};

module.exports = controls;
