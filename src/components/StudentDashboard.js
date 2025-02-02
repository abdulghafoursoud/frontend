import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const StudentDashboard = () => {

// student should login to access this page
    const navigate = useNavigate(); 
    const reg_no = sessionStorage.getItem('reg_no'); 

    useEffect(() => {    
        if (!reg_no) {
            console.error('No Reg No found in sessionStorage');
            navigate('/StudentLogin');
            return;
        }
        
        }, [reg_no,navigate]);
      
// logout function
        const handleLogout = () => {
            sessionStorage.clear(); 
            navigate('/StudentLogin');
        };
    
        
            const [studentData, setStudentData] = useState([]);
            const navigate2 = useNavigate();
        
            useEffect(() => {
                const fetchStudentData = async () => {
                    const reg_no = sessionStorage.getItem('reg_no'); // Retrieve reg_no from sessionStorage
                    const encodedRegNo = encodeURIComponent(reg_no);
                    try {
                        const response = await axios.get(`http://localhost:8000/api/Student_Reg/${encodedRegNo}/`);
                        setStudentData(response.data); // Save the student data
                    } catch (error) {
                        if (error.response) {
                        } else {
                            // setErrorMessage('An error occurred. Please try again later.');
                        }
                    } finally {
                        // setLoading(false); // Stop the loading indicator
                    }
                };
        
                fetchStudentData();
            }, [navigate2]);
        
            
        
        return (
           
        <div>
                 
     <nav className="navbar navbar-expand-lg navbar-DarkOrange bg-DarkOrange shadow-sm" style={{background:'MediumAquamarine'}}>
                     <div className="container">
                         <span className="navbar-brand">
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
                                     <span className="nav-link active">
                                     <strong>{studentData.student_name}</strong>
                                     </span>
                                     
                                 </li>

                                 <li className="nav-item">
                                     <span className="nav-link active">
                                     {/* <strong>Project Status :</strong> <i class="bi bi-exclamation-octagon me-1"></i>                                     Not Upload Yet */}
                                     </span>
                                     
                                 </li>
     
                                 
                                 
                                
     
     
     
                                 
                             </ul>
                         </div>
                     </div>
                 </nav>
     
     
     




                  <div className="d-flex">
            {/* Sidebar */}
            <nav
                className="bg-Salmon text-white p-3"
                style={{ minHeight: "100vh", width: "250px",background:'Salmon'}}
            >
                <h3 className="text-center mb-4">Dashboard</h3>
                <p>{studentData.reg_no}</p>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <span className="nav-link text-white">
                            <i className="bi bi-house-door-fill"></i> &ensp;
                            <Link to="/StudentDashboard" style={{ textDecoration: "none", color: "inherit" }}>
                             Dashboard</Link>
                        </span>
                    </li>

                    <li className="nav-item">
                        <span className="nav-link text-white">
                        <Link to="/StudentProject" style={{ textDecoration: "none", color: "inherit" }}>
                        <i class="bi bi-folder"></i>&ensp;
                        Projects</Link>
                        </span>
                    </li>
                    
                    
                    <li className="nav-item">
                    <Link to="/StudentSetting" style={{ textDecoration: "none", color: "inherit" }}>

                        <span className="nav-link text-white">
                            <i className="bi bi-gear-fill"></i> &ensp;
                            Settings
                        </span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <span className="nav-link text-white" onClick={handleLogout}>
                        <i class="bi bi-box-arrow-right"></i>&ensp;
                        Logout
                        </span>
                    </li>
                </ul>
            </nav>





            <div className="flex-grow-1 p-4">
                

            <div class="card" style={{border:'none'}}>
            <div class="card-body" style={{background:'MediumAquamarine',border:'none'}}>
             
              <nav>
                <ol class="breadcrumb" style={{color:'white'}}>
                <li class="breadcrumb-item"><Link to="/StudentDashboard" style={{ textDecoration: "none",color:"black"}}>Home</Link></li>
                <li class="breadcrumb-item"><Link to="/StudentProject" style={{ textDecoration: "none",color:"black"}}>Projects</Link></li>
                <li class="breadcrumb-item"><Link to="/StudentSetting" style={{ textDecoration: "none",color:"black"}}>Account Settings</Link></li>
                <li class="breadcrumb-item" onClick={handleLogout} style={{cursor:'pointer',color:'black'}}>Logout</li>

                </ol>
              </nav>
            </div>
          </div>


            <div className="container mt-5">
            <div className="card shadow" style={{borderRadius: '0',padding:'10px'}}>
                <div className="row g-0">
                    {/* Student Image */}
                    {/* <div className="col-md-4" style={{borderRadius: '0'}}> */}
                        {/* <img
src={`http://localhost:8000${studentData.image}`}  style={{height:"350px",width:"300px",borderRadius:"5px"}} */}


                    {/* </div> */}
                    {/* Student Information */}
                    <div className="col-md-8" style={{marginLeft:'0px'}}>
                        <div className="card-body">
                            <h5 className="card-title">Welcome, {studentData.student_name}</h5>
                            <hr></hr>
                            <p className="card-text">
                                <strong>Registration Number:</strong> {studentData.reg_no}
                            </p>
                            <p className="card-text">
                                <strong>Academic Level:</strong> {studentData.academic_level}
                            </p>
                            <p className="card-text">
                                <strong>Age:</strong> {studentData.age}
                            </p>
                            <p className="card-text">
                                <strong>Academic Year:</strong> {studentData.academic_year}
                            </p>
                            
                            <p className="card-text">
                                <strong>Phone Number :</strong> {studentData.phone_number}
                            </p>
                            <p className="card-text">
                                <strong>Course Name :</strong> {studentData.course_name}
                            </p>
                            <p className="card-text">
                                <strong>Gender :</strong> {studentData.gender}
                            </p>
                            <p className="card-text">
                                <strong>Email :</strong> {studentData.email}
                            </p>
                            <p className="card-text">
                            <strong>
                                    Your Password : </strong>
                                    {studentData.password}
        
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   



    </div>
        </div>

       
       
        
                 </div>

);
};

export default StudentDashboard;