// models/seat.js
const mongoose = require('mongoose');
const Match = require('./match'); // DON'T DELETE THIS LINE (because match schema has to be executed first before seat schema)


// create the schema
const seatSchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match', // reference to the Match model (see code/models/match.js)
    required: true,
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
  // TODO: Add any other fields we might need for a seat
  // For example: seatNumber, seatSection, etc.
});

const Seat = mongoose.model('Seat', seatSchema);

// export the model
module.exports = mongoose.model('Seat', seatSchema);
