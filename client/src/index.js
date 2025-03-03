import React from "react";
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import "./style.css";
import App from "./App";

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);