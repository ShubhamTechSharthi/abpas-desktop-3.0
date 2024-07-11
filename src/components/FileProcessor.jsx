import React from "react";
import { remote } from "electron";

const FileProcessor = () => {
  const handleFileSelect = async () => {
    const filePath = await remote.dialog.showOpenDialog({
      properties: ["openFile"],
    });

    // Send the file path to the Node.js backend using IPC
    remote.ipcRenderer.send("process-file", filePath);
  };

  return (
    <div>
      <button onClick={handleFileSelect}>Select File</button>
    </div>
  );
};

export default FileProcessor;
