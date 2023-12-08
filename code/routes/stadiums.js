const router = require('express').Router(); // related to routes
const stadiums = require('../controllers/stadium');

const multer = require('multer');
const upload = multer({ dest: './public/resources/uploads/' });

router.route('/')
    .post(upload.array('images'), stadiums.addStadium);


router.route('/new')
    .get(stadiums.newStadium);

module.exports = router;