import { ipcMain, WebContents } from "electron";
import { getStaticData } from "./resourceManager.js";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";
export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key],
) {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame);
    return handler();
  });
}

function validateEventFrame(frame: Electron.WebFrameMain | null) {
  if (!frame) throw new Error('No sender frame');
  if (isDev() && new URL(frame.url).host === 'localhost:5123') return;
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error('Invalid sender origin');
  }
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key],
) {
  webContents.send(key, payload);
}
