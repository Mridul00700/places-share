const express = require('express');
const usersControllers = require('../controllers/users-controller');
const { check } = require('express-validator');

const router = express.Router();



router.get('/', usersControllers.getUsers);

router.post('/signUp', [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({ min: 6 })], usersControllers.signUp);

router.post('/login', usersControllers.login);


module.exports = router;
