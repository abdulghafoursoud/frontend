import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Form, Button, Alert } from "react-bootstrap";



const InstructorDashboard = () => {
    

    const [formData, setFormData] = useState({
        project_title: "",
        course: "",
        st_reg_no: "",
        date_uploaded: "",
        project_file: null,
      });
      const [message, setMessage] = useState("");
      const [messageType, setMessageType] = useState("");
      const [showForm, setShowForm] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedExtensions = ["doc", "docx", "pdf"];
        const fileExtension = file.name.split(".").pop().toLowerCase();
    
        if (!allowedExtensions.includes(fileExtension)) {
          setMessage("Invalid file format. Only DOC, DOCX, and PDF are allowed.");
          setMessageType("danger");
          setFormData({ ...formData, project_file: null });
        } else {
          setMessage("");
          setFormData({ ...formData, project_file: file });
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
    
        if (!formData.project_file) {
          setMessage("Please upload a valid project file.");
          setMessageType("danger");
          return;
        }
    
        try {
          // Check if st_reg_no exists
          const checkResponse = await axios.get(
            `http://localhost:8000/api/check_project_reg_number/${formData.st_reg_no}/`
          );
    
          if (checkResponse.data.exists) {
            setMessage("Student registration number already exists.");
            setMessageType("danger");
            return;
          }
    
          // Upload project data
          const uploadData = new FormData();
          uploadData.append("project_title", formData.project_title);
          uploadData.append("course", formData.course);
          uploadData.append("st_reg_no", formData.st_reg_no);
          uploadData.append("date_uploaded", formData.date_uploaded);
          uploadData.append("project_file", formData.project_file);
    
          await axios.post("http://localhost:8000/api/Project/", uploadData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
    
          setMessage("Project uploaded successfully!");
          setMessageType("success");
          setTimeout(() => {
            window.location.reload();
          }, 1000); // 2000 milliseconds = 2 seconds
          setFormData({
            project_title: "",
            course: "",
            st_reg_no: "",
            date_uploaded: "",
            project_file: null,
          });
        } catch (error) {
          setMessage("Error uploading project. Please try again.");
          setMessageType("danger");
        }
      };
    



       
// instructor should login to access this page
    const navigate = useNavigate(); 
    const email = sessionStorage.getItem('email'); 

    useEffect(() => {    
        if (!email) {
            console.error('No email found in sessionStorage');
            navigate('/InstructorLogin');
            return;
        }
        
        }, []);
      
// logout function
        const handleLogout = () => {
            sessionStorage.clear(); 
            navigate('/InstructorLogin');
        };
    

    


// fetch all students
    const [project, setproject] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/Project/');
          setproject(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Fetch data every 5 seconds
    const interval = setInterval(() => {
        fetchData();
      }, 3000);
  
      // Fetch initial data
      fetchData();
  
      return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);
  
    const handleDownload = (fileUrl, fileName) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', fileName);  // Set the file name for the download
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up
      };


    const deleteproject = async (id) => {
      try {
        await axios.delete(`http://localhost:8000/api/Project/${id}/`);
        setproject(project.filter(project => project.id !== id)); // Update local state
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 2000 milliseconds = 2 seconds
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    };




    // search project
              const [query, setQuery] = useState("");
              const [results, setResults] = useState([]);
              const [error, setError] = useState("");
          
              useEffect(() => {
                  const fetchData = async () => {
                      if (query.trim() !== "") {
                          try {
                              const response = await axios.get(
                                  `http://localhost:8000/api/Instructor_Search_Project/`,
                                  { params: { q: query } }
                              );
                              setResults(response.data.results);
                              setError("");
                          } catch (err) {
                              if (err.response && err.response.status === 404) {
                                  setError("No Such Project Found , Make Sure Project Name Are Correctly");
                              } else {
                                  setError("An error occurred. Please try again.");
                              }
                              setResults([]);
                          }
                      } else {
                          setResults([]);
                          setError("");
                      }
                  };
          
                  const debounceFetch = setTimeout(fetchData, 300); // Debounce the API call
          
                  return () => clearTimeout(debounceFetch);
              }, [query]);
          
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

    <div className="container mt-5">
      <div className="card" style={{padding:'10px'}}>
        <div className="card-header d-flex justify-content-between align-items-center" style={{background:'white'}}>
          <h5 className="mb-0">Search Projects</h5>
          <div className="input-group w-50">
            <input
              
              className="form-control"

              type="text"
                placeholder="Search by project name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            
            />
            
          </div>
        </div>




        <div className="table-responsive">
        {/* Content for all students goes here */}
          <div style={{ marginTop: "20px" }}> 
                {error && <p style={{ color: "red" }}> <i className="bi bi-exclamation-circle" style={{ color: 'red', marginRight: '5px' }}>
                  </i> {error}</p>}
                {results.length > 0 && (
                     <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Project Title</th>
                                <th>Reg Number</th>
                                <th>Course</th>
                                <th>Date Uploaded</th>
                                <th>Project File</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((project, index) => (
                                <tr key={index}>
                                    <td>{project.project_title}</td>
                                    <td>{project.st_reg_no}</td>
                                    <td>{project.course}</td>
                                    <td>{new Date(project.date_uploaded).toLocaleDateString()}</td>
                                    
                                    <td>
              
              <Link to={`/InstructorStudentView/${project.id}`}>
                 
<button class="btn btn-primary">
<i class="bi bi-eye"></i> 
</button></Link>
&ensp;
<button class="btn btn-warning">
<i class="bi bi-pencil"></i> 
</button>
&ensp;
<button class="btn btn-danger" onClick={() => deleteproject(project.id)}>
<i class="bi bi-trash"></i> 
</button>
</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>

        <div className="container mt-4">
      <Button variant="primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Upload New Project"}
      </Button> <br></br>
      {showForm && (
        <>
          <h2>Upload Student Project</h2>
          {message && <Alert variant={messageType}>{message}</Alert>}
          <Form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
            <Form.Group controlId="project_title">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                name="project_title"
                value={formData.project_title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="course">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="st_reg_no">
              <Form.Label>Student Registration Number</Form.Label>
              <Form.Control
                type="text"
                name="st_reg_no"
                value={formData.st_reg_no}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="date_uploaded">
              <Form.Label>Date Uploaded</Form.Label>
              <Form.Control
                type="date"
                name="date_uploaded"
                value={formData.date_uploaded}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="project_file">
              <Form.Label>Project File</Form.Label>
              <Form.Control
                type="file"
                name="project_file"
                onChange={handleFileChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Upload Project
            </Button>
          </Form>
        </>
      )}
    </div>
       
       
      </div>
    </div>

<br></br>






<h2>All Projects</h2>


                <div className="table-responsive">
                
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Tittle</th>
                                <th>Reg Number</th>
                                <th>Course</th>
                                <th>Date uploaded:</th>
                                <th>File</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        {project.map((project, index) => (
            <tr key={index}>
              <td>{project.project_title}</td>
              <td>{project.course}</td>
              <td>{project.st_reg_no}</td>
              <td>{new Date(project.date_uploaded).toLocaleDateString()}</td>
              <td>
              
             

              <button
  className="btn btn-success"
  onClick={() => handleDownload(project.project_file, project.project_file.split('/').pop())}
>
  <i className="bi bi-download"></i> Download
</button>
                                               
                                            
              </td>
              <td>
              
              {/* <Link to={`/InstructorStudentView/${project.id}`}> */}
                 
{/* <button class="btn btn-primary">
<i class="bi bi-eye"></i> 
</button></Link>
&ensp;
<button class="btn btn-warning">
<i class="bi bi-pencil"></i> 
</button>
&ensp; */}
<button class="btn btn-danger" onClick={() => deleteproject(project.id)}>
<i class="bi bi-trash"></i> 
</button>
</td>
            </tr>
          ))}
                               
                        
                        </tbody>
                    </table>
               
                </div>
            </div>
        </div>
                 </div>

);
};

export default InstructorDashboard;