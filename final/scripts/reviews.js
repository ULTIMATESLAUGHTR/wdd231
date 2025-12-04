import { clientReviews } from '../data/reviews.mjs';

// Function to create flip card HTML
function createReviewCard(review, index) {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.style.setProperty('--card-index', index);
    
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <h3 class="review-name">${review.name}</h3>
                <p class="review-text">"${review.review}"</p>
            </div>
            <div class="card-back">
                <img src="images/${review.image}" alt="${review.name}'s nail work" class="review-image" loading="lazy">
            </div>
        </div>
    `;
    
    // Add click event to flip the card
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
    
    // Add mouse move event for tilt effect on desktop
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth >= 768) {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const rotateX = (mouseY - centerY) / 10;
            const rotateY = (centerX - mouseX) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        }
    });
    
    // Reset transform on mouse leave
    card.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 768) {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        }
    });
    
    return card;
}

// Function to render all review cards
function renderReviewCards() {
    const container = document.getElementById('reviews-grid');
    if (!container) {
        console.error('Reviews grid container not found');
        return;
    }
    
    container.innerHTML = '';
    
    clientReviews.forEach((review, index) => {
        const card = createReviewCard(review, index);
        container.appendChild(card);
    });
}

// Initialize reviews when DOM is loaded
document.addEventListener('DOMContentLoaded', renderReviewCards);