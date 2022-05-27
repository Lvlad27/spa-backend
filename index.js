const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
const port = process.env.PORT || 3000;

///////////////////////////////////////////////////////////
// connect to MongoDB
const dbURI =
    'mongodb+srv://lvlad:pgNG0t5Cs7OLXBjJ@cluster0.ehdzu.mongodb.net/?retryWrites=true&w=majority';
mongoose
    .connect(dbURI)
    .then(() =>
        app.listen(port, () => {
            console.log(`Server is up on port ${port}`);
        })
    )
    .catch((error) => console.log(error));

///////////////////////////////////////////////////////////
// use
app.use(cors('http://127.0.0.1:8080'));
app.use(bodyParser.json());
app.use('/dataService', userRoutes);
