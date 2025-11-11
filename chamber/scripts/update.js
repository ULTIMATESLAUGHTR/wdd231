//Use this for updating the footer with current year and last modified date
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