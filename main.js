import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev';
import { spawn } from 'child_process';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  win.loadURL(
    isDev
      ? 'http://localhost:5173'
      : `file://${path.join(__dirname, 'dist/index.html')}`
  );

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle IPC from renderer
ipcMain.on('ping', () => {
  console.log('pong');
});

// ipcMain.on('process-file', () => {
//   console.log('received');
// });

ipcMain.on("process-file", (event, filePath) => {
    console.log("File Path received:", filePath);

    const scriptPath = join(
      __dirname,
      "python-scripts",
      "file_processor.py"
    );

    console.log("Script path:", scriptPath);

    const pythonProcess = spawn("python", [scriptPath, filePath]);

    pythonProcess.stdout.on("data", (data) => {
      try {
        const result = JSON.parse(data.toString("utf8"));
        console.log("xyz2", result);
        event.reply("file-processed", result);
      } catch (err) {
        console.error("Failed to parse data from Python script", err);
      }
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
    });
  });