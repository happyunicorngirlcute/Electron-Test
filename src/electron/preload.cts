const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (arg0: any) => void) => {
    const handler = (_: any, stats: any) => callback(stats);
    electron.ipcRenderer.on("statistics", handler);
    return () => electron.ipcRenderer.removeListener("statistics", handler);
  },
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
  windowControls: {
    minimize: () => electron.ipcRenderer.send("window:minimize"),
    maximize: () => electron.ipcRenderer.send("window:maximize"),
    close: () => electron.ipcRenderer.send("window:close"),
  },
});
