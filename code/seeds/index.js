require('dotenv').config();

const mongoose = require('mongoose');
const { teams, stadiums, randomMaleNames, randomDescriptions, stadiumImages, stadiumLocations, randomCreditCardNumbers } = require('../constants');
const Match = require('../models/match');
const Stadium = require('../models/stadium')
const User = require('../models/user')



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
let match_ids = []

const seedRun = async () => {
    await Match.deleteMany({});
    await Stadium.deleteMany({});
    await User.deleteMany({});

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
        let res = await stadium.save();
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
        let res = await match.save();
        match_ids.push(res.id)
    }

    const user = new User({
        'Username': 'admin',
        'FirstName': 'admin',
        'LastName': 'admin',
        'BirthDate': new Date('2001-05-14'),
        'Gender': 'male',
        'City': 'El-Fashn',
        'Address': 'saad ibn waqas street/El-Fash/Bani-Suef Governorate/Egypt',
        'Email': 'admin@gmail.com',
        'UserType': 'admin',
        'ProfilePicture': {
            'url': "data:image/jpeg;base64,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",
            'filename': 'admin_profile'
        },
        'isApproved': true,
        'username': 'admin@gmail.com',
        'creditCards': [
            { 'creditNumber': randomElement(randomCreditCardNumbers) }
        ],
        'reservedSeats': [
            {
                'match': randomElement(match_ids),
                'seatNumbers': [
                    { 'seat_num': 0 },
                    { 'seat_num': 1 }
                ]
            }
        ],

    });

    // user, pasword
    await User.register(user, 'admin'); // register admin

    // regsiter some manager users
    await User.register(new User({
        'Username': 'abdo',
        'FirstName': 'abdo',
        'LastName': 'salem',
        'BirthDate': new Date('2006-05-16'),
        'Gender': 'male',
        'City': 'Giza',
        'Address': '14 abdelhamid street - Faisel - Giza',
        'Email': 'abdosalm555@gmail.com',
        'UserType': 'manager',
        'ProfilePicture': {
            'url': "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFsZXxlbnwwfHwwfHx8MA%3D%3D",
            'filename': 'manager_profile1'
        },
        'isApproved': true,
        'username': 'abdosalm@gmail.com',
        'creditCards': [
            { 'creditNumber': randomElement(randomCreditCardNumbers) }
        ],
        'reservedSeats': [
            {
                'match': randomElement(match_ids),
                'seatNumbers': [
                    { 'seat_num': 2 },
                    { 'seat_num': 3 }
                ]
            }
        ],

    }), 'password');

    await User.register(new User({
        'Username': 'Yusuf',
        'FirstName': 'yusuf',
        'LastName': 'said',
        'BirthDate': new Date('2001-04-30'),
        'Gender': 'Omnigender',
        'City': 'Menoufia',
        'Address': 'some menoufia address',
        'Email': 'yusuf_said@gmail.com',
        'UserType': 'manager',
        'ProfilePicture': {
            'url': 'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
            'filename': 'manager_profile2'
        },
        'isApproved': true,
        'username': 'yusuf_said@gmail.com',
        'creditCards': [
            { 'creditNumber': randomElement(randomCreditCardNumbers) }
        ],
        'reservedSeats': [
            {
                'match': randomElement(match_ids),
                'seatNumbers': [
                    { 'seat_num': 4 },
                    { 'seat_num': 5 }
                ]
            }
        ],

    }), 'password');

    await User.register(new User({
        'Username': 'Ahmed Fawzy',
        'FirstName': 'ahmed',
        'LastName': 'fawzy',
        'BirthDate': new Date('2001-03-05'),
        'Gender': 'Trans male',
        'City': '6th October',
        'Address': 'first district - october - Giza',
        'Email': 'ahmedFawzy123@gmail.com',
        'UserType': 'manager',
        'ProfilePicture': {
            'url': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
            'filename': 'manager_profile3'
        },
        'isApproved': true,
        'username': 'ahmedFawzy123@gmail.com',
        'creditCards': [
            { 'creditNumber': randomElement(randomCreditCardNumbers) }
        ],
        'reservedSeats': [
            {
                'match': randomElement(match_ids),
                'seatNumbers': [
                    { 'seat_num': 6 },
                    { 'seat_num': 7 }
                ]
            }
        ],

    }), 'password');


    await User.register(new User({
        'Username': 'Sabry Hassan',
        'FirstName': 'Sabry',
        'LastName': 'Hassan',
        'BirthDate': new Date('2001-02-18'),
        'Gender': 'female',
        'City': 'Giza',
        'Address': 'unKnown',
        'Email': 'sabHs156@gmail.com',
        'UserType': 'manager',
        'ProfilePicture': {
            'url': 'https://plus.unsplash.com/premium_photo-1669882305273-674eff6567af?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
            'filename': 'manager_profile1'
        },
        'isApproved': false,
        'username': 'sabHs156@gmail.com',
        'creditCards': [
            { 'creditNumber': randomElement(randomCreditCardNumbers) }
        ],
        'reservedSeats': [
            {
                'match': randomElement(match_ids),
                'seatNumbers': [
                    { 'seat_num': 8 },
                    { 'seat_num': 9 }
                ]
            }
        ],

    }), 'password');

    // register some fan users
    await User.register(new User({
        'Username': 'Kathrin Steve',
        'FirstName': 'Kathrin',
        'LastName': 'Steve',
        'BirthDate': new Date('1998-10-10'),
        'Gender': 'female',
        'City': 'Sohag',
        'Address': '14 El nasr street - Sohag - Egypt',
        'Email': 'kathSteve23@gmail.com',
        'UserType': 'fan',
        'ProfilePicture': {
            'url': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
            'filename': 'fan_profile1'
        },
        'isApproved': true,
        'username': 'kathSteve23@gmail.com',
        'creditCards': [
            { 'creditNumber': randomElement(randomCreditCardNumbers) }
        ],
        'reservedSeats': [
            {
                'match': randomElement(match_ids),
                'seatNumbers': [
                    { 'seat_num': 10 },
                    { 'seat_num': 11 }
                ]
            }
        ],

    }), 'password');

    await User.register(new User({
        'Username': 'Ahmed Soulem',
        'FirstName': 'Ahmed',
        'LastName': 'Soulem',
        'BirthDate': new Date('1990-05-31'),
        'Gender': 'Multigender',
        'City': 'Aswan',
        'Address': '36 Salah Salem street - Aswan - Egypt',
        'Email': 'ahmedSoulem56@gmail.com',
        'UserType': 'fan',
        'ProfilePicture': {
            'url': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
            'filename': 'fan_profile2'
        },
        'isApproved': true,
        'username': 'ahmedSoulem56@gmail.com',
        'creditCards': [
            { 'creditNumber': randomElement(randomCreditCardNumbers) }
        ],
        'reservedSeats': [
            {
                'match': randomElement(match_ids),
                'seatNumbers': [
                    { 'seat_num': 12 },
                    { 'seat_num': 13 }
                ]
            }
        ],

    }), 'password');

    await User.register(new User({
        'Username': 'Salah Montaser',
        'FirstName': 'Salah',
        'LastName': 'Montaser',
        'BirthDate': new Date('2005-08-01'),
        'Gender': 'male',
        'City': 'Suez',
        'Address': '36 Suez Canal street - Suez - Egypt',
        'Email': 'slh123@gmail.com',
        'UserType': 'fan',
        'ProfilePicture': {
            'url': 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
            'filename': 'fan_profile3'
        },
        'isApproved': false,
        'username': 'slh123@gmail.com',
        'creditCards': [
            { 'creditNumber': randomElement(randomCreditCardNumbers) }
        ],
        'reservedSeats': [
            {
                'match': randomElement(match_ids),
                'seatNumbers': [
                    { 'seat_num': 14 },
                    { 'seat_num': 15 }
                ]
            }
        ],

    }), 'password');


}

seedRun().then(() => {
    mongoose.connection.close();
})