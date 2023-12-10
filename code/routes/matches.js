const router = require('express').Router(); // related to routes
const matches = require('../controllers/match');
// =const {genders, roles} = require('../constants');


router.route('/')
    .get(matches.mainPage)
    .post(matches.addMatch);
// .post((req, res) => {console.log(req.body);  res.send("hello")});    // for post requests

router.route('/new')
    .get(matches.newMatch);

router.route('/:id')
    .get(matches.showMatch)
    .delete(matches.deleteMatch)
    .put(matches.updateMatch);

router.route('/:id/edit')
    .get(matches.showEditMatch);

router.route('/:id/view_seats')
    .get(matches.showSeats);

module.exports = router;