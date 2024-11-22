import React, { useState } from 'react';

const BlogForm = ({ blog = {}, onSubmit }) => {
  const [title, setTitle] = useState(blog.title || '');
  const [content, setContent] = useState(blog.content || '');
  const [image, setImage] = useState(blog.image || '');
  const [imagePreview, setImagePreview] = useState(blog.image || '');

  // Handle file input change and preview the image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(fileUrl); // Show preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, image: imagePreview });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{blog.id ? 'Edit Blog' : 'Create Blog'}</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            placeholder="Enter blog content"
            required
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="image" className="form-label">Select Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        {/* Show image preview */}
        {imagePreview && (
          <div className="mb-3">
            <label className="form-label">Image Preview</label>
            <img
              src={imagePreview}
              alt="Blog Preview"
              className="img-fluid rounded"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100 mt-3">Save Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
