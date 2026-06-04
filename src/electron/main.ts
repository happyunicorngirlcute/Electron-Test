import { app, BrowserWindow, ipcMain } from "electron";
import { ipcMainHandle, isDev } from "./util.js";
import { pollResources } from "./resourceManager.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { getStaticData } from "./resourceManager.js";
import { createTray } from "./tray.js";

let forceQuit = false;

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  createTray(mainWindow, () => {
    forceQuit = true;
    app.quit();
  });

  mainWindow.on("close", (event) => {
    if (!forceQuit) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  pollResources(mainWindow);

  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  });

  ipcMain.on("window:minimize", () => {
    mainWindow.minimize();
  });

  ipcMain.on("window:maximize", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on("window:close", () => {
    mainWindow.close();
  });
});

app.on("window-all-closed", () => {
  if (forceQuit) {
    app.quit();
  }
});
