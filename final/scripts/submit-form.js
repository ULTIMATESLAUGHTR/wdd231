// Booking Modal and Form Submission Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('booking-modal');
    const bookingBtn = document.querySelector('.book-now-btn');
    const closeBtn = document.querySelector('.modal-close');
    const cancelBtn = document.querySelector('.cancel-btn');
    const bookingForm = document.getElementById('booking-form');
    const dateInput = document.getElementById('appointment-date');
    const submitBtn = document.querySelector('.submit-btn');
    const errorMessage = document.getElementById('form-error-message');
    const requiredFields = bookingForm.querySelectorAll('[required]');
    
    // Set minimum date to tomorrow
    const setMinDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.min = minDate;
    };
    
    // Function to check if all required fields are filled
    const checkFormValidity = () => {
        let allValid = true;
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allValid = false;
            }
        });
        
        if (allValid) {
            submitBtn.disabled = false;
            submitBtn.classList.add('form-ready');
            errorMessage.style.display = 'none';
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove('form-ready');
        }
    };
    
    // Add event listeners to required fields for real-time validation
    requiredFields.forEach(field => {
        field.addEventListener('input', checkFormValidity);
        field.addEventListener('change', checkFormValidity);
    });
    
    // Add real-time phone number formatting to phone input
    const phoneInput = bookingForm.querySelector('#client-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            
            if (value.length >= 6) {
                value = `(${value.slice(0, 3)})-${value.slice(3, 6)}-${value.slice(6, 10)}`;
            } else if (value.length >= 3) {
                value = `(${value.slice(0, 3)})-${value.slice(3)}`;
            }
            
            e.target.value = value;
        });
    }
    
    // Open modal
    const openModal = () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setMinDate();
        checkFormValidity(); // Check initial state
    };
    
    // Close modal
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        bookingForm.reset();
        errorMessage.style.display = 'none';
        checkFormValidity(); // Reset button state
    };
    
    // Event listeners for opening/closing modal
    if (bookingBtn) {
        bookingBtn.addEventListener('click', openModal);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Function to format phone number
    const formatPhoneNumber = (phone) => {
        // Remove all non-numeric characters
        const cleaned = phone.replace(/\D/g, '');
        
        // Check if it's a valid US phone number (10 digits)
        if (cleaned.length === 10) {
            // Format as (XXX)-XXX-XXXX
            return `(${cleaned.slice(0, 3)})-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        } else if (cleaned.length === 11 && cleaned[0] === '1') {
            // Handle 11-digit number starting with 1
            return `(${cleaned.slice(1, 4)})-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
        }
        
        // Return original if not a standard format
        return phone;
    };
    
    // Form validation and submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Check if all required fields are filled
        let isValid = true;
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            errorMessage.style.display = 'block';
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        
        // Hide error message if validation passes
        errorMessage.style.display = 'none';
        
        // Get form data
        const formData = new FormData(bookingForm);
        const appointmentData = {
            name: formData.get('clientName'),
            phone: formatPhoneNumber(formData.get('clientPhone')),
            email: formData.get('clientEmail'),
            date: formData.get('appointmentDate'),
            service: formData.get('serviceType'),
            ownEquipment: formData.get('ownEquipment') === 'yes',
            comments: formData.get('comments')
        };
        
        // Validate date is not in the past
        const selectedDate = new Date(appointmentData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate <= today) {
            alert('Please select a date that is at least one day in the future.');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(appointmentData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Validate phone format (basic validation)
        const phoneDigits = appointmentData.phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            alert('Please enter a valid phone number with at least 10 digits.');
            return;
        }
        
        // Simulate form submission
        submitAppointment(appointmentData);
    });
    
    // Simulate appointment submission
    const submitAppointment = (data) => {
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Booking...';
        submitBtn.disabled = true;
        submitBtn.classList.remove('form-ready');
        
        // Simulate API call
        setTimeout(() => {
            // Log appointment data (in real app, this would go to a server)
            console.log('Appointment booked:', data);
            
            // Create URL parameters for thank you page
            const params = new URLSearchParams({
                name: data.name,
                phone: data.phone,
                email: data.email,
                date: data.date,
                service: data.service,
                ownEquipment: data.ownEquipment ? 'Yes' : 'No',
                comments: data.comments || '',
                submitted: new Date().toISOString()
            });
            
            // Redirect to thank you page with form data
            window.location.href = `thank-you.html?${params.toString()}`;
        }, 2000);
    };
    
    // Initialize
    setMinDate();
    checkFormValidity();
});