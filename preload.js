console.log('Renderer process loaded');


const { contextBridge, desktopCapturer, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getSources: () => desktopCapturer.getSources({ types: ['screen'] }),
  saveVideo: (arrayBuffer) => ipcRenderer.send('save-video', Buffer.from(arrayBuffer)),
  onStart: (callback) => ipcRenderer.on('start-recording', callback),
  onStop: (callback) => ipcRenderer.on('stop-recording', callback)
});
