import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // הקומפוננטה הראשית שלך
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />  {/* כאן אתה מציג את הקומפוננטה הראשית */}
  </React.StrictMode>
);
