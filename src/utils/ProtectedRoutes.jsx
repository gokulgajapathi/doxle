import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { toast } from "react-toastify";

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user && !redirecting) {
      toast.error("Please sign in!", { position: "top-center" });
      setRedirecting(true);
    }
  }, [loading, user, redirecting]);

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet context={{ user }} /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
