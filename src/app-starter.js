"use strict"; //3

const path = require("path");
const electron = require("electron");
const { ipcMain, net } = require('electron');
const { app, protocol } = require('electron');
const yargs = require('yargs');
const runAutoUpdater = require("./autoUpdate.js").runAutoUpdater;
const { couchdbHost, couchdbPort } = require("./couchdbconfig.js");

var btoa = require('btoa');

// Module to control application life.
// const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// The default port is 3456. Configure a port by providing the environment variable WEBPACK_DEVSERVER_PORT with a value.
const port = process.env.WEBPACK_DEVSERVER_PORT || 5678;

let sessionCookieDeleted = false;

////////////////////////////////////////////////////////////////////////////////
//// COMMAND LINE ARGUMENTS
////////////////////////////////////////////////////////////////////////////////
const argv = yargs
    .option('devtools', {
        alias: 'd',
        description: 'Open devtools in client window',
        type: 'boolean',
    })
    .help()
    .alias('help', 'h')
    .argv;


////////////////////////////////////////////////////////////////////////////////
//// MAIN WINDOW
////////////////////////////////////////////////////////////////////////////////

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow ()
{

  // Base path used to resolve modules
  const base = app.getAppPath();

  // Create the browser window.
  // mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow = new BrowserWindow(
    {
      // size for movie on 1280x800 screen.
      width: 1280,
      // height: 400,

      // For debugging auto-update (positioning window left from version window).
      // width: 600,
      height: 600,
      x: 10,
      y: 0,
      webPreferences: {
        nodeIntegration: true
        // preload: './preload.js'
      }
    });

  // mainWindow.loadURL("http://localhost:" + port + "/public/index.html");
  // If app-starter.js resides in /public:
  mainWindow.loadURL("file://" + path.join(__dirname, "index.html?host=" + btoa( couchdbHost ) + "&port=" + couchdbPort  ));
  // If app-starter.js resides in /src:
  // mainWindow.loadURL("file://" + path.join(__dirname, "../public/index.html" ));

  // Open the DevTools.
  if (argv.devtools)
  {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('close', function(event)
    {
      if (!sessionCookieDeleted)
      {
        // Stop shutting down.
        event.preventDefault();
        // Sends an asynchronous message to the webpage to delete the session cookie.
        mainWindow.webContents.send('quit', "quit");
      }
    })

  // Emitted when the window is closed.
  mainWindow.on("closed", function ()
  {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Handle dragging a file out to the file system.
  ipcMain.on('ondragstart', (event, filePath) => {
    event.sender.startDrag(
      { file: filePath
      , icon: process.cwd() + '/public/file.png'
    })
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Run the auto updater.
runAutoUpdater();

app.on('before-quit', (event) => {
  if (!sessionCookieDeleted)
  {
    // Stop shutting down.
    event.preventDefault();
    // Sends an asynchronous message to the webpage to delete the session cookie.
    mainWindow.webContents.send('quit', "quit");
  }
})

// Once the webpage has deleted the session cookie, shut down.
ipcMain.on('sessionTerminated', function()
  {
    sessionCookieDeleted = true;
    app.quit();
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
