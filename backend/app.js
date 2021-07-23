const express = require('express');
const bodyParser = require('body-parser');

const placeRoutes = require('./routes/places-routes');



const app = express();

// Middleware -- on app 

app.use(placeRoutes);



app.listen(5000);