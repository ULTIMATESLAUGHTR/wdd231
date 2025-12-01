// Discover page functionality
// Inline data to reduce critical path loading
const itemsOfInterest = [
  {
    "name": "Statue of Liberty",
    "address": "New York, NY 10004",
    "description": "A symbol of freedom and democracy, the Statue of Liberty stands on Liberty Island in New York Harbor. Visitors can take a ferry to explore the island and visit the museum inside the statue.",
    "image": "statue-of-liberty.webp"
  },
  {
    "name": "Central Park",
    "address": "New York, NY 10024",
    "description": "A massive urban park in the heart of Manhattan, Central Park offers walking trails, lakes, and iconic landmarks like Bethesda Terrace, the Central Park Zoo, and Strawberry Fields.",
    "image": "central-park.webp"
  },
  {
    "name": "Times Square",
    "address": "Manhattan, NY 10036",
    "description": "Known for its neon lights and bustling atmosphere, Times Square is the heart of New York's entertainment district. It's famous for Broadway theaters and massive digital billboards.",
    "image": "times-square.webp"
  },
  {
    "name": "Empire State Building",
    "address": "20 W 34th St, New York, NY 10118",
    "description": "Once the world's tallest building, the Empire State Building offers breathtaking views of NYC from its observation decks on the 86th and 102nd floors.",
    "image": "empire-state-building.webp"
  },
  {
    "name": "Brooklyn Bridge",
    "address": "New York, NY 10038",
    "description": "A historic suspension bridge connecting Manhattan and Brooklyn, the Brooklyn Bridge offers stunning views of the East River and the skyline. Pedestrians and cyclists can walk across.",
    "image": "brooklyn-bridge.webp"
  },
  {
    "name": "The Metropolitan Museum of Art",
    "address": "1000 5th Ave, New York, NY 10028",
    "description": "One of the largest and most prestigious art museums in the world, The Met features an extensive collection spanning over 5,000 years of art from various cultures and periods.",
    "image": "met-museum.webp"
  },
  {
    "name": "Rockefeller Center",
    "address": "45 Rockefeller Plaza, New York, NY 10111",
    "description": "A famous complex of buildings in Midtown Manhattan, the Rockefeller Center is home to the famous ice skating rink, NBC Studios, and the annual Christmas tree lighting.",
    "image": "rockefeller-center.webp"
  },
  {
    "name": "The High Line",
    "address": "New York, NY 10011",
    "description": "A 1.45-mile-long elevated park built on a former rail line, The High Line offers green spaces, art installations, and stunning views of the city and the Hudson River.",
    "image": "high-line.webp"
  }
];

console.log('Discover.js loaded');
console.log('Items of interest:', itemsOfInterest);

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
    const visitMessage = document.getElementById('visit-message');
    if (visitMessage) {
        visitMessage.textContent = message;
        visitMessage.style.visibility = 'visible'; // Show the pre-existing div instead of creating new one
    }
}

// Function to create a discover card
function createDiscoverCard(item, index) {
    console.log('Creating card for:', item.name);
    
    const card = document.createElement('article');
    card.className = 'discover-card';
    
    // First image gets priority loading, others are lazy loaded
    const loadingAttr = index === 0 ? '' : 'loading="lazy"';
    const fetchPriority = index === 0 ? 'fetchpriority="high"' : '';
    
    card.innerHTML = `
        <h2 class="card-title">${item.name}</h2>
        <figure class="card-figure">
            <img src="images/${item.image}" alt="${item.name}" width="300" height="200" ${loadingAttr} ${fetchPriority}>
        </figure>
        <address class="card-address">${item.address}</address>
        <p class="card-description">${item.description}</p>
        <button class="card-button" type="button">Learn More</button>
    `;
    
    return card;
}

// Function to render all discover cards
function renderDiscoverCards() {
    console.log('Rendering discover cards...');
    
    const container = document.getElementById('discover-grid');
    if (!container) {
        console.error('Container with ID "discover-grid" not found');
        return;
    }
    
    console.log('Container found:', container);
    
    // Remove loading placeholder to prevent layout shift
    const placeholder = container.querySelector('.loading-placeholder');
    if (placeholder) {
        placeholder.remove();
    }
    
    // Check if items exist
    if (!itemsOfInterest || !Array.isArray(itemsOfInterest) || itemsOfInterest.length === 0) {
        console.error('No items of interest found or invalid data');
        container.innerHTML = '<p>No attractions to display at this time.</p>';
        return;
    }
    
    // Create cards for each item
    itemsOfInterest.forEach((item, index) => {
        console.log(`Creating card ${index + 1}:`, item);
        const card = createDiscoverCard(item, index);
        container.appendChild(card);
    });
    
    console.log(`${itemsOfInterest.length} cards rendered successfully`);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing discover page...');
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