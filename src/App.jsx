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
    <>
      <Header /> 

      <ToastContainer /> 
      <Routes> 
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/editor" element={<Editor />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App
