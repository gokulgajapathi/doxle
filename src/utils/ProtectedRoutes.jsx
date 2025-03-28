import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { toast } from "react-toastify";

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Avoid flashing login screen

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once we know auth state
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (loading) return <div>Loading...</div>; // Prevent UI flicker

  if (!user) {
    toast.error("You must be logged in to access this page!",{
      position: "top-center"
    });
    return <Navigate to="/" />;
  }

  return <Outlet context={{ user }} />;
};

export default ProtectedRoutes;
