const Stadium = require('../models/stadium');

module.exports.newStadium = async (req, res) => {
    res.render('stadiums/new', { title: 'matches', displaySearchInput: false })
};

module.exports.addStadium = async (req, res) => {
    console.log(req.body);
    let endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.locationName}.json?limit=1&access_token=` + process.env.MAPBOX_API_KEY;
    images = req.files.map(file => ({ url: '/resources/uploads/' + file.filename, filename: file.filename }));
    fetch(endpoint, { method: "GET" })
        .then((response) => response.json())
        .then(async (date) => {
            coordinates = date.features[0].geometry.coordinates;
            newStadium = {
                'stadiumName': req.body.stadName,
                'coordinates': coordinates,
                'images': images,
                'length': req.body.length,
                'width': req.body.width,
            };
            const stadium = new Stadium(newStadium);
            await stadium.save();
            res.redirect('/matches');
        });
}