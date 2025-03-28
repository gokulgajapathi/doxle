import { useEffect } from 'react'
import './App.css'
import { auth } from './firebase-config'
import { IndexeddbPersistence } from 'y-indexeddb';
import { onAuthStateChanged } from 'firebase/auth'
import Editor  from './components/Editor';
import Header from './components/Header'
import Footer from './components/Footer';
import { Route, Router, Routes } from 'react-router-dom';
import { Login } from './components/Login'
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from './utils/ProtectedRoutes';
import NotFound from './components/NotFound';

function App() {

  const clearIndexedDB = async () => {
    await IndexeddbPersistence.clearData('quill-demo-room');
    console.log('IndexedDB data deleted for quill-demo-room');
  };

  // useEffect (() => {
  //   onAuthStateChanged(auth, async(user) => {
  //     if(user) {
  //       console.log(`User signed in: ${ user.displayName}`);
        
  //     }
  //   });
  // }, []);

  return (
    <>
      <Header clearIndexedDB={clearIndexedDB} /> {/* ✅ Moved outside <Routes> */}

      <ToastContainer /> {/* ✅ Also moved outside <Routes> */}
      
      <Routes> 
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/editor" element={<Editor />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer /> {/* ✅ Moved outside <Routes> */}
    </>
  );
}

export default App
