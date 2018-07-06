perspectives-react-integrated-client
======================

### A standard development interface
This client includes the perspectives-core. It uses the internal channel to communicate with the core. However, the core will also listen on TCP port 7777.

### Develop this interface
1. `$npm run serve` to start the development server (that serves the bundled code on port 5678).
2. `npm run electron` to start the interface (the browser, that tries to read from port 5678). **Note**: this will also start perspectives-core listening on port 7777!
3. `npm run watch` before changing code, otherwise changes will not be reflected in the interface!

### About deployment
This module depends on Webpack, the Webpack-development-server and Electron. There are three
run targets:
*  **watch**: Webpack will watch source files, transpile ES6 and JSX and bundle everything under `index.js`.
* **serve**: Runs the webpack-development-server on port 4567. To change the port, edit package.js where an environment variable is set
(it is actually set twice; keep the value the same for both processes!)
* **electron**: Starts electron with the interface.

Webpack targets the electron-renderer process. The code that it runs contains a reference to `perspectives-proxy`, which uses the Node `net` module.
This cannot run in an ordinary browser. However, the Chromium in Electron allows access to `net`.
