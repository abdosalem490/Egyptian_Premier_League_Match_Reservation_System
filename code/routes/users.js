const router = require('express').Router(); // related to routes
const users = require('../controllers/user');

const multer = require('multer');
const upload = multer({ dest: './public/resources/uploads/' });

router.route('/register')
    .get(users.showRegisterPage)
    .post(upload.array('image'), users.addUserToBeApproved);    // for post requests

router.route('/login')
    .get(users.showLoginPage)
    .post(users.login);

router.route('/account')
    .get(users.showAccountPage);

module.exports = router;