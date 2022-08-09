import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { WorkExperienceRoute } from './routes/work-experience';
import { HomeRoute } from './routes/home';
import App from './App';

import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="work-experience" element={<WorkExperienceRoute />} />
          <Route path="/" element={<HomeRoute />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);
