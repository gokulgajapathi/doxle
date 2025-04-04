/*
 * NotFound.js
 * 
 * Handles unknown routes by displaying a 404 error message.
 */
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ height: "70vh", textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
