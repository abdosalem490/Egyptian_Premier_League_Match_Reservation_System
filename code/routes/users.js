const router = require('express').Router(); // related to routes
const users = require('../controllers/user');
const passport = require('passport');

const multer = require('multer');
const upload = multer({ dest: './public/resources/uploads/' });

router.route('/register')
    .get(users.showRegisterPage)
    .post(upload.array('image'), users.addUserToBeApproved);    // for post requests

router.route('/login')
    .get(users.showLoginPage)
    .post(passport.authenticate('local', { failureRedirect: '/login' }), users.login);

// router.route('/users/:id/account')
router.route('/account')
    .get(users.showAccountPage)
    .put(upload.array('image'), users.modifyDetails);

router.route('/notifications')
    .get(users.showNotifications);

router.route('/reserved_seats')
    .get(users.showReservedSeats);

router.route('/logout')
    .get(users.logout);

module.exports = router;