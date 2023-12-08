user_data = {

};

let currentTab = 0;
displayTab(currentTab);
const input = document.getElementById('inputGroupFile01');
input.addEventListener("change", (ev) => {
    if (!ev.target.files) return; // Do nothing.
    const file = input.files;
    if (file) {
        const fileReader = new FileReader();
        const image = document.querySelector('#images-preview');
        fileReader.onload = event => {
            image.setAttribute('src', event.target.result);
        }
        fileReader.readAsDataURL(file[0]);
    }
});

function next() {
    // check if form is valid
    const form = document.querySelectorAll('.needs-validation')[currentTab];
    form.classList.add('was-validated');
    if (form.checkValidity()) {
        // check which data to fill in
        if (currentTab === 0) {
            user_data['email'] = document.querySelector('#email').value + '@gmail.com';
            user_data['password'] = document.querySelector('#inputPassword5').value;
            user_data['username'] = document.querySelector('#username').value;
        }
        else if (currentTab === 1) {
            user_data['first_name'] = document.querySelector('#firstname').value;
            user_data['last_name'] = document.querySelector('#lastname').value;
            user_data['gender'] = document.querySelector('#gender').value;
            user_data['birth_date'] = document.querySelector('#date').valueAsDate.toISOString();
            user_data['image'] = input.files[0];
        }

        currentTab++;
        displayTab(currentTab);
    }
}

function prev() {
    currentTab--;
    displayTab(currentTab);
}

function displayTab(tabnum) {
    let tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => {
        tab.style.display = "none";
    })
    const list = tabs[tabnum].querySelector('.list');
    const progressBar = list.querySelector('div[class="progress-bar"]');
    progressBar.style.width = (tabnum === 0 ? "0%" : (tabnum === 1 ? "50%" : "100%"));
    const numbers = list.querySelectorAll('button');
    for (let number of numbers) {
        number.classList.remove('btn-primary');
        number.classList.remove('btn-secondary');
    }
    for (let i = 0; i < tabnum + 1; i++) {
        numbers[i].classList.add('btn-primary')
    }
    for (let i = tabnum + 1; i < numbers.length; i++) {
        numbers[i].classList.add('btn-secondary')
    }

    tabs[tabnum].style.display = "block";
}

function submitForm() {
    const form = document.querySelectorAll('.needs-validation')[currentTab];
    form.classList.add('was-validated');
    if (form.checkValidity()) {
        user_data['city'] = document.querySelector('#floatingCity').value;
        user_data['address'] = document.querySelector('#floatingAdress').value;
        user_data['role'] = document.querySelector('#role').value;

        const formData = new FormData();
        for (let ele in user_data) {
            formData.append(ele, user_data[ele]);
        }

        console.log(formData);

        fetch('/register', {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then((data) => {
            window.location.href = data.path;
        });
    }
}

function showPass() {
    const password = document.querySelector("#inputPassword5");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}