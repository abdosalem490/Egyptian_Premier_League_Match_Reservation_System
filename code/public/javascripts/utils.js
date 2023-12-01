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