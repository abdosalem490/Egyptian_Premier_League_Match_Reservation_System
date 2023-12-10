require('dotenv').config();

const mongoose = require('mongoose');
const { teams, stadiums, randomMaleNames, randomDescriptions, stadiumImages, stadiumLocations } = require('../constants');
const Match = require('../models/match');
const Stadium = require('../models/stadium')



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
const randomIntegerArray = (min, max, length) => {
    return Array.from(
        { length: length },
        () => Math.floor(Math.random() * (max - min + 1)) + min
    )
}
const stadium_lengths = randomIntegerArray(30, 70, 50);
const stadium_widths = randomIntegerArray(30, 70, 50);

let stad_ids = []

const seedRun = async () => {
    await Match.deleteMany({});
    await Stadium.deleteMany({});
    for (let i = 0; i < stadiums.length; i++) {
        const stadium = new Stadium({
            stadiumName: stadiums[i],
            images: [
                { filename: 'match1', url: randomElement(stadiumImages) },
                { filename: 'match2', url: randomElement(stadiumImages) },
                { filename: 'match3', url: randomElement(stadiumImages) },
            ],
            coordinates: stadiumLocations[stadiums[i]],
            length: randomElement(stadium_lengths),
            width: randomElement(stadium_widths)
        })
        res = await stadium.save();
        stad_ids.push(res.id);
    }

    for (let i = 0; i < 50; i++) {
        const home_team = randomElement(teams);
        const currentDate = new Date();
        const monthAfter = new Date();
        monthAfter.setMonth(monthAfter.getMonth() + 1);
        const match = new Match({
            homeTeam: home_team,
            awayTeam: randEnemyTeam(home_team, teams),
            matchVenue: randomElement(stad_ids),
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