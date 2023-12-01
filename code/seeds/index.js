require('dotenv').config();

const mongoose = require('mongoose');
const { teams, stadiums, randomMaleNames, randomDescriptions } = require('../constants');
const Match = require('../models/match');

mongoose.connect(process.env.DB_URL);

const randomElement = array => array[Math.floor(Math.random() * array.length)];
const randEnemyTeam = (homeTeam, array) => {
    let awayTeam = randomElement(array);
    while (homeTeam === awayTeam) {
        awayTeam = randomElement(array);
    }
    return awayTeam;
};
const randomDate = (from, to) => new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));

const seedRun = async () => {
    await Match.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const home_team = randomElement(teams);
        const currentDate = new Date();
        const monthAfter = new Date();
        monthAfter.setMonth(monthAfter.getMonth() + 1);
        const match = new Match({
            homeTeam: home_team,
            awayTeam: randEnemyTeam(home_team, teams),
            matchVenue: randomElement(stadiums),
            matchDate: randomDate(currentDate, monthAfter),
            mainReferee: randomElement(randomMaleNames),
            description: randomElement(randomDescriptions),
            linesmen: [
                randomElement(randomMaleNames),
                randomElement(randomMaleNames),
            ]
        })
        await match.save();
    }
}

seedRun().then(() => {
    mongoose.connection.close();
})