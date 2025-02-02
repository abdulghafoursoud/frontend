import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col} from "react-bootstrap";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    student_name: "",
    academic_level: "",
    age: "",
    academic_year: "",
    phone_number: "",
    course_name: "",
    reg_no: "",
    gender: "",
    password: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if reg_no exists
      const response = await axios.get(`http://localhost:8000/api/check_st_reg_no/${formData.reg_no}/`);
      if (response.data.exists) {
        setMessage("Registration number already exists.");
        setTimeout(() => {
            window.location.reload();
          }, 2000); // 2000 milliseconds = 2 seconds
      } else {
        // If reg_no does not exist, submit the form
        await axios.post("http://localhost:8000/api/Student/", formData);
        setMessage("Student Registration successful!");
        setTimeout(() => {
            window.location.reload();
          }, 2000); // 2000 milliseconds = 2 seconds
        setFormData({
          student_name: "",
          academic_level: "",
          age: "",
          academic_year: "",
          phone_number: "",
          course_name: "",
          reg_no: "",
          gender: "",
          password: "",
          email: "",
        });
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    
    <div><br></br><br></br>
    {message && (
          <div
            className="alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3"
            role="alert"
            style={{ zIndex: 1050 }}
          >
            &nbsp; {message} &nbsp;
          </div>
        )}
    <Container className="mt-4" style={{border:'1px solid lightgray',padding:'20px',borderRadius:'5px'}}>
      <h2>Student Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Student Name</Form.Label>
              <Form.Control type="text" name="student_name" value={formData.student_name} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
          <Form.Group>
              <Form.Label>Academic Level</Form.Label>
              <Form.Control as="select" name="academic_level" value={formData.academic_level} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Diploma">Ordinary Diploma</option>
                <option value="Degree">Bachelor Degree</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Academic Year</Form.Label>
              <Form.Control type="text" name="academic_year" value={formData.academic_year} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Course Name</Form.Label>
              <Form.Control type="text" name="course_name" value={formData.course_name} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Registration Number</Form.Label>
              <Form.Control type="text" name="reg_no" value={formData.reg_no} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
      </Form>
      <p>Student Already registered? <Link to="/StudentLogin">Login Here</Link></p>
    </Container></div>
  );
};

export default StudentRegistration;
