const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

const User = require('../models/user');  // User Model

const Dummy_Users = [
    {
        id: "u1",
        name: "Mridul",
        email: "test@test.com",
        password: "tester"
    }
];



const getUsers = (req, res, next) => {
    res.json({ users: Dummy_Users });
}

const signUp = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError("Please check your name / email / password!", 422);
    }

    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try later!', 500
        );
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError(
            'User already exists, try logging in!', 422
        );
        return next(error);
    }

    const newUser = new User({
        name,
        email,
        image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Greist_Building.JPG',
        places
    });

    try {
        await newUser.save();
    }
    catch (err) {
        const error = new HttpError(
            'Something went wrong cannot sign up user!', 500
        );
    }

    res.status(201).json({ user: newUser.toObject({ getters: true }) }); // getter : true remove the _id with id that mongo db creates by default
}


const login = (req, res, next) => {

    const { email, password } = req.body;

    const identifiedUser = Dummy_Users.find(user => user.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError("Could not identify user! Please check email and password again!", 401);
    }

    res.json({ message: "LoggedIn" });
}



exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;