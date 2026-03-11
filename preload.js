const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getCategories: () => ipcRenderer.invoke('get-categories'),
  getDestinations: () => ipcRenderer.invoke('get-destinations'),
  searchAdventures: (term) => ipcRenderer.invoke('perform-search', term)
});
