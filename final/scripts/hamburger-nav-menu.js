//Use this for Hamburger Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.querySelector('#nav-button');
    const navBar = document.querySelector('#nav-bar');
    const body = document.body;

    if (!navButton || !navBar) {
        console.warn('Navigation elements not found');
        return;
    }

    navButton.addEventListener('click', () => {
        navButton.classList.toggle('show');
        navBar.classList.toggle('show');
        body.classList.toggle('nav-open');
    });

    // Close menu when a nav link is clicked (improves UX)
    const navLinks = navBar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navButton.classList.remove('show');
            navBar.classList.remove('show');
            body.classList.remove('nav-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navBar.classList.contains('show') && 
            !navBar.contains(e.target) && 
            !navButton.contains(e.target)) {
            navButton.classList.remove('show');
            navBar.classList.remove('show');
            body.classList.remove('nav-open');
        }
    });

    // Active page indicators for desktop navigation
    function updateActiveNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const currentHash = window.location.hash || '#home-section';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('active');
            }
        });
    }

    // Set initial active state
    updateActiveNavigation();

    // Update active state when hash changes
    window.addEventListener('hashchange', updateActiveNavigation);

    // Update active state when nav links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Small delay to ensure hash has updated
            setTimeout(updateActiveNavigation, 10);
        });
    });
});