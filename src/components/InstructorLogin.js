import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const InstructorLogin = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage(''); // Clear previous error message
      setSuccessMessage(''); // Clear previous success message

      try {
        const response = await axios.post('http://localhost:8000/api/Instructor_Login/', {
          email,
          password,
        });
  
        // If login is successful, delay redirection to the dashboard
        if (response.status === 200) {
          sessionStorage.setItem('email', email);
          setSuccessMessage('Login successfully Please Wait....');

          // Add a 3-second delay before redirecting
          setTimeout(() => {
            navigate('/InstructorDashboard'); // Redirect to your dashboard route
          }, 5000);
        }
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message); // Show error message from server
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      }
    };
  
     return (
         <div className="container d-flex justify-content-center align-items-center vh-100">
             <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
                 <h3 className="text-center mb-4">Instructor Login Form</h3>
                 <form onSubmit={handleSubmit}>
                     {/* Username Field with Icon */}
                     <div className="mb-3">
                         <label htmlFor="email" className="form-label">Username Or Email</label>
                         <div className="input-group">
                             <span className="input-group-text">
                                 <i className="bi bi-person"></i> {/* Bootstrap person icon */}
                             </span>
                             <input
                                 type="email"
                                 className="form-control"
                                 id="email"
                                 name="email"
                                 placeholder="Enter Username Or Email"
                                 value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                 required
                             />
                         </div>
                     </div>
                     {/* Password Field with Icon */}
                     <div className="mb-3">
                         <label htmlFor="password" className="form-label">Password</label>
                         <div className="input-group">
                             <span className="input-group-text">
                                 <i className="bi bi-lock"></i> {/* Bootstrap lock icon */}
                             </span>
                             <input
                                 type="password"
                                 id="password"
                                 className="form-control"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 required
                             />
                         </div>
                     </div>
                     {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                               <i className="fas fa-exclamation-circle text-danger"></i> {errorMessage}
                            </div>
                        )}
                     <button type="submit" className="btn btn-primary w-100">Login</button>
                 </form>

                 {successMessage && ( 
        <div
          className="alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3"
          role="alert"
          style={{ zIndex: 1050 }}
        > <i
        className="bi bi-check-circle-fill"
        style={{ fontSize: "18px", color: "green" }}
      ></i>{" "}
          {successMessage} &nbsp;
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          
        </div>
      )}


                 <div className="mt-3 text-center">
                    

                 </div>
             </div>
         </div>
     );
 };
 
 export default InstructorLogin;
 