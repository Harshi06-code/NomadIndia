const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const adventures = {
    categories: [
      {
        id: 1,
        name: "Trekking",
        description: "Explore India's majestic Himalayan trails and Western Ghats",
        image: "images/trek.jpeg",
        popularSpots: ["Himalayas", "Western Ghats", "Nilgiris"],
        activities: ["Trekking", "Snow Trekking", "Ice Climbing", "Nature Walks"]
      },
      {
        id: 2,
        name: "Water Sports",
        description: "From white water rafting to serene kayaking experiences",
        image: "images/whiteWaterRafting.jpeg",
        popularSpots: ["Rishikesh", "Goa", "Andaman"],
        activities: ["White Water Rafting", "Kayaking", "Scuba Diving", "Jet Skiing", 
                    "Snorkeling", "Sea Walking", "Surfing", "Coracle Ride", "Dolphin Tours"]
      },
      {
        id: 3,
        name: "Aerial Adventures",
        description: "Soar through the skies with these thrilling activities",
        image: "images/skydiving.jpg",
        popularSpots: ["Bir Billing", "Jaipur", "Pune"],
        activities: ["Paragliding", "Parasailing", "Hot Air Balloon", "Skydiving", 
                    "Paramotoring", "Bungee Jumping", "Cliff Jumping"]
      },
      {
        id: 4,
        name: "Nature & Wilderness",
        description: "Adventures that bring you closer to the earth",
        image: "images/nature.jpeg",
        popularSpots: ["Coorg", "Jaisalmer", "Meghalaya"],
        activities: ["Camping", "Mountain Biking", "Cycling", "Valley Crossing"]
      },
      {
        id: 5,
        name: "Desert Adventures",
        description: "Camel safaris and dune bashing in the Thar",
        image: "images/dessert.jpeg",
        popularSpots: ["Jaisalmer", "Bikaner", "Jodhpur"],
        activities: ["Camel Safari", "Dune Bashing"]
      }
    ],
    destinations: [
      // Northern Destinations
      {
        id: 1,
        name: "Rishikesh, Uttarakhand",
        description: "Yoga capital and adventure hub with world-class rapids",
        image: "images/rishikesh.jpeg",
        activities: ["White Water Rafting", "Bungee Jumping", "Kayaking", "Camping", "Cliff Jumping"],
        bestSeason: "September to November"
      },
      {
        id: 2,
        name: "Leh-Ladakh, Jammu & Kashmir",
        description: "High altitude adventures in the majestic Himalayas",
        image: "images/leh-ladakh.jpeg",
        activities: ["Mountain Biking", "Trekking", "Motorbike Tours", "River Rafting", "Camping"],
        bestSeason: "June to September"
      },
      {
        id: 3,
        name: "Bir Billing, Himachal Pradesh",
        description: "Paragliding capital of India with stunning views",
        image: "images/bir-billing.jpeg",
        activities: ["Paragliding", "Trekking", "Camping", "Mountain Biking"],
        bestSeason: "March to June, September to November"
      },
      {
        id: 4,
        name: "Manali, Himachal Pradesh",
        description: "Gateway to adventure in the Pir Panjal range",
        image: "images/manali.jpg",
        activities: ["Skiing", "Trekking", "Paragliding", "River Rafting", "Mountain Biking"],
        bestSeason: "Year-round (varies by activity)"
      },
      
      // Southern Destinations
      {
        id: 5,
        name: "Goa",
        description: "Tropical paradise with beach adventures",
        image: "images/goa.jpg",
        activities: ["Scuba Diving", "Parasailing", "Jet Skiing", "Kayaking", "Dolphin Tours"],
        bestSeason: "October to March"
      },
      {
        id: 6,
        name: "Andaman Islands",
        description: "Pristine marine ecosystem for water adventures",
        image: "images/andaman.jpeg",
        activities: ["Scuba Diving", "Snorkeling", "Sea Walking", "Jet Skiing", "Parasailing"],
        bestSeason: "November to April"
      },
      {
        id: 7,
        name: "Coorg, Karnataka",
        description: "Scotland of India with lush green landscapes",
        image: "images/coorg.jpeg",
        activities: ["Trekking", "White Water Rafting", "Mountain Biking", "Camping"],
        bestSeason: "October to March"
      },
      
      // Western Destinations
      {
        id: 8,
        name: "Jaisalmer, Rajasthan",
        description: "Golden city with thrilling desert adventures",
        image: "images/jaisalmer.jpg",
        activities: ["Camel Safari", "Dune Bashing", "Paramotoring", "Desert Camping"],
        bestSeason: "October to March"
      },
      {
        id: 9,
        name: "Lonavala, Maharashtra",
        description: "Hill station with adventure activities",
        image: "images/lonavala.jpeg",
        activities: ["Trekking", "Rock Climbing", "Rappelling", "Valley Crossing"],
        bestSeason: "June to September"
      },
      
      // Eastern Destinations
      {
        id: 10,
        name: "Gangtok, Sikkim",
        description: "Base for Himalayan adventures in the East",
        image: "images/gangtok.jpeg",
        activities: ["Trekking", "River Rafting", "Paragliding", "Mountain Biking"],
        bestSeason: "March to June, September to November"
      },
      {
        id: 11,
        name: "Daringbadi, Odisha",
        description: "Kashmir of Odisha with adventure potential",
        image: "images/daringbadi.jpeg",
        activities: ["Trekking", "Waterfall Rappelling", "Nature Walks", "Camping"],
        bestSeason: "October to March"
      },
      
      // Special Adventure Destinations
      {
        id: 12,
        name: "Gulmarg, Jammu & Kashmir",
        description: "Premier ski destination in India",
        image: "images/gulmarg.jpeg",
        activities: ["Skiing", "Snowboarding", "Gondola Ride", "Heli-Skiing"],
        bestSeason: "December to March"
      },
      {
        id: 13,
        name: "Pune, Maharashtra",
        description: "Adventure hub with multiple activities",
        image: "images/pune.jpeg",
        activities: ["Skydiving", "Paragliding", "Trekking", "Rock Climbing"],
        bestSeason: "October to March"
      },
      {
        id: 14,
        name: "Hampi, Karnataka",
        description: "Ancient ruins meet adventure sports",
        image: "images/hampi.jpeg",
        activities: ["Bouldering", "Coracle Ride", "Trekking", "Cycling"],
        bestSeason: "October to February"
      },
      {
        id: 15,
        name: "Zanskar, Ladakh",
        description: "Ultimate frozen river trek destination",
        image: "images/zanskar.jpeg",
        activities: ["Chadar Trek", "Ice Climbing", "Snow Trekking", "Camping"],
        bestSeason: "January to February"
      }
    ],
    allActivities: [
      "Trekking", "Mountain Biking", "White Water Rafting", "Bungee Jumping",
      "Paragliding", "Parasailing", "Kayaking", "Scuba Diving", "Jet Skiing",
      "Snorkeling", "Sea Walking", "Hot Air Balloon", "Surfing", "Skydiving",
      "Rock Climbing", "Skiing", "Snowboarding", "Ice Climbing", "Camel Safari",
      "Dune Bashing", "Camping", "Cliff Jumping", "Valley Crossing", "Rappelling",
      "Coracle Ride", "Heli-Skiing", "Paramotoring", "Dolphin Tours", "Nature Walks"
    ]
  };

  let mainWindow;

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        sandbox: true
      }
    });
  
    mainWindow.loadFile('login.html');
  }
  
  app.whenReady().then(() => {
    createWindow();
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
  
  // IPC Handlers
  ipcMain.handle('get-categories', () => adventures.categories);
  ipcMain.handle('get-destinations', () => adventures.destinations);
  ipcMain.handle('perform-search', (_, searchTerm) => {
    const term = searchTerm?.toLowerCase() || '';
    
    return {
      categories: adventures.categories.filter(c => 
        c.name.toLowerCase().includes(term) || 
        c.description.toLowerCase().includes(term) ||
        c.activities.some(a => a.toLowerCase().includes(term))
      ),
      destinations: adventures.destinations.filter(d =>
        d.name.toLowerCase().includes(term) ||
        d.activities.some(a => a.toLowerCase().includes(term))
      ),
      activities: adventures.allActivities.filter(a => 
        a.toLowerCase().includes(term)
      )
    };
  });
  