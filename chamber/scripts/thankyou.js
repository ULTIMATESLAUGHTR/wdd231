// Thank you page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Extract form data from URL parameters
    populateFormData();
    
    // Add smooth entrance animation
    animatePageContent();
});

// Extract and display form data from URL parameters
function populateFormData() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Map of form fields to display elements
    const fieldMap = {
        'first-name': 'display-first-name',
        'last-name': 'display-last-name',
        'email': 'display-email',
        'phone': 'display-phone',
        'business-name': 'display-business-name',
        'timestamp': 'display-timestamp'
    };
    
    // Populate each field
    Object.entries(fieldMap).forEach(([paramName, elementId]) => {
        const value = urlParams.get(paramName);
        const element = document.getElementById(elementId);
        
        if (element) {
            if (value) {
                if (paramName === 'timestamp') {
                    // Format timestamp for better readability
                    element.textContent = formatTimestamp(value);
                } else if (paramName === 'email') {
                    // Make email clickable
                    element.innerHTML = `<a href="mailto:${value}">${value}</a>`;
                } else if (paramName === 'phone') {
                    // Make phone clickable
                    element.innerHTML = `<a href="tel:${value}">${value}</a>`;
                } else {
                    element.textContent = value;
                }
                element.classList.add('has-value');
            } else {
                element.textContent = 'Not provided';
                element.classList.add('no-value');
            }
        }
    });
    
    // Show additional form info if available
    displayAdditionalInfo(urlParams);
}

// Format timestamp for display
function formatTimestamp(timestamp) {
    try {
        // Try to parse as ISO string first
        const date = new Date(timestamp);
        
        if (isNaN(date.getTime())) {
            // If not a valid date, return as-is
            return timestamp;
        }
        
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return timestamp;
    }
}

// Display additional form information if provided
function displayAdditionalInfo(urlParams) {
    const membershipLevel = urlParams.get('membership-level');
    const orgTitle = urlParams.get('org-title');
    const businessDescription = urlParams.get('business-description');
    
    // Add membership level info if provided
    if (membershipLevel) {
        const membershipDisplay = getMembershipDisplayName(membershipLevel);
        addAdditionalInfoItem('Membership Level:', membershipDisplay);
    }
    
    // Add organizational title if provided
    if (orgTitle) {
        addAdditionalInfoItem('Position/Title:', orgTitle);
    }
    
    // Add business description if provided and not too long
    if (businessDescription && businessDescription.length < 200) {
        addAdditionalInfoItem('Business Description:', businessDescription);
    }
}

// Convert membership level code to display name
function getMembershipDisplayName(level) {
    const levelMap = {
        'np': 'Non-Profit Membership (Free)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership', 
        'gold': 'Gold Membership'
    };
    
    return levelMap[level] || level;
}

// Add additional info item to summary
function addAdditionalInfoItem(label, value) {
    const summaryGrid = document.querySelector('.summary-grid');
    if (summaryGrid) {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item additional-info';
        summaryItem.innerHTML = `
            <span class="field-label">${label}</span>
            <span class="field-value has-value">${value}</span>
        `;
        summaryGrid.appendChild(summaryItem);
    }
}

// Animate page content for smooth entrance
function animatePageContent() {
    const animatedElements = [
        '.thank-you-message',
        '.application-summary',
        '.next-steps',
        '.action-buttons'
    ];
    
    animatedElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 150)); // Staggered animation
        }
    });
    
    // Animate success icon
    const successIcon = document.querySelector('.success-icon svg');
    if (successIcon) {
        successIcon.style.opacity = '0';
        successIcon.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            successIcon.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            successIcon.style.opacity = '1';
            successIcon.style.transform = 'scale(1)';
        }, 100);
    }
}

// Handle missing data gracefully
function handleMissingData() {
    const noValueElements = document.querySelectorAll('.no-value');
    
    if (noValueElements.length === 6) {
        // If all required fields are missing, show a different message
        const messageElement = document.querySelector('.gratitude-text');
        if (messageElement) {
            messageElement.innerHTML = 'Thank you for your interest in the NYC Chamber of Commerce. <strong>Please note:</strong> It appears some form data may not have been transmitted properly. Please <a href="join.html">resubmit your application</a> or contact us directly.';
            messageElement.style.color = 'var(--warning-color, #f59e0b)';
        }
    }
}

// Call missing data handler after a short delay
setTimeout(handleMissingData, 500);