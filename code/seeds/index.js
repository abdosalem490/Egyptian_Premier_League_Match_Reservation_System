require('dotenv').config();

const mongoose = require('mongoose');
const { teams, stadiums, randomMaleNames, randomDescriptions } = require('../constants');
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
let stad_ids = []

const seedRun = async () => {
    await Match.deleteMany({});
    await Stadium.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const stadium = new Stadium({
            stadiumName: randomElement(stadiums),
            images: [
                { filename: 'match1', url: "https://source.unsplash.com/random/350%C3%97350/?football" },
                { filename: 'match2', url: "https://source.unsplash.com/random/350%C3%97350/?football" },
                { filename: 'match3', url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vdGJhbGwlMjBzdGFkaXVtfGVufDB8fDB8fHww" },
            ]
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