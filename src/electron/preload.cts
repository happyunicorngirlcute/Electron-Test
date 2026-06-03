const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (arg0: any) => void) => {
    electron.ipcRenderer.on("statistics", (_: any, stats: any) => {
      callback(stats);
    });
  },
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
} satisfies Window['electron']);
