const mongoose = require('mongoose');   // to connect to the mongodb
const Schema = mongoose.Schema;     // to create the schema
const passportLocalMongoose = require('passport-local-mongoose'); // simplifies building username and password login with Passport. it handles password addition and encryption to the db
const { genders, roles } = require('../constants');

// create the schema
const UserSchema = new Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    BirthDate: {
        type: Date,
        required: true,
    },
    Gender: {
        type: String,
        enum: genders,

        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    UserType: {
        type: String,
        enum: roles,
        required: true,
    },
    ProfilePicture: {
        url: String,
        filename: String,
    },
    isApproved: {
        type: Boolean,
        default: false
    }
});


// add the plugin that adds the password and username fields that authenticate it
UserSchema.plugin(passportLocalMongoose);

// export the model
module.exports = mongoose.model('User', UserSchema);