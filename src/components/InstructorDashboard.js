import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const InstructorDashboard = () => {

  const [count, setCount] = useState(null);

    useEffect(() => {
        // Function to fetch diploma student count
        const fetchDiplomaCount = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/count-diploma-students/');
                setCount(response.data.diploma_students_count);
            } catch (err) {
                
            } 
        };

        fetchDiplomaCount();
    }, []);



    const [count2, setCount2] = useState(null);

    useEffect(() => {
        // Function to fetch degree student count
        const fetchdegreeCount = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/count-degree-students/');
                setCount2(response.data.degree_students_count);
            } finally {
            }
        };

        fetchdegreeCount();
    }, []);








  const [StudentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/student-count/"); // Update with your actual API URL
        const data = await response.json();
        setStudentCount(data.count);
      } catch (error) {
        console.error("Error fetching projects count:", error);
      }
    };

    // Fetch data immediately and then every 3 seconds
    fetchStudentCount();
    const intervals = setInterval(fetchStudentCount, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervals);
  }, []); 

  

    


    const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    const fetchProjectCount = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/project_count/"); // Update with your actual API URL
        const data = await response.json();
        setProjectCount(data.count);
      } catch (error) {
        console.error("Error fetching projects count:", error);
      }
    };

    // Fetch data immediately and then every 3 seconds
    fetchProjectCount();
    const interval = setInterval(fetchProjectCount, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); 



    


// instructor should login to access this page
    const navigate = useNavigate(); 
    const email = sessionStorage.getItem('email'); 

    useEffect(() => {    
        if (!email) {
            console.error('No email found in sessionStorage');
            navigate('/InstructorLogin');
            return;
        }
        
        }, [email, navigate]);
      
// logout function
        const handleLogout = () => {
            sessionStorage.clear(); 
            navigate('/InstructorLogin');
        };
    

    




   
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
                style={{ minHeight: "100vh", width: "250px",background:"Salmon"}}
            >
                <h3 className="text-center mb-4">Instructor Panel</h3>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <span className="nav-link text-white">
                            <i className="bi bi-house-door-fill"></i> &ensp;
                            <Link to="/InstructorDashboard" style={{ textDecoration: "none", color: "inherit" }}>
                             Dashboard</Link>
                        </span>
                    </li>

                    <li className="nav-item">
                        <span className="nav-link text-white">
                        <Link to="/InstructorProject" style={{ textDecoration: "none", color: "inherit" }}>
                        <i class="bi bi-folder"></i>&ensp;
                        Projects</Link>
                        </span>
                    </li>
                    
                    
                    <li className="nav-item">
                        <span className="nav-link text-white">
                            <i className="bi bi-gear-fill"></i> &ensp;
                            <Link to="/InstructorSetting" style={{ textDecoration: "none",color:"white"}}>Settings</Link>
                        </span>
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
                <li class="breadcrumb-item"><Link to="/InstructorDashboard" style={{ textDecoration: "none",color:"black"}}>Home</Link></li>
                <li class="breadcrumb-item"><Link to="/InstructorProject" style={{ textDecoration: "none",color:"black"}}>Projects</Link></li>
                <li class="breadcrumb-item"><Link to="/InstructorSetting" style={{ textDecoration: "none",color:"black"}}>Account Settings</Link></li>
                <li class="breadcrumb-item" onClick={handleLogout} style={{cursor:'pointer',color:'black'}}>Logout</li>

                </ol>
              </nav>
            </div></div>
                
                <div className="container mt-2">
      <div className="row justify-content-center">
      <div className="col-md-4 p-3" style={{width:"200px",marginRight:"10px"}}> {/* Remove padding */}
      <div className="card text-white bg-success mb-3" style={{width:"200px",border:"none",textAlign:"center"}}>  {/* Remove bottom margin */}
            <div className="card-header">All Students Registered</div>
            <div className="card-body">            
              <h5 className="card-title" style={{textAlign:'center'}}><i className="bi bi-person-fill fa-3x"></i>
              <i className="bi bi-person-fill fa-3x"></i>&ensp;{StudentCount}</h5>
            </div>
          </div>
        </div>


        <div className="col-md-4 p-3" style={{width:"200px",marginRight:"10px"}}> {/* Remove padding */}
      <div className="card text-white bg-success mb-3" style={{width:"200px",border:"none",textAlign:"center"}}>  {/* Remove bottom margin */}
            <div className="card-header" style={{background:"Salmon",color:"#770737"}}>All Projects Uploaded</div>
    <div className="card-body" style={{background:"Salmon",borderBottomLeftRadius:"6px",borderBottomRightRadius:"6px",color:"#770737"}}>            
              <h5 className="card-title" style={{textAlign:'center'}}><i class="bi bi-folder"></i><i class="bi bi-folder"></i>
              &ensp;{projectCount}</h5>
            </div>
          </div>
        </div>

        
        {/* <div className="col-md-4 p-3" style={{width:"200px",marginRight:"10px"}}> {/* Remove padding */}
      
        <div className="col-md-4 p-3" style={{width:"200px",marginRight:"10px"}}> {/* Remove padding */}
      <div className="card text-white bg-success mb-3" style={{width:"200px",border:"none",textAlign:"center"}}>  {/* Remove bottom margin */}
            <div className="card-header" style={{background:"#D8BFD8",color:"#770737"}}>Diploma Students</div>
    <div className="card-body" style={{background:"#D8BFD8",borderBottomLeftRadius:"6px",borderBottomRightRadius:"6px",color:"#770737"}}>            
              <h5 className="card-title" style={{textAlign:'center'}}><i className="bi bi-person-fill fa-3x"></i>
              <i className="bi bi-person-fill fa-3x"></i>&ensp;{count}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4 p-3" style={{width:"200px",marginRight:"10px"}}> {/* Remove padding */}
      <div className="card text-white bg-success mb-3" style={{width:"200px",border:"none",textAlign:"center"}}>  {/* Remove bottom margin */}
            <div className="card-header" style={{background:"#F3CFC6",color:"#770737",textAlign:"center"}}>Degree Students</div>
<div className="card-body" style={{background:"#F3CFC6",color:"#770737",textAlign:"center",borderBottomLeftRadius:"6px",borderBottomRightRadius:"6px"}}>            
              <h5 className="card-title" style={{textAlign:'center'}}><i className="bi bi-person-fill fa-3x"></i>
              <i className="bi bi-person-fill fa-3x"></i>&ensp;{count2}</h5>
            </div>
          </div>
        </div>





       
    

        


      </div>
    </div>



    {/* <div className="container mt-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Search Student</h5>
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Search student by name.."
              aria-label="Search students"
            />
            
          </div>
        </div>
        <div className="card-body">
          {/* Content for all students goes here */}
          {/* <p>List of Students will be displayed here.</p>
        </div>
      </div>
    </div> */} 

     
</div>
        </div>


        
                 </div>

);
};

export default InstructorDashboard;