// Discover page functionality
import { itemsOfInterest } from '../data/items-of-interest.mjs';

// Function to handle visit tracking with localStorage
function handleVisitTracking() {
    const currentDate = Date.now();
    const lastVisit = localStorage.getItem('discoverLastVisit');
    
    let message = '';
    
    if (!lastVisit) {
        // First visit
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (daysDifference < 1) {
            // Less than a day
            message = "Back so soon?! Awesome!";
        } else if (daysDifference === 1) {
            // Exactly 1 day
            message = "You last visited 1 day ago.";
        } else {
            // More than 1 day
            message = `You last visited ${daysDifference} days ago.`;
        }
    }
    
    // Update localStorage with current visit
    localStorage.setItem('discoverLastVisit', currentDate.toString());
    
    // Display the message
    displayWelcomeMessage(message);
}

// Function to display welcome message
function displayWelcomeMessage(message) {
    const introSection = document.querySelector('.discover-intro');
    if (introSection) {
        // Create or update visit message element
        let visitMessage = document.getElementById('visit-message');
        if (!visitMessage) {
            visitMessage = document.createElement('div');
            visitMessage.id = 'visit-message';
            visitMessage.className = 'visit-message';
            introSection.appendChild(visitMessage);
        }
        visitMessage.textContent = message;
    }
}

// Function to create a discover card
function createDiscoverCard(item) {
    const card = document.createElement('article');
    card.className = 'discover-card';
    
    card.innerHTML = `
        <h2 class="card-title">${item.name}</h2>
        <figure class="card-figure">
            <!-- Image placeholder - will be added later -->
            <div class="image-placeholder" aria-label="Image placeholder for ${item.name}"></div>
        </figure>
        <address class="card-address">${item.address}</address>
        <p class="card-description">${item.description}</p>
        <button class="card-button" type="button">Learn More</button>
    `;
    
    return card;
}

// Function to render all discover cards
function renderDiscoverCards() {
    const container = document.getElementById('discover-grid');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create cards for each item
    itemsOfInterest.forEach(item => {
        const card = createDiscoverCard(item);
        container.appendChild(card);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    handleVisitTracking();
    renderDiscoverCards();
});

// Add event delegation for learn more buttons
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('card-button')) {
        const card = event.target.closest('.discover-card');
        const title = card.querySelector('.card-title').textContent;
        
        // Placeholder for learn more functionality
        alert(`Learn more about ${title} - functionality to be implemented`);
    }
});