import { app, BrowserWindow, ipcMain } from "electron";
import { ipcMainHandle, isDev } from "./util.js";
import { pollResources } from "./resourceManager.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { getStaticData } from "./resourceManager.js";

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
