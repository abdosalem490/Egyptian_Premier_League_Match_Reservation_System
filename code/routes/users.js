const router = require('express').Router(); // related to routes
const passport = require('passport'); // for authentication
const User = require('../models/user'); // for the user model
const { genders, roles } = require('../constants');



router.route('/register')
    .get((req, res) => { res.render('users/register', { title: 'Register', genders: genders, roles: roles, displaySearchInput: false }) })
    .post((req, res) => { console.log(req.body); res.send("hello") });    // for post requests


module.exports = router;