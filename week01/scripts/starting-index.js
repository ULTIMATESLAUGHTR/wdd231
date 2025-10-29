const navButton = document.querySelector('#nav-button');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
});

const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navBar.classList.toggle('show');
    navButton.classList.toggle('active');
});

function currentyear() {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;
    return currentYear;
}

function lastModified() {
    const lastModified = new Date(document.lastModified);
    document.getElementById('lastModified').textContent = `${lastModified}`;
}

console.log('This file was last modified on: ${lastModified()}');

currentyear();
lastModified();