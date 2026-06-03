import { ipcMain } from "electron";
import { getStaticData } from "./resourceManager.js";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function ipcHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => any,
) {
  ipcMain.handle(key, () => handler());
}
