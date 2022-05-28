const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../models/userModel.js');
const multer = require('multer');

router.use(express.static('uploads'));

///////////////////////////////////////////////////////////
// Create user
router.post('/create', async (req, res) => {
    try {
        const createUser = await User.create({
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
        res.json(createUser);
    } catch (error) {
        console.error(error);
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    let user;
    try {
        user !== null ? (user = await User.findById(req.params.id)) : res.json('User not found!');
    } catch (error) {
        console.error(error);
    }
    res.send(user);
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
    }
});

// Update User
router.patch('/:id', async (req, res) => {
    let user;
    try {
        user !== null ? (user = await User.findById(req.params.id)) : res.json('User not found!');
    } catch (error) {
        console.error(error);
    }
    res.user = user;

    if (req.body.updateFirstName !== undefined) {
        res.user.firstName = req.body.updateFirstName;
    }
    if (req.body.updateSurname !== undefined) {
        res.user.surname = req.body.updateSurname;
    }
    if (req.body.updateCountry !== undefined) {
        res.user.country = req.body.updateCountry;
    }
    if (req.body.updateBirthday !== undefined) {
        res.user.birthday = req.body.updateBirthday;
    }
    if (req.body.selectedGender !== undefined) {
        res.user.gender = req.body.selectedGender;
    }
    if (req.body.selectedHobbies !== undefined) {
        res.user.hobbies = req.body.selectedHobbies;
    }
    if (req.body.imgName !== undefined) {
        res.user.profileImgName = req.body.imgName;
    }
    try {
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
    }
});

// Delete user
// router.delete('/:id', async (req, res) => {
//     let user;
//     console.log('user', user);
//     try {
//         user !== null ? (user = await User.findById(req.params.id)) : res.json('User not found!');
//         console.log('user', user);
//     } catch (error) {
//         console.error(error);
//     }
//     res.user = user;
//     console.log('user', user);

//     try {
//         await res.user.remove();
//     } catch (error) {
//         console.error(error);
//     }
// });

///////////////////////////////////////////////////////////
// image Upload Multer
const imageStorage = multer.diskStorage({
    destination: 'uploads', // Destination to store image
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
        // file.profileImg is name of the field (image), path.extname get the uploaded file extension
    },
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000, // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    },
});

// Image upload
router.post(
    '/uploadProfileImg',
    imageUpload.single('profileImg'),
    (req, res) => {
        res.send(req.file);
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);

module.exports = router;
