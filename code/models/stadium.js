const mongoose = require('mongoose');   // to connect to the mongodb
const Schema = mongoose.Schema;     // to create the schema


const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});


// create the schema
const StadiumSchema = new Schema({
    stadiumName: {
        type: String,
        required: true
    },
    images: [ImageSchema],
    coordinates: {
        type: [Number],
        required: true
    }
})

// export the model
module.exports = mongoose.model('Stadium', StadiumSchema);