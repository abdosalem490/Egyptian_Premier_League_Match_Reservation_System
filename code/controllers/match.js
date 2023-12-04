const Match = require('../models/match');
const utils = require('../utils/time_formatter')


module.exports.mainPage = async (req, res) => {
    let matches = await Match.find({}).populate('matchVenue');
    matches.sort((ele1, ele2) => {
        return ele1.matchDate - ele2.matchDate;
    });
    current_date = new Date();
    matches = matches.filter(match => {
        return match.matchDate.getTime() >= current_date.getTime();

    });
    res.render('matches/main', { matches, utils, title: 'matches', displaySearchInput: true });
}

module.exports.showMatch = async (req, res) => {
    const match = await Match.findById(req.params.id).populate('matchVenue')
    res.render('matches/view', { match, utils, title: 'View Match', displaySearchInput: false });

}

module.exports.deleteMatch = async (req, res) => {
    await Match.findByIdAndDelete(req.params.id)
    res.redirect('/matches');
}