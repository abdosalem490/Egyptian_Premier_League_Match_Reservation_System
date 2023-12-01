const mongoose = require('mongoose');   // to connect to the mongodb
const Schema = mongoose.Schema;     // to create the schema
const { teams, stadiums } = require('../constants');

// create the schema
const matchSchema = new Schema({
    homeTeam: {
        type: String,
        enum: teams,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    awayTeam: {
        type: String,
        enum: teams,
        required: true
    },
    matchVenue: {
        type: String,
        enum: stadiums,
        required: true
    },
    matchDate: {
        type: Date,
        required: true,
    },
    mainReferee: {
        type: String,
        required: true
    },
    linesmen: [
        {
            type: String,
        }
    ]
});

// export the model
module.exports = mongoose.model('Match', matchSchema);