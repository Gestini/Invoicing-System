import log from 'electron-log';
import icon from '../../resources/icon.png?asset';
import { join } from 'path';
import DiscordRPC from 'discord-rpc-electron';
import { autoUpdater } from 'electron-updater';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow, shell, screen } from 'electron';

let mainWindow: BrowserWindow;
let updateWindow: BrowserWindow | null = null;

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
  const { width, height } = screen.getPrimaryDisplay().workAreaSize; // Tamaño máximo de la pantalla

  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: 500,
    minHeight: 500,
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
    if (!is.dev) {
      new AppUpdater();
    } else {
      mainWindow.show();
    }
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
    height: 600,
    parent: mainWindow,
    modal: true,
    show: true,
    autoHideMenuBar: true,
    frame: false,
    resizable: false,
    minimizable: false,
    maximizable: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  updateWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gestini</title>
    <style>
      * {
        user-select: none;
      }
      body {
        color: rgb(231, 229, 229);
        margin: 0;
        padding: 0;
        display: flex;
        text-align: center;
        min-height: 100vh;
        font-family: Arial, sans-serif;
        align-items: center;
        justify-content: center;
        background-color: #17181b;
      }
      main {
        gap: 10px;
        display: flex;
        padding: 30px;
        align-items: center;
        flex-direction: column;
      }
      #status {
        font-size: 15px;
      }
      #logo {
        width: 50px;
        height: 50px;
      }
      #project-name {
        font-size: 24px;
      }
    </style>
  </head>
  <body>
    <main>
      <div>
        <svg
          width="34"
          height="57"
          viewBox="0 0 34 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_537_365)">
            <path
              d="M0 25.6826V45.4242V51.2054C0 56.3539 6.24872 58.9315 9.9083 55.2949C9.9083 45.4508 9.9083 25.6493 9.9083 15.8119L0 25.6826Z"
              fill="#ffffff"
            />
            <path
              d="M12.0418 13.3608C12.0418 23.1983 12.0418 42.9998 12.0418 52.8372L21.9502 42.9731C21.9502 33.129 21.9502 13.3275 21.9502 3.49007L12.0352 13.3608H12.0418Z"
              fill="#ffffff"
            />
            <path
              d="M24.0848 1.70509C24.0848 11.5426 24.0848 31.344 24.0848 41.1815L33.9931 31.3174V11.5759V5.79459C33.9931 0.646078 27.7377 -1.93817 24.0781 1.70509H24.0848Z"
              fill="#ffffff"
            />
          </g>
          <defs>
            <clipPath id="clip0_537_365">
              <rect width="34" height="57" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div id="project-name">Gestini</div>
      <div id="status">Comprobando actualizaciones...</div>
    </main>
  </body>
</html>
  `));
}

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

// Actualizar el contenido de la ventana modal
function updateStatus(message: string) {
  if (updateWindow && !updateWindow.isDestroyed()) {
    updateWindow.webContents.executeJavaScript(`
      document.getElementById('status').innerText = "${message}";
    `);
  }
}

// Mostrar mensaje de error si no se puede verificar la actualización
autoUpdater.on('error', () => {
  updateStatus('Hubo un error al comprobar la actualización');
  mainWindow.show();

  if (updateWindow && !updateWindow.isDestroyed()) {
    updateWindow.close();
  }
});

autoUpdater.on('update-available', () => {
  updateStatus('Actualización disponible. Descargando...');
});

autoUpdater.on('update-not-available', () => {
  updateStatus('No hay actualizaciones disponibles.');
  mainWindow.show();

  if (updateWindow && !updateWindow.isDestroyed()) {
    updateWindow.close();
  }
});

autoUpdater.on('update-downloaded', () => {
  updateStatus('Actualización descargada. Preparando...');
  autoUpdater.quitAndInstall();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (updateWindow && !updateWindow.isDestroyed()) {
      updateWindow.close();
    }
    app.quit();
  }
});
