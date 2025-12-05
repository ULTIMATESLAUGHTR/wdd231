/**
 * Service Cards Interactive Module - Flip Card Version
 * Handles flip animations, touch interactions, and accessibility for service flip cards
 * 
 * Features:
 * - 3D flip card animations with front/back faces
 * - Touch device compatibility with tap-to-flip
 * - Accessibility keyboard navigation
 * - Smooth 3D transitions and effects
 */

class ServiceCardsManager {
    constructor() {
        this.cards = [];
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.animationDuration = 600; // milliseconds for flip
        this.flippedCards = new Set(); // Track which cards are currently flipped
        this.init();
    }

    init() {
        this.loadServiceCards();
        this.setupEventListeners();
        this.setupAccessibility();
        this.preloadImages();
        
        // Add resize listener for responsive adjustments
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    loadServiceCards() {
        this.cards = Array.from(document.querySelectorAll('.service-card'));
        
        if (this.cards.length === 0) {
            console.warn('No service cards found on page');
            return;
        }

        console.log(`Loaded ${this.cards.length} flip service cards`);
        
        // Add data attributes for easier manipulation
        this.cards.forEach((card, index) => {
            card.setAttribute('data-card-index', index);
            card.setAttribute('data-service', this.extractServiceName(card));
            
            // Ensure cards start in unflipped state
            const inner = card.querySelector('.service-card-inner');
            if (inner) {
                inner.style.transform = 'rotateY(0deg)';
            }
        });
    }

    extractServiceName(card) {
        const nameElement = card.querySelector('.service-name');
        return nameElement ? nameElement.textContent.toLowerCase().replace(/\s+/g, '-') : `service-${card.dataset.cardIndex}`;
    }

    setupEventListeners() {
        this.cards.forEach(card => {
            const inner = card.querySelector('.service-card-inner');
            
            if (!inner) {
                console.warn('Service card missing .service-card-inner element');
                return;
            }

            // For desktop: hover events
            if (!this.isTouchDevice) {
                card.addEventListener('mouseenter', (e) => this.handleCardHover(e, true));
                card.addEventListener('mouseleave', (e) => this.handleCardHover(e, false));
            }

            // For mobile: touch events (tap to flip)
            if (this.isTouchDevice) {
                card.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
                card.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
                card.addEventListener('click', (e) => this.handleTouchClick(e));
            }

            // Keyboard events for accessibility
            card.addEventListener('focus', (e) => this.handleFocus(e, true));
            card.addEventListener('blur', (e) => this.handleFocus(e, false));
            card.addEventListener('keydown', (e) => this.handleKeyDown(e));

            // Click events for potential booking integration (desktop)
            if (!this.isTouchDevice) {
                card.addEventListener('click', (e) => this.handleCardClick(e));
            }
        });
    }

    setupAccessibility() {
        this.cards.forEach(card => {
            // Make cards focusable and add ARIA labels
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            const serviceName = card.querySelector('.service-name')?.textContent || 'Service';
            const servicePrice = card.querySelector('.service-price')?.textContent || '';
            
            card.setAttribute('aria-label', `${serviceName} - ${servicePrice}. Press Enter or Space to flip card and view image.`);
        });
    }

    preloadImages() {
        // Preload all service images for smooth transitions
        const images = document.querySelectorAll('.service-image img');
        let loadedCount = 0;
        
        images.forEach(img => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === images.length) {
                        console.log('All service images preloaded');
                    }
                };
                
                img.onerror = () => {
                    console.warn('Failed to load service image:', img.src);
                };
            }
        });
        
        if (loadedCount === images.length) {
            console.log('All service images already loaded');
        }
    }

    handleCardHover(event, isEntering) {
        if (this.isTouchDevice) return;
        
        const card = event.currentTarget;
        const cardIndex = card.dataset.cardIndex;
        
        if (isEntering) {
            this.flipCard(card, true);
            this.flippedCards.add(cardIndex);
        } else {
            this.flipCard(card, false);
            this.flippedCards.delete(cardIndex);
        }
    }

    handleTouchStart(event) {
        const card = event.currentTarget;
        card.classList.add('touch-active');
        
        // Add subtle feedback for touch
        card.style.transform = 'scale(0.98)';
        card.style.transition = 'transform 0.1s ease';
    }

    handleTouchEnd(event) {
        const card = event.currentTarget;
        card.classList.remove('touch-active');
        
        // Reset transform
        setTimeout(() => {
            card.style.transform = '';
            card.style.transition = '';
        }, 100);
    }

    handleTouchClick(event) {
        event.preventDefault();
        const card = event.currentTarget;
        const cardIndex = card.dataset.cardIndex;
        
        // Toggle flip state on mobile
        const isCurrentlyFlipped = this.flippedCards.has(cardIndex);
        
        if (isCurrentlyFlipped) {
            this.flipCard(card, false);
            this.flippedCards.delete(cardIndex);
        } else {
            this.flipCard(card, true);
            this.flippedCards.add(cardIndex);
        }
    }

    handleFocus(event, isFocusing) {
        const card = event.currentTarget;
        
        if (isFocusing) {
            card.classList.add('keyboard-focus');
            // Don't auto-flip on focus, let user control with keyboard
        } else {
            card.classList.remove('keyboard-focus');
            // Reset flip state when focus is lost
            const cardIndex = card.dataset.cardIndex;
            this.flipCard(card, false);
            this.flippedCards.delete(cardIndex);
        }
    }

    handleKeyDown(event) {
        const card = event.currentTarget;
        const cardIndex = card.dataset.cardIndex;
        
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            
            // Toggle flip state
            const isCurrentlyFlipped = this.flippedCards.has(cardIndex);
            
            if (isCurrentlyFlipped) {
                this.flipCard(card, false);
                this.flippedCards.delete(cardIndex);
            } else {
                this.flipCard(card, true);
                this.flippedCards.add(cardIndex);
            }
        }
    }

    handleCardClick(event) {
        if (this.isTouchDevice) return; // Touch clicks are handled separately
        
        const card = event.currentTarget;
        const serviceName = card.querySelector('.service-name')?.textContent || 'Unknown Service';
        
        console.log(`Service card clicked: ${serviceName}`);
        
        // Add visual feedback
        card.style.animation = 'cardClick 0.2s ease';
        
        // Remove animation class after animation completes
        setTimeout(() => {
            card.style.animation = '';
        }, 200);

        // Future integration: Open booking modal with pre-selected service
        // this.openBookingModal(serviceName);
    }

    flipCard(card, shouldFlip) {
        const inner = card.querySelector('.service-card-inner');
        
        if (!inner) {
            console.warn('Card missing .service-card-inner element');
            return;
        }

        if (shouldFlip) {
            inner.style.transform = 'rotateY(180deg)';
            card.classList.add('card-flipped');
        } else {
            inner.style.transform = 'rotateY(0deg)';
            card.classList.remove('card-flipped');
        }
    }

    handleResize() {
        // Reset any inline styles that might break responsive design
        this.cards.forEach(card => {
            card.style.transform = '';
            
            // Maintain flip states across resize
            const cardIndex = card.dataset.cardIndex;
            const isFlipped = this.flippedCards.has(cardIndex);
            this.flipCard(card, isFlipped);
        });
    }

    // Utility function for debouncing resize events
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Future method for booking integration
    openBookingModal(serviceName) {
        // This could integrate with the existing booking modal
        const bookingModal = document.getElementById('booking-modal');
        const serviceSelect = document.getElementById('service-type');
        
        if (bookingModal && serviceSelect) {
            // Pre-select the service in the modal
            const serviceValue = serviceName.toLowerCase().replace(/\s+/g, '-');
            serviceSelect.value = serviceValue;
            
            // Open the modal (this would use the existing modal functionality)
            console.log('Would open booking modal with service:', serviceName);
        }
    }
}

// CSS Animation for card click feedback and additional styles
const style = document.createElement('style');
style.textContent = `
    @keyframes cardClick {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
    }
    
    .service-card.keyboard-focus {
        outline: 3px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    .service-card.touch-active {
        transform: scale(0.98) !important;
    }
    
    .service-card.card-flipped {
        /* Additional styles for flipped state if needed */
    }
    
    /* Smooth transitions for all card elements */
    .service-card-inner {
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Prevent text selection during flip */
    .service-card {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
`;
document.head.appendChild(style);

// Initialize the service cards manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ServiceCardsManager();
    });
} else {
    new ServiceCardsManager();
}

// Export for potential external use
window.ServiceCardsManager = ServiceCardsManager;