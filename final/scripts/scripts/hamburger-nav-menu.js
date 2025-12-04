//Use this for Hamburger Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.querySelector('#nav-button');
    const navBar = document.querySelector('#nav-bar');

    if (!navButton || !navBar) {
        console.warn('Navigation elements not found');
        return;
    }

    navButton.addEventListener('click', () => {
        navButton.classList.toggle('show');
        navBar.classList.toggle('show');
    });

    // Close menu when a nav link is clicked (improves UX)
    const navLinks = navBar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navButton.classList.remove('show');
            navBar.classList.remove('show');
        });
    });
});