import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from "./components/Welcome";
import StudentRegistrationForm from "./components/StudentRegistrationForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentLogin from "./components/StudentLogin";
import InstructorLogin from "./components/InstructorLogin";
import InstructorDashboard from "./components/InstructorDashboard";
import InstructorProject from "./components/InstructorProject";
import StudentDashboard from "./components/StudentDashboard";
import StudentSetting from "./components/StudentSetting";
import StudentProject from "./components/StudentProject";
import InstructorSetting from "./components/InstructorSetting";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import "bootstrap-icons/font/bootstrap-icons.css";


const App = () => {
  return ( 
    <Router>
            <Routes>
            <Route path="/" element={<Welcome />} />
                <Route path="/StudentRegistrationForm" element={<StudentRegistrationForm />} />
                <Route path="/Studentlogin" element={<StudentLogin />} />
                <Route path="/InstructorLogin" element={<InstructorLogin />} />
                <Route path="/InstructorDashboard" element={<InstructorDashboard />} />
                <Route path="/InstructorProject" element={<InstructorProject />} />
                <Route path="/StudentDashboard" element={<StudentDashboard />} />
                <Route path="/StudentSetting" element={<StudentSetting />} />
                <Route path="/StudentProject" element={<StudentProject />} />
                <Route path="/InstructorSetting" element={<InstructorSetting />} />



                
                


                

            </Routes>
        </Router>


  );
};


export default App;
