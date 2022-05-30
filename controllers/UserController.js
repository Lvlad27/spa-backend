const User = require('../models/UserModel.js');

let controls = {
    create: async (req, res) => {
        try {
            let newUser = new User(req.body);
            let savedUser = await newUser.save();
            res.json(savedUser);
        } catch (err) {
            res.json({ errors: err });
        }
    },
    readAll: async (req, res) => {
        try {
            let allUsers = await User.find();
            res.json(allUsers);
        } catch (err) {
            res.json({ errors: err });
        }
    },
    readById: async (req, res) => {
        try {
            let user = await User.findById(req.params.id);
            res.json(user);
        } catch (err) {
            res.json({ errors: err });
        }
    },
    update: async (req, res) => {
        try {
            let update = {
                firstName: req.body.updateFirstName,
                surname: req.body.updateSurname,
                country: req.body.updateCountry,
                birthday: req.body.updateBirthday,
                gender: req.body.selectedGender,
                hobbies: req.body.selectedHobbies,
                profileImgName: req.body.imgName,
            };
            options = {};
            let foundUser = await User.findByIdAndUpdate(req.body.id, update);
            res.json(foundUser);
        } catch (err) {
            res.json({ errors: err });
        }
    },
    uploadImg: async (req, res) => {
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
    readAllPosts: async (req, res) => {
        let foundUser = await User.findById(req.params.id).populate('posts');
        res.json(foundUser);
    },
};

module.exports = controls;
