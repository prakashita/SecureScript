import React, { useState } from "react";
import Login from "./Login";
import Register from "./Registration";

function Home() {
  // State to track which component to render
  const [showRegister, setShowRegister] = useState(false);
 

  return (
    <div className="flex jumbotron centered">
      <div className="container">
        <i className="fas fa-key fa-6x"></i>
        {/* Button to toggle between Register and Login */}
        {showRegister ? (
          <Register />
        ) : (
          <Login  /> // Pass errors as a prop to Login component
        )}
        <button
          className="btn btn-light btn-lg"
          onClick={() => setShowRegister(true)}
        >
          Register
        </button>
        <button
          className="btn btn-dark btn-lg"
          onClick={() => setShowRegister(false)}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;
