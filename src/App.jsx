/*
 * App.jsx
 * 
 * Entry point of the application that sets up routing and global components (header & footer).
 */
import './App.css'
import Editor  from './components/Editor';
import Header from './components/Header'
import Footer from './components/Footer';
import { Route, Router, Routes } from 'react-router-dom';
import { Login } from './components/Login'
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from './utils/ProtectedRoutes';
import NotFound from './components/NotFound';

function App() {

  // const clearIndexedDB = async () => {
  //   await IndexeddbPersistence.clearData('quill-demo-room');
  //   console.log('IndexedDB data deleted for quill-demo-room');
  // };

  return (
     /*
   * Renders the global header and footer.
   * Uses Routes to manage navigation across different pages.
   */
    <>
      <Header /> 

      <ToastContainer /> 
      <Routes> 
        <Route path="/" element={<Login />} />

        {/* Protected route for Editor */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/editor" element={<Editor />} />
        </Route>

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App
