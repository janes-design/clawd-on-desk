"use strict";
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("moodAPI", {
  getData: () => ipcRenderer.invoke("mood-history:get"),
});
