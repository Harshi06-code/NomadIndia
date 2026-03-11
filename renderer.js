document.addEventListener('DOMContentLoaded', async () => {
    // DOM Elements
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const categoryGrid = document.querySelector('.category-grid');
    const destinationGrid = document.querySelector('.destination-grid');
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
  
    // Load initial data
    const categories = await window.electronAPI.getCategories();
    const destinations = await window.electronAPI.getDestinations();
    
    renderCategories(categories);
    renderDestinations(destinations);
  
    // Search handler
    async function handleSearch() {
      const term = searchInput.value.trim();
      const { categories, destinations} = await window.electronAPI.searchAdventures(term);
      
      if (term) {
        heroTitle.textContent = `Results for "${term}"`;
        heroSubtitle.textContent = `Found ${categories.length} categories, ${destinations.length} destinations`;
      } else {
        resetHomeView();
      }
      
      renderCategories(categories);
      renderDestinations(destinations);
    }
  
    // Render functions
    function renderCategories(items) {
      categoryGrid.innerHTML = items.map(item => `
        <div class="category-card" style="background-image: url('${item.image}')">
          <div class="category-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        </div>
      `).join('');
    }
  
    function renderDestinations(items) {
      destinationGrid.innerHTML = items.map(item => {
        // Convert destination name to lowercase and replace special characters with hyphens
        const pageName = item.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')  // Replace spaces and symbols with hyphens
          .replace(/^-+|-+$/g, '');     // Trim hyphens from start/end
    
        const exploreLink = `${pageName}.html`;
    
        return `
          <div class="destination-card">
            <div class="destination-img" style="background-image: url('${item.image}')"></div>
            <div class="destination-info">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <div class="activities">${item.activities.join(', ')}</div>
              <div class="best-season">Best season: ${item.bestSeason}</div>
              <a href="${exploreLink}" class="btn">Explore</a>
            </div>
          </div>
        `;
      }).join('');
    }
    
  
    // Helper functions
    function getActivityIcon(activity) {
      const icons = {
        'Trekking': 'fas fa-hiking',
        'Biking': 'fas fa-biking',
        'Water': 'fas fa-water',
        'Bungee': 'fas fa-running',
        'Paragliding': 'fas fa-parachute-box',
        'Diving': 'fas fa-swimmer',
        'Skiing': 'fas fa-skiing',
        'Camping': 'fas fa-campground',
        'Balloon': 'fas fa-hot-air-balloon'
      };
      
      for (const [key, icon] of Object.entries(icons)) {
        if (activity.includes(key)) return icon;
      }
      return 'fas fa-map-marked-alt';
    }
  
    function resetHomeView() {
      heroTitle.textContent = "Unleash Your Adventurous Spirit";
      heroSubtitle.textContent = "Discover thrilling adventures across India's landscapes";
    }
  
    // Event listeners
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  });
  