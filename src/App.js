import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import Header from './pages/Header';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage'; // Import the Login Page
import RegisterPage from './pages/RegisterPage'; // Import the Register Page

const App = () => {
  // State to manage blogs
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  // Load blogs dynamically (simulating API or localStorage)
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);

  // Load login status from localStorage
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Save blogs to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  // Function to delete a blog
  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  // Function to handle user login
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Function to handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  // Protected Route Component (Redirect to login if not logged in)
  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Container className="mt-4">
        {/* Conditionally render Header if logged in */}
        {isLoggedIn && <Header onLogout={handleLogout} />}
        <h1 className="text-center mb-4">My Blog</h1>

        <Routes>
          {/* Unprotected Routes */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute element={<BlogList blogs={blogs} deleteBlog={deleteBlog} />} />
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute element={<CreateBlog blogs={blogs} setBlogs={setBlogs} />} />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute element={<EditBlog blogs={blogs} setBlogs={setBlogs} />} />
            }
          />
        </Routes>
      </Container>

      {/* ToastContainer to show the notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop />
    </Router>
  );
};

export default App;
