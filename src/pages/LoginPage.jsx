import React, { useState } from 'react';
import { Container, Form, Button, Card, Nav } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
  
    if (!email || !password) {
      toast.error('Please fill in all required fields!');
      return;
    }
  
    const registeredUser = JSON.parse(localStorage.getItem('user'));
    if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
      toast.success('Login successful!', {
        autoClose: 3000, // Show the toast for 3 seconds
      });
      onLogin(); // Trigger login function passed as prop
      navigate('/'); // Redirect to the home page
    } else {
      toast.error('Invalid email or password!');
    }
  };
  

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h3 className="text-center mb-4">Login</h3>
          <Form onSubmit={handleSubmit}>
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
              Login
            </Button>
          </Form>
          <Nav className="justify-content-center mt-4">
            <Nav.Item>
              <Nav.Link as="span" onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>
                Don't have an account? Sign Up
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
