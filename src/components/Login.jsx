import React from "react";
import GoogleButton from "react-google-button";

export const Login = () => {
  const handleGoogleSignIn = () => {
    console.log("Google Sign-In Clicked");
    // Implement Google Sign-In logic here
  };

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
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
        <p style={styles.description}>Sign in to continue and manage your account seamlessly.</p>
        <GoogleButton onClick={handleGoogleSignIn} style={styles.button} />
        <p style={styles.terms}>
          By signing in, you agree to our <a href="#" style={styles.link}>Terms of Service</a> and <a href="#" style={styles.link}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};
