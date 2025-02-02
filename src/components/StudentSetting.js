import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const StudentSetting = () => {

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
    
        

// update student info 
const [formData, setFormData] = useState({
  reg_no: "",
  password: "",
});
const [successMessage, setSuccess2] = useState(null);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccess2(null);
  const reg_no = sessionStorage.getItem('reg_no'); // Retrieve reg_no from sessionStorage
  try {

    await axios.put(`http://localhost:8000/api/Student_Update/${reg_no}/`, formData);
    setSuccess2("Updated Password Successfully!");
    

    setTimeout(() => {
      window.location.reload();
    }, 2000); // 2000 milliseconds = 2 seconds

  } finally {
  }
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
                        
                    } 
                };
        
                fetchStudentData();
            }, [navigate2]);
        

            
                
        
        return (
           
        <div>
                 
     <nav className="navbar navbar-expand-lg navbar-DarkOrange bg-DarkOrange shadow-sm" style={{background:'MediumAquamarine'}}>
                     <div className="container">
                         <span className="navbar-brand" href="/">
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
                                     {studentData.student_name}
                                     </span>
                                     
                                 </li>

                                 <li className="nav-item">
                                     <span className="nav-link active">
                                     <strong>Project Status :</strong> <i class="bi bi-exclamation-octagon me-1"></i>                                     Not Upload Yet
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
                        <span className="nav-link text-white">
                            <i className="bi bi-gear-fill"></i> &ensp;
                            Settings
                        </span>
                    </li>

                    <li className="nav-item">
                        <span href="" className="nav-link text-white" onClick={handleLogout}>
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
                <li class="breadcrumb-item"><Link to="/StudentDashboard" style={{ textDecoration: "none",color:"black"}}>Projects</Link></li>
                <li class="breadcrumb-item"><Link to="/StudentDashboard" style={{ textDecoration: "none",color:"black"}}>Account Settings</Link></li>
                <li class="breadcrumb-item" onClick={handleLogout} style={{cursor:'pointer',color:'black'}}>Logout</li>

                </ol>
              </nav>
            </div>
          </div>


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
           
          </div>
        )}
          
          <div className="container mt-5" style={{width:'80%',padding:'20px',
                float:'left',border:'1px solid lightgray',borderRadius:'5px'}}>
                  <h2>Student Update Password</h2>
                  <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                      <label htmlFor="reg_no" className="form-label">Email</label>
                      <input
                        type="text" readOnly
                        className="form-control"
                        id="reg_no" name="reg_no"
                        value={reg_no}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-control" placeholder="Set New Password"
                        id="password" name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Update Information</button>
                  </form>
                </div>
             

           
                
           


    </div>


    
        </div>

       
       
        
                 </div>

);
};

export default StudentSetting;