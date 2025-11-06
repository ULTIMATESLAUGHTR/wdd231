const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
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