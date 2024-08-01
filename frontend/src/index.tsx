import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Router>
        <p>insideindextsx</p>
        <p>jgvugv newafter github</p>

        <App />
      </Router>
    </React.StrictMode>
  );
}
