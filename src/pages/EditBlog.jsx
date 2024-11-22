import React from 'react';
import BlogForm from '../components/BlogForm';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = ({ blogs, setBlogs }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find(blog => blog.id === id);

  const handleSubmit = (data) => {
    setBlogs(blogs.map(b => (b.id === id ? { ...data, id } : b)));
    navigate('/');
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <BlogForm blog={blog} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditBlog;
