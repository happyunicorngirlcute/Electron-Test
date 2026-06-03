import { ipcMain } from "electron";
import { getStaticData } from "./resourceManager.js";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

function ipcHandle<Key extends string>(key: Key, handler: () => any) {
  ipcMain.handle(key, () => handler());
  {
  }
}
