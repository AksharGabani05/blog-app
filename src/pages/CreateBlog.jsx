import React, { useState } from 'react';
import BlogForm from '../components/BlogForm';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const CreateBlog = ({ blogs, setBlogs }) => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    setBlogs([...blogs, { ...data, id: uuidv4() }]);
    navigate('/');
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <BlogForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateBlog;
