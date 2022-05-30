const express = require('express');
const router = express.Router();

let PostsController = require('../controllers/PostController.js');

router.get('/', PostsController.readAll);
router.post('/:id/create', PostsController.create);
router.post('/upload', imageUpload.single(''), PostsController.upload);