// Thank You Page Display Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if we have the required parameters
    const requiredParams = ['name', 'phone', 'email', 'date', 'service'];
    const hasAllParams = requiredParams.every(param => urlParams.has(param));
    
    if (!hasAllParams) {
        showErrorMessage();
        return;
    }
    
    try {
        // Extract form data from URL parameters
        const formData = {
            name: urlParams.get('name'),
            phone: urlParams.get('phone'),
            email: urlParams.get('email'),
            date: urlParams.get('date'),
            service: urlParams.get('service'),
            ownEquipment: urlParams.get('ownEquipment'),
            comments: urlParams.get('comments'),
            submitted: urlParams.get('submitted')
        };
        
        // Populate the appointment details
        populateAppointmentDetails(formData);
        
        // Populate contact information in next steps
        populateContactInfo(formData.phone, formData.email);
        
    } catch (error) {
        console.error('Error processing form data:', error);
        showErrorMessage();
    }
});

// Function to populate appointment details
function populateAppointmentDetails(data) {
    // Basic information
    document.getElementById('client-name-display').textContent = data.name;
    document.getElementById('client-phone-display').textContent = data.phone;
    document.getElementById('client-email-display').textContent = data.email;
    
    // Format and display appointment date
    const appointmentDate = new Date(data.date);
    document.getElementById('appointment-date-display').textContent = appointmentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Display service type (convert from value to readable format)
    document.getElementById('service-type-display').textContent = formatServiceName(data.service);
    
    // Display equipment preference
    document.getElementById('own-equipment-display').textContent = data.ownEquipment || 'No';
    
    // Display comments if provided
    const commentsSection = document.getElementById('comments-section');
    const commentsDisplay = document.getElementById('comments-display');
    
    if (data.comments && data.comments.trim()) {
        commentsDisplay.textContent = data.comments;
        commentsSection.style.display = 'flex';
    } else {
        commentsSection.style.display = 'none';
    }
    
    // Display submission date
    const submissionDate = new Date(data.submitted);
    document.getElementById('submission-date').textContent = submissionDate.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Function to populate contact information in next steps
function populateContactInfo(phone, email) {
    document.getElementById('contact-phone').textContent = phone;
    document.getElementById('contact-email').textContent = email;
}

// Function to format service names for display
function formatServiceName(serviceValue) {
    const serviceMap = {
        'classic-manicure': 'Classic Manicure',
        'gel-manicure': 'Gel Manicure',
        'nail-art': 'Custom Nail Art',
        'french-tips': 'French Tips',
        'acrylic-nails': 'Acrylic Nails',
        'consultation': 'Consultation'
    };
    
    return serviceMap[serviceValue] || serviceValue;
}

// Function to show error message if parameters are missing
function showErrorMessage() {
    const thankYouContainer = document.querySelector('.thank-you-container');
    thankYouContainer.innerHTML = `
        <div class="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>We couldn't find your appointment information. This might happen if:</p>
            <ul style="text-align: left; margin: 1rem 0;">
                <li>You accessed this page directly without submitting a form</li>
                <li>Your session expired</li>
                <li>There was a technical issue with your submission</li>
            </ul>
            <p>Please try booking your appointment again or contact us directly.</p>
            <a href="index.html" class="home-button">Return to Home</a>
        </div>
    `;
}