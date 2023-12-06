const fp = flatpickr("#date", {
    enableTime: true,
    dateFormat: "d/m/Y h:i K",
    minDate: "today",
    time_24hr: false
});


const form = document.querySelector('.needs-validation');
const homeTeam = document.querySelector('#homeTeam');
const awayTeam = document.querySelector('#awayTeam');
const description = document.querySelector('#description');
const matchVenue = document.querySelector('#stadium');
const date_time = document.querySelector('#date');
const mainReferee = document.querySelector('#main-referee');
const firstLinesman = document.querySelector('#first-linesmen');
const secondLinesman = document.querySelector('#second-linesmen');

let validatedForm = false;
let method_type = "";
let endpoint_to_post = "";

let addErrorMessage = (element) => {
    element.classList.add("border", "border-danger", "border-2");
    element.nextElementSibling.classList.remove('d-none');
}

let removeErrorMessage = (element) => {
    element.classList.remove("border", "border-danger", "border-2");
    element.nextElementSibling.classList.add('d-none');
    element.classList.add("border", "border-success", "border-2");
}

awayTeam.addEventListener('change', () => {
    if (validatedForm && (homeTeam.value !== awayTeam.value)) {
        removeErrorMessage(homeTeam);
        removeErrorMessage(awayTeam);
    }
});

homeTeam.addEventListener('change', () => {
    if (validatedForm && (homeTeam.value !== awayTeam.value)) {
        removeErrorMessage(homeTeam);
        removeErrorMessage(awayTeam);
    }
});

description.addEventListener('input', () => {
    if (validatedForm && description.value.trim() !== "") {
        removeErrorMessage(description);
    }
});

date_time.addEventListener('change', () => {
    if (validatedForm && date_time.value.trim() !== "") {
        removeErrorMessage(date_time);
    }
});

mainReferee.addEventListener('input', () => {
    if (validatedForm && mainReferee.value.trim() !== "") {
        mainReferee.classList.remove("border", "border-danger", "border-2");
        mainReferee.parentElement.nextElementSibling.classList.add('d-none');
        mainReferee.classList.add("border", "border-success", "border-2");
    }
});

firstLinesman.addEventListener('input', () => {
    if (validatedForm && firstLinesman.value.trim() !== "") {
        firstLinesman.classList.remove("border", "border-danger", "border-2");
        firstLinesman.classList.add("border", "border-success", "border-2");
        if (secondLinesman.value.trim() !== "") {
            secondLinesman.parentElement.nextElementSibling.classList.add('d-none');
        }
    }
});

secondLinesman.addEventListener('input', () => {
    if (validatedForm && secondLinesman.value.trim() !== "") {
        secondLinesman.classList.remove("border", "border-danger", "border-2");
        secondLinesman.classList.add("border", "border-success", "border-2");
        if (firstLinesman.value.trim() !== "") {
            secondLinesman.parentElement.nextElementSibling.classList.add('d-none');
        }
    }
});

form.addEventListener('submit', event => {
    event.preventDefault();
    let isValidForm = true;
    if (homeTeam.value === awayTeam.value) {
        addErrorMessage(homeTeam);
        addErrorMessage(awayTeam);
        isValidForm = false;
    }
    if (date_time.value.trim() === "") {
        addErrorMessage(date_time);
        isValidForm = false;
    }
    if (mainReferee.value.trim() === "") {
        mainReferee.classList.add("border", "border-danger", "border-2");
        mainReferee.parentElement.nextElementSibling.classList.remove('d-none');
        isValidForm = false;
    }
    if (firstLinesman.value.trim() === "" || secondLinesman.value.trim() === "") {
        firstLinesman.classList.add("border", "border-danger", "border-2");
        secondLinesman.classList.add("border", "border-danger", "border-2");
        secondLinesman.parentElement.nextElementSibling.classList.remove('d-none');
        isValidForm = false;
    }
    if (description.value.trim() === "") {
        addErrorMessage(description);
        isValidForm = false;
    }


    if (isValidForm) {
        match_data = {
            'homeTeam': homeTeam.value,
            'awayTeam': awayTeam.value,
            'description': description.value,
            'matchVenue': matchVenue.value,
            'date': fp.selectedDates[0].toISOString(),
            'mainReferee': mainReferee.value,
            'firstLinesman': firstLinesman.value,
            'secondLinesman': secondLinesman.value,
        }

        if (window.location.pathname === '/matches/new') {
            method_type = "POST"
            endpoint_to_post = "/matches"
        }
        else {
            method_type = "PUT"
            endpoint_to_post = path_to_put;
        }

        fetch(endpoint_to_post, {
            method: method_type,
            redirect: "follow",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(match_data)
        }).then((response) => response.json()
        ).then((data) => {
            window.location.href = data.redirect;
        });
    }

    validatedForm = true;

});