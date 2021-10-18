const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');

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



getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;        //Holds and object provided by express.js {pid: 'p1'}
    let place;
    try {
        place = await Place.findById(placeId)
    }
    catch (err) {
        const error = new HttpError(
            'Something went wrong could not find a place', 500
        );
        return next(error);
    }
    if (!place) {
        const error = new HttpError('Could not find a place for the provided id.', 404);
        return next(error);
    }

    res.json({ place: place.toObject({ getters: true }) }); // { place } = {place : place}
}

getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let places
    try {
        places = await Place.find({ creator: userId })
    } catch (err) {
        const error = new HttpError(
            'Something went wrong!', 500
        );
        return next(error)
    }

    if (!places || places.length === 0) {
        return next(new HttpError('Could not find a place for the provided id.', 404))
    }
    res.json({ places: places.map(place => place.toObject({ getters: true })) });
}

createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid inputs passed check your data!", 422));
    }

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://www.urbansplatter.com/wp-content/uploads/2014/07/Empire-State-Building-2013.jpg',
        creator
    });



    // DUMMY_PLACES.push(createdPlace);   // unshift (createdPlace)
    try {
        await createdPlace.save();
    } catch (err) {
        const error = new HttpError(
            'Creating Place Failed, please try again',
            500
        );
        return next(error)
    }
    res.status(201).json({ place: createdPlace })  // Success for successfull post 

};

updatePlaceById = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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