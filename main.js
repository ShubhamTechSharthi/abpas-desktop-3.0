import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import isDev from "electron-is-dev";
import { spawn } from "child_process";
import { join } from "path";
import sqlite3 from "sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:5173"
      : `file://${path.join(__dirname, "dist/index.html")}`
  );

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//sql

//select

ipcMain.on("database-call", (event) => {
  const db = new sqlite3.Database("./database.db", (err) => {
    if (err) console.error("Database opening error: ", err);
  });

  console.log("Database Connected");

  const sql = "SELECT * FROM Data";

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Fetching data error: ", err);
      return;
    }
    console.log("abc" + rows);
    event.reply("sql-data-received", rows);
  });

  db.close((err) => {
    if (err) console.error("Database closing error", err);

    console.log("Database disconnected");
  });
});

//insert

ipcMain.on("database-insert", (event, data) => {
  const projectName = JSON.stringify(data.projectName);
  const projectDate = JSON.stringify(data.projectDate);
  const processedData = JSON.stringify(data.processedData);
  const formData = JSON.stringify(data.finalData);

  const db = new sqlite3.Database("./database.db", (err) => {
    if (err) console.error("Database opening error: ", err);
  });

  console.log("Database Connected");

  const sql =
    "INSERT INTO Data (ProjectName, ProjectDate, ProcessedData, FormData) VALUES (?, ?, ?, ?)";

  db.run(sql, [projectName, projectDate, processedData, formData], (err) => {
    if (err) {
      console.error("Inserting data error: ", err);
      event.reply(`data-insert-response`, false);
      return;
    }
    console.log(`A row has been inserted`);
    event.reply(`data-insert-response`, true);
  });

  db.close((err) => {
    if (err) console.error("Database closing error", err);

    console.log("Database disconnected");
  });
});

//delete

ipcMain.on("database-delete", (event, id) => {
  const rowId = parseInt(id);

  const db = new sqlite3.Database("./database.db", (err) => {
    if (err) console.error("Database opening error: ", err);
  });

  console.log("Database Connected");

  const sql = "DELETE FROM Data WHERE Id=?";

  db.run(sql, rowId, (err) => {
    if (err) {
      console.error("Deleting data error: ", err);
      event.reply(`data-delete-response`, false);
      return;
    }
    console.log(`A row has been deleted`);
    event.reply(`data-delete-response`, true);
  });

  db.close((err) => {
    if (err) console.error("Database closing error", err);

    console.log("Database disconnected");
  });
});

//python

ipcMain.on("process-file", (event, filePath) => {
  console.log("File Path received:", filePath);

  const scriptPath = join(
    __dirname,
    "python-scripts",
    "demo_scrutiny_engine.py"
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
