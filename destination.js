window.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
  
    if (!id) return;
  
    const destinations = await window.electronAPI.getDestinations();
    const destination = destinations.find(d => d.id === id);
    
    if (!destination) return;
  
    document.getElementById('dest-name').textContent = destination.name;
    document.getElementById('dest-description').textContent = destination.description;
    document.getElementById('dest-image').innerHTML = `<img src="${destination.image}" alt="${destination.name}" style="width:100%; max-width: 600px;">`;
    document.getElementById('dest-activities').textContent = "Activities: " + destination.activities.join(', ');
    document.getElementById('dest-season').textContent = "Best season: " + destination.bestSeason;
  });
  