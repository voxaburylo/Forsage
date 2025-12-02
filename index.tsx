import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  document.body.innerHTML = '<div style="color:red; padding:20px;">CRITICAL ERROR: Root element not found.</div>';
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Application crashed:", error);
  rootElement.innerHTML = `
    <div style="padding: 20px; background: #1a0000; color: #ff6b6b; font-family: sans-serif; height: 100vh;">
      <h1>Something went wrong.</h1>
      <pre>${error instanceof Error ? error.message : JSON.stringify(error)}</pre>
      <p>Check the console for more details.</p>
    </div>
  `;
}