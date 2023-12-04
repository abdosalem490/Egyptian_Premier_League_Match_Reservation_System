const router = require('express').Router(); // related to routes
const matches = require('../controllers/match');
// const {genders, roles} = require('../constants');


router.route('/')
    .get(matches.mainPage);
// .post((req, res) => {console.log(req.body);  res.send("hello")});    // for post requests

router.route('/:id')
    .get(matches.showMatch)
    .delete(matches.deleteMatch)

module.exports = router;