const { app, BrowserWindow, ipcMain, dialog, desktopCapturer, session, globalShortcut, Tray, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const saveDir = path.join(process.cwd(), 'videos');
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir, { recursive: true });
}

let win;
let tray;


function createWindow() {
  win = new BrowserWindow({
    width: 700,
    height: 650,
    frame: false,
    resizable: true,
    transparent: false,
    alwaysOnTop: false,
    icon: path.join(__dirname, 'assets/icons/favicon.ico'),
    x: 0,
    y: 0,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });
  win.menuBarVisible = false;
  win.loadFile(path.join(__dirname, 'index.html'));
  // win.webContents.openDevTools();



  tray = new Tray(path.join(__dirname, 'assets/icons/favicon.ico'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Start Recording', click: () => {
      win.webContents.send('start-recording');
    } },
    { label: 'Stop Recording', click: () => {
      win.webContents.send('stop-recording');
    } },
    { label: 'Quit', role: 'quit' }
  ]);
  tray.setToolTip('Screen Recorder');
  tray.setContextMenu(contextMenu);

  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
      // Grant access to the first screen found.
      callback({ video: sources[0], audio: 'loopback' })
    })
  })
}

app.whenReady().then(() => {

  createWindow();

  globalShortcut.register('Control+Shift+S', () => {
    win.webContents.send('start-recording');
  });

  globalShortcut.register('Control+Shift+E', () => {
    win.webContents.send('stop-recording');
  });
});

ipcMain.on('save-video', async (event, buffer) => {
  const saveDir = path.join(process.cwd(), 'videos');
  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir);
  }

  const filePath = path.join(saveDir, `recording-${Date.now()}.webm`);
  fs.writeFile(filePath, buffer, () => {
    console.log('[+] Video saved to:', filePath);
  });
});





app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
