perspectives-react-integrated-client
======================

### A standard development interface
This client includes the perspectives-core. It uses the internal channel to communicate with the core. However, the core will also listen on TCP port 7777.

### Develop this interface
1. `$npm run serve` to start the development server (that serves the bundled code on port 5678).
2. `npm run electron` to start the interface (the browser, that tries to read from port 5678). **Note**: this will also start perspectives-core listening on port 7777!
3. `npm run watch` before changing code, otherwise changes will not be reflected in the interface!

### Symlinks for easy updates
`package.json` contains a run target `symlinks` that will replace the subdirectories
* perspectives-react
* perspectives-core
* perspectives-proxy

with symlinks to the same-named projects in ~Code. Run this script after calling `npm install`. A change in the `dist` directories of these projects is then immediately picked up by webpack (when watching, of course).

### About deployment
This module depends on Webpack, the Webpack-development-server and Electron. There are three
run targets:
*  **watch**: Webpack will watch source files, transpile ES6 and JSX and bundle everything under `index.js`.
* **serve**: Runs the webpack-development-server on port 4567. To change the port, edit package.js where an environment variable is set
(it is actually set twice; keep the value the same for both processes!)
* **electron**: Starts electron with the interface.

Webpack targets the electron-renderer process. The code that it runs contains a reference to `perspectives-proxy`, which uses the Node `net` module.
This cannot run in an ordinary browser. However, the Chromium in Electron allows access to `net`.

### Dependencies
This client depends on:
* `perspectives-core`
* `perspectives-react`
* `perspectives-proxy`

The latter module is not required by the App itself, but as an external dependency by both `perspectives-core` and `perspectives-react`. Hence it is listed as a dependency in `package.json`.

### System and user instances
This client creates instances for `User`, `TrustedCluster` and `Systeem` if they cannot be found in its Couchdb. The instances are loaded from the the model itself.

### Test-using this program
It should be noted that this program is in an alpha-stage. Currently we have the very first release published. In order to test-drive it, you will have to install the package with all its dependencies. Also, don't forget to install Couchdb! Then evaluate in a console:

```
$npm run serve
$npm run electron
```
This will bring up the Electron client showing the starting screen.
