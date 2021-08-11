const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

let DUMMY_PLACES = [
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



getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;        //Holds and object provided by express.js {pid: 'p1'}
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    });

    if (!place) {
        throw new HttpError('Could not find a place for the provided id.', 404);
    }

    res.json({ place }); // { place } = {place : place}
}

getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => p.creator === userId);

    if (!places || places.length === 0) {
        return next(new HttpError('Could not find a place for the provided id.', 404))
    }
    res.json({ places });
}

createPlace = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError("Invalid inputs passed check your data!", 422);
    }

    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };
    DUMMY_PLACES.push(createdPlace);   // unshift (createdPlace)
    res.status(201).json({ place: createdPlace })  // Success for successfull post 

};

updatePlaceById = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError("Invalid inputs passed check your data!", 422);
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = { ...DUMMY_PLACES.find(place => place.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(place => place.id === placeId);

    updatedPlace.title = title;
    updatedPlace.description = description;
    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({ place: updatedPlace });

}

deletePlace = (req, res, next) => {
    const placeId = req.params.pid;

    if (!DUMMY_PLACES.find(place => place.id === placeId)) {
        throw new HttpError("Could not find a place with this ID", 404);
    }

    DUMMY_PLACES = DUMMY_PLACES.filter(place => place.id !== placeId);

    res.status(200).json({ message: "Place deleted successfully" });

};


// module.exports =  just for one function / data

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;