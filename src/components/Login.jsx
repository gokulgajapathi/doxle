import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {React, useState} from "react";
import GoogleButton from "react-google-button";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In Clicked");
    // Implement Google Sign-In logic
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then( (result) => {
      console.log(result);
      if (result.user) {
        toast.success("User logged in Successfully", {
          position: "top-center"
        });
        navigate('/editor');
      }
      
    })
  };

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "70vh",
      backgroundColor: "#f3f4f6",
      padding: "16px",
    },
    card: {
      backgroundColor: "white",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "16px",
      padding: "32px",
      maxWidth: "400px",
      width: "100%",
      textAlign: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "16px",
    },
    description: {
      color: "#4b5563",
      marginBottom: "24px",
    },
    button: {
      width: "100%",
    },
    terms: {
      fontSize: "14px",
      color: "#6b7280",
      marginTop: "16px",
    },
    link: {
      color: "#3b82f6",
      textDecoration: "none",
    },
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.description}>Sign in quickly and get back to what matters — no hassle, just seamless access.</p>
        <GoogleButton onClick={handleGoogleSignIn} style={styles.button} />
        <p style={styles.terms}>
        Because who doesn't love reading Terms of Service before signing in? But hey, click the button and let's pretend you did. Welcome back!
          {/* By signing in, you agree to our <a href="#" style={styles.link}>Terms of Service</a> and <a href="#" style={styles.link}>Privacy Policy</a>. */}
        </p>
      </div>
    </div>
  );
};
