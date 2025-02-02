import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const WelcomePage = () => {
    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-dark shadow-sm">
                <div className="container">
                    <span className="navbar-brand" style={{ color: "white" }}>
                        <h3>SPSS</h3>
                    </span>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <span className="nav-link active"  style={{ color: "white" }}>
                                    Home
                                </span>
                            </li>

                            <li className="nav-item">
                                <span className="nav-link active" style={{ color: "white" }}>
                                <Link to="/InstructorLogin" style={{ textDecoration: "none", color: "inherit" }}>
                                    Instructor Login </Link>
                                </span>
                            </li>

                            <li className="nav-item">
                                <span className="nav-link active" style={{ color: "white" }}>
                                <Link to="/StudentLogin" style={{ textDecoration: "none", color: "inherit" }}>
                                    Student Login </Link>
                                </span>
                            </li>
                            
                           



                            
                        </ul>
                    </div>
                </div>
            </nav>



            
            <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img src="/home.jpg"  alt=""
            className="img-fluid mb-4" 
            style={{ maxHeight: '300px', objectFit: 'cover' , borderRadius: '10px'}} // Responsive image styling
          />
        </div>
        <div className="col-md-6 text-center">
          <h1 className="display-4">Welcome To SPSS</h1>
          <p className="lead">"An online project submission system revolutionizes the way we 
            share ideas and collaborate, transforming the tedious process of submitting work into a seamless experience that fosters creativity, 
            enhances organization, and ensures that every contribution is valued and easily accessible."</p>
          <hr className="my-4" />
          <p>Are You a <strong>Student ?</strong> Log in to get started.</p>
          <div className="mt-4">

           <Link to="/StudentRegistrationForm" style={{ textDecoration: "none", color: "inherit" }}>

            <span className="btn btn-primary btn-lg me-2"  role="button">Sign Up</span></Link> 
            
            <Link to="/StudentLogin" style={{ textDecoration: "none", color: "inherit" }}>
            <span className="btn btn-secondary btn-lg" role="button">Log In</span></Link>
          </div>
        </div>
      </div>
    </div>

<br></br>

    
        </div>
    );
};

export default WelcomePage;
