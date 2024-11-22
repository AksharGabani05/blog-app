import React, { useState } from 'react';
import { Container, Form, Button, Card, Nav } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password } = formData;

    // Ensure that all fields are filled in
    if (!fullName || !email || !password) {
      toast.error('Please fill in all required fields!');
      return;
    }

    // Create the user object and store it in localStorage
    const user = { fullName, email, password };
    localStorage.setItem('user', JSON.stringify(user)); 

    // Show success message and redirect to the login page
    toast.success('Registration successful!');
    navigate('/login'); // Redirect to login page after registration
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h3 className="text-center mb-4">Sign Up</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFullName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
          <Nav className="justify-content-center mt-4">
            <Nav.Item>
              <Nav.Link as="span" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
                Already have an account? Login
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Body>
      </Card>
      {/* ToastContainer to show the notifications */}
      <ToastContainer />
    </Container>
  );
};

export default RegisterPage;
