import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { BasicFormRoute } from './routes/basic-form';
import { BasicFormSuccessRoute } from './routes/basic-form-success';
import { HomeRoute } from './routes/home';
import App from './App';

import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="basic-form-success" element={<BasicFormSuccessRoute />} />
          <Route path="basic-form" element={<BasicFormRoute />} />
          <Route path="/" element={<HomeRoute />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);
