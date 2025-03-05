import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // הקומפוננטה הראשית שלך
import './index.css';

// ודא שהאלמנט קיים ב-DOM לפני הקריאה ל-createRoot
const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);  // צור את ה-root אם האלמנט קיים
  root.render(
    <React.StrictMode>
      <App />  {/* כאן אתה מציג את הקומפוננטה הראשית */}
    </React.StrictMode>
  );
} else {
  console.error('לא נמצא אלמנט עם id="root" ב-DOM');
}
