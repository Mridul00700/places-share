const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');
// const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');

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

    console.log('Create Place', createdPlace)

    let user;

    try {
        user = await User.findById(creator);
    } catch (err) {
        const error = new HttpError(
            'Creating place failed please try again',
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id', 404);
        return next(error);
    }
    console.log(user);

    // DUMMY_PLACES.push(createdPlace);   // unshift (createdPlace)
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdPlace.save({ session: session });
        user.places.push(createdPlace);
        await user.save({ session: session });

        await session.commitTransaction();
        // await createdPlace.save();
    } catch (err) {
        const error = new HttpError(
            'Creating Place Failed, please try again',
            500
        );
        return next(error)
    }
    res.status(201).json({ place: createdPlace })  // Success for successfull post 
};


updatePlaceById = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid inputs passed check your data!", 422));
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong could not update place', 500
        );
        return next(error);
    }
    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        const error = new HttpError(
            'Could not save the updated place! something went wrong!', 500
        );
        return next(error);
    }

    res.status(200).json({ place: place.toObject({ getters: true }) });

}

deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;

    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong could not delete place', 500
        );
        return next(error);
    }

    try {
        await place.remove();
    } catch (err) {
        const error = new HttpError('Something went wrong could not delete place', 500
        );
        return next(error);
    }

    res.status(200).json({ message: "Place deleted successfully" });

};


// module.exports =  just for one function / data

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;