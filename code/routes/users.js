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
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.route('/account')
    .get(users.showAccountPage)
    .put(upload.array('image'), users.modifyDetails);

router.route('/account/:id')
    .delete(users.deleteAccount);

router.route('/notifications')
    .get(users.showNotifications);

router.route('/reserved_seats')
    .get(users.showReservedSeats)
    .delete(users.cancelReservation);

router.route('/delete_user')
    .get(users.showDeleteUserPage);

router.route('/logout')
    .get(users.logout);

router.route('/account_error')
    .get(users.showErrMessage);

router.route('/account/:id/approve')
    .put(users.approveUser);

router.route('/account/:id/disapprove')
    .put(users.disapproveUser);


module.exports = router;