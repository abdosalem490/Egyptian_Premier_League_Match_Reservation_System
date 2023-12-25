const Match = require('../models/match');
const Stadium = require('../models/stadium');
const User = require('../models/user'); // for the user model
const utils = require('../utils/time_formatter');
const { teams } = require('../constants');


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
    await Match.findByIdAndDelete(req.params.id);
    req.flash('success', 'match was deleted successfully');
    res.redirect('/matches');
}

module.exports.newMatch = async (req, res) => {
    const stadiums = await Stadium.find({});
    res.render('matches/new', { stadiums, teams, title: 'new match', displaySearchInput: false });
};

module.exports.addMatch = async (req, res) => {
    const match_received = req.body;
    const stadium = await Stadium.find({ stadiumName: match_received.matchVenue });
    const match = new Match({
        'homeTeam': match_received.homeTeam,
        'description': match_received.description,
        'awayTeam': match_received.awayTeam,
        'matchVenue': stadium[0]._id,
        'matchDate': new Date(match_received.date),
        'mainReferee': match_received.mainReferee,
        'linesmen': [match_received.firstLinesman, match_received.secondLinesman],
    });
    await match.save();
    req.flash('success', 'match was added successfully');
    res.send({ redirect: '/matches' });
}

module.exports.showEditMatch = async (req, res) => {
    const match = await Match.findById(req.params.id).populate('matchVenue');
    const stadiums = await Stadium.find({});
    res.render('matches/edit', { match, stadiums, teams, title: 'edit match', displaySearchInput: false })
}

module.exports.updateMatch = async (req, res) => {
    const match_received = req.body;
    const stadium = await Stadium.find({ stadiumName: match_received.matchVenue });
    const updated_value = {
        'homeTeam': match_received.homeTeam,
        'description': match_received.description,
        'awayTeam': match_received.awayTeam,
        'matchVenue': stadium[0]._id,
        'matchDate': new Date(match_received.date),
        'mainReferee': match_received.mainReferee,
        'linesmen': [match_received.firstLinesman, match_received.secondLinesman],
    };
    await Match.findByIdAndUpdate(req.params.id, updated_value);
    res.send({ redirect: `/matches/${req.params.id}` });

}

module.exports.showSeats = async (req, res) => {
    const match = await Match.findById(req.params.id).populate('matchVenue');
    res.render('matches/seats_view', { match, title: 'view seats', displaySearchInput: false })
}

module.exports.reserveSeat = async (req, res) => {
    const { reservedSeats } = req.body;
    const match = await Match.findById(req.params.id);
    const user = await User.findById(res.locals.current_user.id)

    const areReserved = match.reservedSeats.some(element => {
        return reservedSeats.includes(element);
    });

    if (areReserved) {
        res.status(500).send({ success: false, message: 'Error reserving seats' });
    }
    else {
        match.reservedSeats.push(...reservedSeats);
        await match.save();

        const isMatchPresent = user.reservedSeats.some(element => {
            return String(element.match) === String(req.params.id);
        });

        if (isMatchPresent) {
            user.reservedSeats.map(m => {
                if (String(m.match) === String(req.params.id)) {
                    m.seatNumbers.push(...reservedSeats);
                }
            })
        } else {
            user.reservedSeats.push({
                'match': match._id,
                'seatNumbers': reservedSeats
            });
        }
        await user.save();

        res.send({ success: true, message: 'Seats reserved successfully' });
    }
}