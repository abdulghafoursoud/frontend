import React, { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from "react-router-dom";



const UpdatePassword = () => {

    
// instructor should login to access this page
const navigate = useNavigate(); 
const email = sessionStorage.getItem('email'); 

useEffect(() => {    
    if (!email) {
        console.error('No email found in sessionStorage');
        navigate('/InstructorLogin');
        return;
    }
    
    }, [email,navigate]);
  
// logout function
    const handleLogout = () => {
        sessionStorage.clear(); 
        navigate('/InstructorLogin');
    };

      // update student info 
      const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      const [successMessage, setSuccess] = useState(null);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);
        const email = sessionStorage.getItem('email'); // Retrieve reg_no from sessionStorage
        try {

          await axios.put(`http://localhost:8000/api/update_admin_password/${email}/`, formData);
          setSuccess("Updated Password Successfully!");
          

          setTimeout(() => {
            window.location.reload();
          }, 2000); // 2000 milliseconds = 2 seconds

        } catch (err) {
          // setError(err.response?.data?.error || "An error occurred while updating details.");
        } finally {
          // setLoading(false);
        }
      };
    
        

  return (
    <>


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
                  <h2>Update Password</h2>
                  <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email" readOnly
                        className="form-control" placeholder="Enter New Email"
                        id="email" name="email"
                        value={email}
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


    
    </>
  );
};

export default UpdatePassword;
