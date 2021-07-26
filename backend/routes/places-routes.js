const express = require('express');

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
    const placeId = req.params.pid //Holds and object provided by express.js {pid: 'p1'}
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    });
    res.json({ place }); // { place } = {place : place}
});

module.exports = router;