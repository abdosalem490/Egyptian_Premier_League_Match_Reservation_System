const passport = require('passport'); // for authentication
const User = require('../models/user'); // for the user model
const { genders, roles } = require('../constants');
const utils = require('../utils/time_formatter');

module.exports.showRegisterPage = async (req, res) => {
    res.render('users/register', { title: 'Register', genders: genders, roles: roles, displaySearchInput: false })
}

module.exports.addUserToBeApproved = async (req, res) => {

    // req.files.image.mv(__dirname + '/../public/resources/uploads/' + req.files.image.name);
    // images = req.files.map(file => ({ url: '/resources/uploads/' + file.filename, filename: file.filename }));

    const user = new User({
        'username': req.body.email, // this is for passport authentication
        'Username': req.body.username,
        'FirstName': req.body.first_name,
        'LastName': req.body.last_name,
        'BirthDate': new Date(req.body.birth_date),
        'Gender': req.body.gender,
        'City': req.body.city,
        'Address': req.body.address,
        'Email': req.body.email,
        'UserType': req.body.role,
        'ProfilePicture': { url: '/resources/uploads/' + req.files[0].filename, filename: req.files[0].filename },
        'isApproved': false,
    });

    const user_to_be_accepted = await User.register(user, req.body.password);

    // TODO: show page to make him till till be approved

    res.send({ path: '/account_error' });
}

module.exports.showErrMessage = async (req, res) => {
    res.render('error', { title: 'Error', displaySearchInput: false, err_message: "wait till the admin approves you" })
}

module.exports.showLoginPage = async (req, res) => {
    res.render('users/login', { title: 'Login', displaySearchInput: false })
}


module.exports.login = async (req, res) => {
    const user = await User.find({ 'username': req.body.username });
    if (user[0].isApproved) {
        res.redirect('/matches');
    } else {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/account_error');
        })
    }
}


module.exports.showAccountPage = async (req, res) => {
    // const user = User.findById(req.params.id);
    const user = res.locals.current_user;
    res.render('users/details', { user, genders, current_page: 0, utils, title: 'Account', displaySearchInput: false })
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        // req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
}

module.exports.modifyDetails = async (req, res) => {
    const user = res.locals.current_user;
    const received_data = req.body;
    const date_parts = received_data.birth_date.split('/');
    const data_to_update = {
        'FirstName': received_data.first_name,
        'LastName': received_data.last_name,
        'BirthDate': new Date(date_parts[2], date_parts[1] - 1, date_parts[0]),
        'Gender': received_data.gender,
        'City': received_data.city,
        'Address': received_data.address,
    }
    if (req.files.length) {
        data_to_update['ProfilePicture'] = { url: '/resources/uploads/' + req.files[0].filename, filename: req.files[0].filename };
    }
    await user.updateOne(data_to_update);
    res.redirect('/account');
}

module.exports.showReservedSeats = async (req, res) => {
    const user = res.locals.current_user;
    res.render('users/reserved_seats', { user, utils, current_page: 1, title: 'reserved seats', displaySearchInput: true });
}

module.exports.showNotifications = async (req, res) => {
    const users = await User.find({ '_id': { $ne: res.locals.current_user._id }, 'isApproved': false });

    users.sort((ele1, ele2) => {
        return ele1.BirthDate - ele2.BirthDate;
    });

    res.render('users/notifications', { users, utils, current_page: 2, title: 'Notifications', displaySearchInput: true });
}

module.exports.deleteAccount = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/delete_user');
}

module.exports.showDeleteUserPage = async (req, res) => {
    const users = await User.find({ '_id': { $ne: res.locals.current_user._id } });
    users.sort((ele1, ele2) => {
        return ele1.BirthDate - ele2.BirthDate;
    });
    res.render('users/delete_user', { users, utils, current_page: 3, title: 'delete user', displaySearchInput: true });
}

module.exports.disapproveUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/notifications');
}

module.exports.approveUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, { 'isApproved': true });
    res.redirect('/notifications');
}