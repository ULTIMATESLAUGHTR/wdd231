// spotlight.js - Display 3 random gold/silver chamber members

document.addEventListener('DOMContentLoaded', () => {
  const spotlightContainer = document.querySelector('#spotlight-cards');
  
  async function fetchMembers() {
    try {
      const response = await fetch('data/members.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data.chamber_members || data.members || [];
    } catch (error) {
      console.error('Failed to fetch members:', error);
      return [];
    }
  }

  function filterGoldSilver(members) {
    // membershipLevel: 3 = gold, 2 = silver
    return members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);
  }

  function selectRandom(members, count = 3) {
    const shuffled = [...members].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  function getMembershipLabel(level) {
    if (level === 3) return 'Gold Member';
    if (level === 2) return 'Silver Member';
    return 'Member';
  }

  function createSpotlightCard(member) {
    const card = document.createElement('article');
    card.className = 'spotlight-card';
    card.setAttribute('data-membership', member.membershipLevel);
    
    const imgPath = member.image && member.image.startsWith('images/') 
      ? member.image 
      : `images/${member.image}`;
    
    const membershipLabel = getMembershipLabel(member.membershipLevel);
    
    card.innerHTML = `
      <div class="spotlight-header">
        <img src="${imgPath}" alt="${member.name} logo" class="spotlight-logo" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/150x150?text=No+Logo'">
        <h3 class="spotlight-name">${member.name}</h3>
      </div>
      <div class="spotlight-body">
        <p class="spotlight-membership">${membershipLabel}</p>
        <p class="spotlight-phone"><strong>Phone:</strong> ${member.phone}</p>
        <p class="spotlight-address"><strong>Address:</strong> ${member.address}</p>
        <p class="spotlight-website"><strong>Website:</strong> ${member.website}</p>
      </div>
    `;
    
    return card;
  }

  function renderSpotlight(members) {
    if (!spotlightContainer) {
      console.warn('Spotlight container #spotlight-cards not found');
      return;
    }
    
    spotlightContainer.innerHTML = '';
    
    if (!members || members.length === 0) {
      spotlightContainer.innerHTML = '<p class="no-spotlight">No spotlight members available.</p>';
      return;
    }
    
    const fragment = document.createDocumentFragment();
    members.forEach(member => {
      fragment.appendChild(createSpotlightCard(member));
    });
    spotlightContainer.appendChild(fragment);
  }

  async function initSpotlight() {
    const allMembers = await fetchMembers();
    const qualifiedMembers = filterGoldSilver(allMembers);
    const selectedMembers = selectRandom(qualifiedMembers, 3);
    renderSpotlight(selectedMembers);
  }

  initSpotlight();
});
