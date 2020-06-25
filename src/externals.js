/*
This module exports a number of modules to the global scope (window object).
The Webpack configuration of the Screens modules externalises these modules.
The same holds for perspectives-react.
*/
import React from "react";

import * as PerspectivesReact from "perspectives-react";

import PerspectivesGlobals from "./perspectivesGlobals.js";

import * as ReactDOM from "react-dom"

window.React = React;
window.PerspectivesReact = PerspectivesReact;
window.PerspectivesGlobals = PerspectivesGlobals;
window.ReactDOM = ReactDOM;
