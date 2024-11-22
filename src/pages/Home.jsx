import React from 'react';
import BlogCard from '../components/BlogCard';

const Home = ({ blogs, setBlogs }) => {
  const deleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  return (
    <div>
      <h2>Blog List</h2>
      <div className="row">
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} deleteBlog={deleteBlog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
