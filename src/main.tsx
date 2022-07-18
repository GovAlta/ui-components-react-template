import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';


import '@abgov/styles';
import { WorkExperienceRoute } from './routes/work-experience';
import { HomeRoute } from './routes/home';

ReactDOM.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="work-experience" element={<WorkExperienceRoute />} />
          <Route path="/" element={<HomeRoute />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
