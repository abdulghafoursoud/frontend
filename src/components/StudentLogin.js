import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from "react";



const InstructorLogin = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [reg_no, setReg] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const navigate = useNavigate();

  const MAX_ATTEMPTS = 2; // Maximum allowed login attempts
  const COOLDOWN_TIME = 30; // Cooldown time in seconds

  // Handle cooldown timer
  useEffect(() => {
    let timer;
    if (isDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isDisabled) {
      setIsDisabled(false);
      setLoginAttempts(0); // Reset login attempts after cooldown
    }

    return () => clearInterval(timer);
  }, [countdown, isDisabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (isDisabled) return; // Prevent login while disabled

    try {
      const response = await axios.post("http://localhost:8000/api/Student_Login/", {
        reg_no,
        password,
      });

      if (response.status === 200) {
        sessionStorage.setItem("reg_no", reg_no);
        setSuccessMessage("Login successfully. Please wait...");

        setTimeout(() => {
          navigate("/StudentDashboard");
        }, 5000);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }

      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);

      if (attempts > MAX_ATTEMPTS) {
        setIsDisabled(true);
        setCountdown(COOLDOWN_TIME);
      }
    }

    setReg("");
    setPassword("");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Student Login Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="reg_no" className="form-label">
Registration Number            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="reg_no"
                name="reg_no"
                placeholder="Enter Registration Number..."
                value={reg_no}
                onChange={(e) => setReg(e.target.value)}
                disabled={isDisabled}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isDisabled}
                required
              />

<span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </span>

            </div>
          </div>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-circle text-danger"></i> {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isDisabled}
          >
            {isDisabled ? `Try again in ${countdown}s` : "Login"}
          </button>

          <br />
          <br />
          Student not registered? <Link to="/StudentRegistrationForm">Register here</Link>
        </form>

        {successMessage && (
          <div
            className="alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3"
            role="alert"
            style={{ zIndex: 1050 }}
          >
            <i
              className="bi bi-check-circle-fill"
              style={{ fontSize: "18px", color: "green" }}
            ></i>{" "}
            &nbsp; {successMessage} &nbsp;
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </div>
        )}

        {isDisabled && (
          <div className="alert alert-warning mt-3">
            Too Many Login Failed Attempts. Please Wait In {countdown} Seconds To Try Again.
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorLogin;
