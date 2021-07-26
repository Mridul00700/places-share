const express = require('express');
const bodyParser = require('body-parser');

const placeRoutes = require('./routes/places-routes');



const app = express();

// Middleware -- on app 

app.use('/api/places', placeRoutes);  // => /api/places/ ....



app.listen(5000);