const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');

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

const signUp = (req, res, next) => {
    const { name, email, password } = req.body;

    const newUser = {
        id: uuid(),
        name,
        email,
        password
    };

    Dummy_Users.push(newUser);

    res.status(201).json({ user: newUser });
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