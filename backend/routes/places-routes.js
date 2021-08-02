const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'one of the most famous sky scraper in the world',
        location: {
            lat: 40.748480,
            lng: -73.985764
        },
        address: 'Empire State Building, New York, NY 10001, USA',
        creator: 'u1'
    }
];

router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid;        //Holds and object provided by express.js {pid: 'p1'}
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    });

    if (!place) {
        throw new HttpError('Could not find a place for the provided id.', 404);
    }

    res.json({ place }); // { place } = {place : place}
});


router.get('/users/:uid', (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId
    });

    if (!place) {
        return next(new HttpError('Could not find a place for the provided id.', 404))
    }
    res.json({ place });
});

module.exports = router;
