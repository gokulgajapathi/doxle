import { useEffect } from 'react'
import './App.css'
import { auth } from './firebase-config'
import { IndexeddbPersistence } from 'y-indexeddb';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import Editor  from './components/Editor';
import Header from './components/Header'
import Footer from './components/Footer';
import { Route, Router, Routes } from 'react-router-dom';
import { Login } from './components/Login'

function App() {

  const clearIndexedDB = async () => {
    await IndexeddbPersistence.clearData('quill-demo-room');
    console.log('IndexedDB data deleted for quill-demo-room');
  };

  useEffect (() => {
     signInAnonymously(auth);
    onAuthStateChanged(auth, user => {
      if(user) {
        console.log(`User signed in: ${user.uid}`);
        
      }
    });
  }, []);

  return (
    
      <div>
      <Header clearIndexedDB={clearIndexedDB} />

        <Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>

      <Footer />
    </div>
  )
}

export default App
