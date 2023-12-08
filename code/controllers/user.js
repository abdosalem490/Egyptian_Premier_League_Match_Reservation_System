const passport = require('passport'); // for authentication
const User = require('../models/user'); // for the user model
const { genders, roles } = require('../constants');

module.exports.showRegisterPage = async (req, res) => {
    res.render('users/register', { title: 'Register', genders: genders, roles: roles, displaySearchInput: false })
}

module.exports.addUserToBeApproved = async (req, res) => {

    req.files.image.mv(__dirname + '/../public/resources/uploads/' + req.files.image.name);
    const user = new User({
        'Username': req.body.username,
        'FirstName': req.body.first_name,
        'LastName': req.body.last_name,
        'BirthDate': new Date(req.body.birth_date),
        'Gender': req.body.gender,
        'City': req.body.city,
        'Address': req.body.address,
        'Email': req.body.email,
        'UserType': req.body.role,
        'ProfilePicture': { url: '/resources/uploads/' + req.files.image.name, filename: req.files.image.name },
        'isApproved': false,
    });

    await user.save();
    res.send({ path: '/matches' });
}

module.exports.showLoginPage = async (req, res) => {
    res.render('users/login', { title: 'Login', displaySearchInput: false })
}


module.exports.login = async (req, res) => {
    console.log(req.body);
    res.send("succes");
}


module.exports.showAccountPage = async (req, res) => {
    res.render('users/details', { title: 'Account', displaySearchInput: false })

}