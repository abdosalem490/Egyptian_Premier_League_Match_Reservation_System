function displayOnlySearchVal(value) {
    const matches = document.querySelectorAll('.match-card');
    let tempVal = value.trim().toLowerCase();
    let displayedNumOfMatches = matches.length;
    if (tempVal !== "") {
        for (let match of matches) {
            if (!match.querySelector('#homeTeam').innerText.toLowerCase().includes(tempVal) &&
                !match.querySelector('#awayTeam').innerText.toLowerCase().includes(tempVal)) {
                match.style.display = 'none';
                displayedNumOfMatches--;
            }
            else {
                match.style.display = 'block';
            }
        }
        if (displayedNumOfMatches === 0) {
            document.querySelector('#NO-RESULT').style.display = 'block';
        }
        else {
            document.querySelector('#NO-RESULT').style.display = 'none';
        }
    }
    else {
        for (let match of matches) {
            match.style.display = 'block';
        }
    }
}

function updateMapOnSelectingStadium() {
    mapboxgl.accessToken = mapToken;

    // get the selected stadium
    const stadName = document.querySelector('#stadium').value;
    const stadium = stadiums.find((stad) => {
        if (stad.stadiumName === stadName)
            return stad;
    });

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: stadium.coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });

    let popup = new mapboxgl.Popup()
        .setText(stadium.stadiumName)
        .addTo(map);

    let marker = new mapboxgl
        .Marker()
        .setLngLat(stadium.coordinates)
        .addTo(map)
        .setPopup(popup);

}