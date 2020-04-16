const {
  app,
  BrowserWindow,
  Menu,
  Notification
} = require('electron');
var mainWindow;
const rookout = require('rookout');
rookout.start({
  token: 'f42170bc7356fdde367e6c2fce185e2ec1b3ebfd942ecfe0ab8165e590d85c2f'
});
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools()

  if (Notification.isSupported()) {
    const notification = new Notification({
      title: 'Next Stop: Homework!',
      subtitle: 'TEST',
      body: 'TEST',
      hasReply: true
    })

    notification.on('show', () => console.log('Test Notification Shown'))
    notification.on('click', () => console.log('Test Notification Clicked'))
    notification.on('close', () => console.log('Test Notification Closed'))
    notification.on('reply', (event, reply) => {
      console.log(`Test Reply: ${reply}`)
    })

    notification.show()
  } else {
    window.alert('Notifications are not supported on this device.')
  }
}
app.on('ready', createWindow);
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function() {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
const template = [{
  label: "Next Stop: Homework",
  submenu: [{
      label: "Return to Login page",
      click: async () => {
        mainWindow.loadFile('login.html');
      }
    }
  ]
}];

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
