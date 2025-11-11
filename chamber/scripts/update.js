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
        const y = lastModDate.getFullYear();
        const m = String(lastModDate.getMonth() + 1).padStart(2, '0');
        const d = String(lastModDate.getDate()).padStart(2, '0');
        const hh = String(lastModDate.getHours()).padStart(2, '0');
        const mm = String(lastModDate.getMinutes()).padStart(2, '0');
        const formatted = `${y}-${m}-${d} ${hh}:${mm}`; // fixed-width to reduce CLS
        modEl.textContent = formatted;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCurrentYear();
    updateLastModified();
    console.log(`Footer timestamps updated: year=${new Date().getFullYear()}, lastModified=${document.lastModified}`);
});