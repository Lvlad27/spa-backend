const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserRouter = require('./routes/UserRouter.js');
const UserRouter = require('./routes/PostRouter.js');

const port = process.env.PORT || 3000;

// connect to DB
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ehdzu.mongodb.net/?retryWrites=true&w=majority`;
mongoose
    .connect(dbURI)
    .then(() =>
        app.listen(port, () => {
            console.log(`Server is up on port ${port}`);
        })
    )
    .catch((error) => console.log(error));

// Middleware
app.use(cors('http://127.0.0.1:8080'));
app.use(bodyParser.json());

// Routes
app.use('/dataService', UserRouter);
app.use('/posts', PostRouter);
