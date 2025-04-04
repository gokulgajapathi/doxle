/*
 * ProtectedRoutes.js
 * 
 * Ensures only authenticated users can access specific routes.
 */
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { toast } from "react-toastify";

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    // State to prevent multiple redirects
  const [redirecting, setRedirecting] = useState(false); 

    /*
   * useEffect hook to listen for authentication changes.
   * Updates 'user' state when authentication state changes.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup function to unsubscribe from the listener when component unmounts.
    return () => unsubscribe();
  }, []);

  /*
   * useEffect to handle redirection when the user is not authenticated.
   * Displays a toast notification before redirecting.
   */
  useEffect(() => {
    if (!loading && !user && !redirecting) {
      toast.error("Please sign in!", { position: "top-center" });
      setRedirecting(true);
    }
  }, [loading, user, redirecting]);

  // If authentication check is still running, show a loading message.
  if (loading) return <div>Loading...</div>;

    // If user is authenticated, render the requested component; otherwise, redirect to home.
  return user ? <Outlet context={{ user }} /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
