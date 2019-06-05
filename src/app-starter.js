"use strict";

const path = require("path");
const electron = require("electron");
const { app, protocol } = require('electron');
// Module to control application life.
// const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// The default port is 3456. Configure a port by providing the environment variable WEBPACK_DEVSERVER_PORT with a value.
const port = process.env.WEBPACK_DEVSERVER_PORT || 3456;

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Protocol will be "app://./…"
const scheme = 'app';

/* Protocol */
// Registering must be done before app::ready fires
// (Optional) Technically not a standard scheme but works as needed
protocol.registerSchemesAsPrivileged(
  [
    { scheme: scheme, privileges: { bypassCSP: true, standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } }
  ]);

function createWindow ()
{

  // Base path used to resolve modules
  const base = app.getAppPath();

  // Create protocol
  require('./createProtocol.js')(scheme, base);

  // Create the browser window.
  // mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow = new BrowserWindow(
    {
      webPreferences: {
        nodeIntegration: true
        // preload: './preload.js'
      }
    });

  // mainWindow.loadURL("http://localhost:" + port + "/index.html");
  mainWindow.loadURL("file://" + path.join(__dirname, "../public/index.html" ));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function ()
  {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function ()
{
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin")
  {
    app.quit();
  }
});

app.on("activate", function ()
{
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null)
  {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
