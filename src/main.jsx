/*
 * main.jsx
 *
 * This is the entry point of the React application.
 * It initializes and renders the root React component (`App.jsx`).
 * React Router (`BrowserRouter`) is used to enable client-side routing.
 */

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

/*
 * Create a root for rendering the React application.
 * - `document.getElementById('root')` selects the root HTML element in index.html.
 * - `createRoot` enables concurrent rendering (React 18 feature).
 * 
 * concurrent rendering
 * - It allows React to handle multiple rendering tasks simultaneously without blocking the main thread.
 * - This approach enhances the responsiveness of applications, especially those with complex UIs or frequent updates.
 * - Instead of completing one rendering task before starting another, React can pause and resume tasks, prioritizing UI and critical updates.
 */
createRoot(document.getElementById('root')).render(

   /* 
   * Wrap the entire application in BrowserRouter to enable React Router functionality.
   * This allows navigation between different pages/components without reloading the page.
   */
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
