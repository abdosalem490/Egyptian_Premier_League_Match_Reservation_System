const Match = require('../models/match');


module.exports.mainPage = async (req, res) => {
    const matches = await Match.find({});
    matches.sort((ele1, ele2) => {
        return ele1.matchDate - ele2.matchDate;
    });
    matches.filter(match => {
        return match.matchDate >= new Date();
    });
    res.render('matches/main', { matches, title: 'matches', displaySearchInput: true });
}