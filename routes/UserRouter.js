const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');

let UsersController = require('../controllers/UserController.js');

router.use(express.static('uploads'));

router.post('/create', UsersController.create);
router.get('/', UsersController.readAll);
router.get('/:id', UsersController.readById);
router.patch('/update', UsersController.update);
router.delete('/delete', UsersController.delete);

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
