const express = require('express');
const bodyParser = require('body-parser');

const placeRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes');

const HttpError = require('./models/http-error');

const mongoose = require('mongoose');

const app = express();

// Middleware -- on app 

app.use(bodyParser.json()); // it will catch any json data and convert it to javascript data structures like object.

app.use('/api/places', placeRoutes); // => /api/places/ ....
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route", 404);
    throw error;
});


app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || "An unknown error occurred!" });
});

// Async function connect
mongoose
    .connect()
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });


