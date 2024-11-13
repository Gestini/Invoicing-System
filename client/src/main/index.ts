import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import DiscordRPC from 'discord-rpc-electron';
import { app, BrowserWindow, shell } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { join } from 'path';
import icon from '../../resources/icon.png?asset';

let mainWindow: BrowserWindow;
let updateWindow: BrowserWindow | null = null; // Ventana modal de actualización

const clientId = '1297973891284729929';

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;

    // Iniciar verificación de actualizaciones
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// Crear ventana de la aplicación principal
function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    minWidth: 1200,
    minHeight: 670,
    maxHeight: 1080,
    maxWidth: 1920,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    new AppUpdater();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// Crear ventana modal para las actualizaciones
function createUpdateWindow() {
  updateWindow = new BrowserWindow({
    width: 400,
    height: 200,
    parent: mainWindow, // Hacer que la ventana de actualización dependa de la ventana principal
    modal: true,
    show: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  updateWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
    <html>
      <head><title>Actualización</title></head>
      <body>
        <h3>Comprobando actualizaciones...</h3>
        <div id="status">Esperando...</div>
      </body>
    </html>
  `));
}

// Actualizar el contenido de la ventana modal
function updateStatus(message: string) {
  if (updateWindow) {
    updateWindow.webContents.executeJavaScript(`
      document.getElementById('status').innerText = "${message}";
    `);
  }
}

// Mostrar mensaje de error si no se puede verificar la actualización
autoUpdater.on('error', (err) => {
  console.error('Error durante la verificación de la actualización:', err);
  updateStatus('Hubo un error al comprobar la actualización: ' + err);
});

// Cuando hay una actualización disponible
autoUpdater.on('update-available', () => {
  console.log('Actualización disponible');
  updateStatus('Actualización disponible. Descargando...');
});

// Cuando no hay actualizaciones disponibles
autoUpdater.on('update-not-available', () => {
  console.log('No hay actualizaciones disponibles');
  updateStatus('No hay actualizaciones disponibles.');
});

// Cuando la actualización se ha descargado
autoUpdater.on('update-downloaded', () => {
  console.log('Actualización descargada');
  updateStatus('Actualización descargada. Preparando...');
  autoUpdater.quitAndInstall(); // Instalar la actualización
});

async function setActivity() {
  const rpc = new DiscordRPC.Client({ transport: 'ipc' });
  const startTimestamp = new Date();

  rpc.setActivity({
    details: 'Mirando sucursales',
    state: 'Gestionado empresas',
    startTimestamp,
    largeImageKey: 'snek_large',
    largeImageText: 'tea is delicious',
    smallImageKey: 'snek_small',
    smallImageText: 'i am my own pillows',
    instance: false,
  });

  rpc.on('ready', () => {
    setInterval(() => {
      rpc.setActivity({
        details: 'Mirando sucursales',
        state: 'Gestionado empresas',
        startTimestamp,
        largeImageKey: 'snek_large',
        largeImageText: 'tea is delicious',
        smallImageKey: 'snek_small',
        smallImageText: 'i am my own pillows',
        instance: false,
      });
    }, 15000);
  });

  rpc.login({ clientId }).catch(console.error);
}

// Este método se ejecuta cuando Electron está listo
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // Crear la ventana de actualización
  if (!is.dev) {
    createUpdateWindow();
  }

  // Crear la ventana principal
  createMainWindow();

  // Mostrar estado en discord
  setActivity();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

// Cerrar la ventana de actualización cuando se cierre la aplicación
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (updateWindow) updateWindow.close(); // Cerrar la ventana de actualización
    app.quit();
  }
});
