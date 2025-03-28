import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase-config";

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if(user) console.log(currentUser);
      
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet context={{ user }} /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
