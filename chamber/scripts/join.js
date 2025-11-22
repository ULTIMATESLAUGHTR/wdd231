// Join form functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set timestamp when form loads
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const currentDateTime = new Date().toLocaleString();
        timestampField.value = currentDateTime;
    }

    // Initialize modal functionality
    initializeModals();
    
    // Initialize lazy loading and animations
    initializeLazyAnimations();
});

// Lazy loading with intersection observer for performance
function initializeLazyAnimations() {
    const membershipCards = document.querySelectorAll('.membership-card');
    
    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on card position
                    setTimeout(() => {
                        entry.target.style.animationPlayState = 'running';
                        entry.target.classList.add('animate-in');
                    }, index * 150); // 150ms stagger between cards
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        membershipCards.forEach(card => {
            card.style.animationPlayState = 'paused';
            cardObserver.observe(card);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        membershipCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 150);
        });
    }
}

// Modal functionality for membership level cards
function initializeModals() {
    // Get all modal triggers and modals
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.membership-modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Add click event to each modal trigger
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                openModal(modal);
            }
        });
    });

    // Add click event to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.membership-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Add click event to modal backdrops
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Add escape key handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.membership-modal[open]');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

// Open modal with accessibility support
function openModal(modal) {
    // Store the currently focused element
    modal.previousFocus = document.activeElement;
    
    // Show the modal
    modal.showModal();
    
    // Focus the close button for keyboard accessibility
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
        closeButton.focus();
    }
    
    // Trap focus within the modal
    trapFocus(modal);
}

// Close modal and restore focus
function closeModal(modal) {
    modal.close();
    
    // Restore focus to the element that opened the modal
    if (modal.previousFocus) {
        modal.previousFocus.focus();
    }
}

// Trap focus within modal for accessibility
function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}
