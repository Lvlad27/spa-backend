const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');

let PostsController = require('../controllers/PostController.js');

router.use(express.static('posts'));

// image Upload Multer
const imageStorage = multer.diskStorage({
    destination: 'posts', // Destination to store image
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

router.get('/', PostsController.readAll);
router.post('/create', PostsController.create);
router.post('/upload', imageUpload.single('postImageInput'), PostsController.upload);
// router.patch('/upload', imageUpload.single('postImageInput'),  PostsController.upload);

module.exports = router;
