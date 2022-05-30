const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');

let UsersController = require('../controllers/UserController.js');
let PostsController = require('../controllers/PostController.js');

router.use(express.static('uploads'));

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

router.get('/', UsersController.readAll);
router.get('/:id', UsersController.readById);
router.get('/:id/posts', UsersController.readAllPosts);
router.post('/create', UsersController.create);
router.post('/uploadProfileImg', imageUpload.single('profileImg'), UsersController.uploadImg);
router.patch('/update', UsersController.update);
router.delete('/delete', UsersController.delete);

router.get('/posts', PostsController.readAll);
router.post('/posts/:id/create', PostsController.create);
router.post('/posts/upload', imageUpload.single(''), PostsController.upload);
///////////////////////////////////////////////////////////

module.exports = router;
