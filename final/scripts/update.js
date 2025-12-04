//Use this for updating the footer with current year and last modified date
// Update footer with current year and last modified timestamp
function updateCurrentYear() {
    const yearEl = document.getElementById('currentyear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

function updateLastModified() {
    const modEl = document.getElementById('lastModified');
    if (modEl) {
        // document.lastModified returns a string; convert then format
        const lastModDate = new Date(document.lastModified);
        const y = lastModDate.getFullYear();
        const m = String(lastModDate.getMonth() + 1).padStart(2, '0');
        const d = String(lastModDate.getDate()).padStart(2, '0');
        const hh = String(lastModDate.getHours()).padStart(2, '0');
        const mm = String(lastModDate.getMinutes()).padStart(2, '0');
        const formatted = `${y}-${m}-${d} ${hh}:${mm}`;
        modEl.textContent = formatted;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCurrentYear();
    updateLastModified();
    console.log(`Footer timestamps updated: year=${new Date().getFullYear()}, lastModified=${document.lastModified}`);
    
    // Mouse follow effect for learn-more image
    const learnMoreImage = document.querySelector('.learn-more-image');
    if (learnMoreImage) {
        learnMoreImage.addEventListener('mousemove', (e) => {
            const rect = learnMoreImage.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const deltaX = (mouseX - centerX) / rect.width * 10;
            const deltaY = (mouseY - centerY) / rect.height * 10;
            
            learnMoreImage.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
        });
        
        learnMoreImage.addEventListener('mouseleave', () => {
            learnMoreImage.style.transform = '';
        });
    }
});