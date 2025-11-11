//Use this for updating the footer with current year and last modified date
// Update footer with current year and last modified timestamp
function updateCurrentYear() {
    const yearEl = document.getElementById('currentyear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

function updateLastModified() {
    const modEl = document.getElementById('lastmodified');
    if (modEl) {
        // document.lastModified returns a string; convert then format
        const lastModDate = new Date(document.lastModified);
        const formatted = `${lastModDate.toLocaleDateString()} ${lastModDate.toLocaleTimeString()}`;
        modEl.textContent = formatted;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCurrentYear();
    updateLastModified();
    console.log(`Footer timestamps updated: year=${new Date().getFullYear()}, lastModified=${document.lastModified}`);
});