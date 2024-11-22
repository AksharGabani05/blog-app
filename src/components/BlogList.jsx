import React from 'react';
import { Button } from 'react-bootstrap'; // Import the Button component
import { useNavigate } from 'react-router-dom'; // Import useNavigate to navigate to the create blog page
import BlogCard from './BlogCard'; // Make sure to import BlogCard component

const BlogList = ({ blogs, deleteBlog }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center mb-0">Blog Posts</h1>

        {/* Create Blog Button */}
        <Button
          variant="success"
          className="d-flex align-items-center"
          onClick={() => navigate('/create')} // Navigate to /create page when clicked
        >
          <i className="bi bi-plus-circle me-2"></i> Create Blog
        </Button>
      </div>

      <div className="row">
        {blogs.length === 0 ? (
          <div className="col-12">
            <p>No blogs available. Please add some!</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              deleteBlog={deleteBlog}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
