import { app, BrowserWindow, Menu, Tray, nativeImage } from "electron";
import path from "path";

export function createTray(mainWindow: BrowserWindow, onQuit: () => void) {
  const iconPath = path.join(app.getAppPath(), "build/icon.ico");
  const icon = nativeImage.createFromPath(iconPath);
  const tray = new Tray(icon);

  tray.setToolTip("Task Manager");

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show Bob",
      click: () => {
        mainWindow.show();
        mainWindow.focus();
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: onQuit,
    },
  ]);

  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    if (mainWindow.isVisible()) {
      mainWindow.focus();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  return tray;
}
