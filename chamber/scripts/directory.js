// directory.js - fetch members.json and render directory with grid/list toggle

document.addEventListener('DOMContentLoaded', () => {
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');
  const membersEl = document.getElementById('members');

  async function fetchMembers() {
    try {
      const res = await fetch('data/members.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      // Support either key name
      const list = json.chamber_members || json.members || [];
      return Array.isArray(list) ? list : [];
    } catch (err) {
      console.error('Failed to load members:', err);
      return [];
    }
  }

  function createMemberCard(m) {
    const card = document.createElement('article');
    card.className = `member-card membership-${m.membershipLevel}`;
    // Resolve image path robustly
    const imgPath = m.image && m.image.startsWith('images/') ? m.image : `images/${m.image}`;
    const levelLabel = m.membershipLevel === 3 ? 'Gold' : m.membershipLevel === 2 ? 'Silver' : 'Member';
    card.innerHTML = `
      <div class="card-media">
        <img src="${imgPath}" alt="${m.name} logo" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='https://via.placeholder.com/200x200?text=No+Image'">
      </div>
      <div class="card-body">
        <h3 class="company-name"><a href="${m.website}" target="_blank" rel="noopener">${m.name}</a></h3>
        <p class="company-address">${m.address}</p>
        <p class="company-phone">${m.phone}</p>
      </div>
      <div class="card-badge" aria-label="Membership level ${levelLabel}">${levelLabel}</div>
    `;
    return card;
  }

  function render(members) {
    membersEl.innerHTML = '';
    if (!members.length) {
      membersEl.innerHTML = '<p class="no-members">No members available.</p>';
      return;
    }
    const fragment = document.createDocumentFragment();
    members.forEach(m => fragment.appendChild(createMemberCard(m)));
    membersEl.appendChild(fragment);
  }

  // Toggle handlers
  function setGrid() {
    membersEl.classList.add('grid');
    membersEl.classList.remove('list');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
  }
  function setList() {
    membersEl.classList.add('list');
    membersEl.classList.remove('grid');
    gridBtn.setAttribute('aria-pressed', 'false');
    listBtn.setAttribute('aria-pressed', 'true');
  }

  gridBtn.addEventListener('click', setGrid);
  listBtn.addEventListener('click', setList);

  // initial load
  (async () => {
    const members = await fetchMembers();
    render(members);
    // default to grid
    setGrid();
  })();
});
