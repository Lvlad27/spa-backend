const User = require('../models/UserModel.js');

let controls = {
    create: async (req, res) => {
        try {
            let newUser = new User({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                surname: req.body.surname,
                country: req.body.country,
                birthday: req.body.birthday,
                gender: req.body.gender,
                hobbies: req.body.hobbies,
                profileImgName: req.body.profileImgName,
            });
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
            let filter = { id: req.body.id };
            let update = {
                firstName: req.body.updateFirstName,
                surname: req.body.updateSurname,
                country: req.body.updateCountry,
                birthday: req.body.updateBirthday,
                gender: req.body.selectedGender,
                hobbies: req.body.selectedHobbies,
                profileImgName: req.body.imgName,
            };

            let foundUser = await User.findOneAndUpdate(filter, update);
            res.json(foundUser);
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
