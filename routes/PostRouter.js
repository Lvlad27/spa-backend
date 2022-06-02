const express = require('express');
const router = express.Router();

let PostsController = require('../controllers/PostController.js');

router.get('/', PostsController.readAll);
router.post('/:id/create', PostsController.create);
// router.post('/upload', imageUpload.single('postImageInput'), PostsController.upload);
// router.patch('/upload', imageUpload.single('postImageInput'),  PostsController.upload);
