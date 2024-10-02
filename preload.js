const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("Electron", {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) =>
      ipcRenderer.on(channel, (event, ...args) => func(...args)),
    removeListener: (channel, func) => {
      ipcRenderer.removeListener(channel, (event, ...args) => func(...args));
    },
    once: (channel, func) => {
      const validChannels = ["data-insert-response", "data-delete-response"];
      if (validChannels.includes(channel)) {
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
