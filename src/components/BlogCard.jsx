import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { FaThumbsUp, FaShareAlt } from "react-icons/fa"; // Importing icons from react-icons

const BlogCard = ({ blog, deleteBlog }) => {
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState(blog.likes || 0); // Store likes count
  const [shared, setShared] = useState(false); // Track if shared

  // Format the creation date
  const formattedDate = moment(blog.createdAt).fromNow();

  // Handle Delete action with Toast
  const handleDelete = (id) => {
    deleteBlog(id);
    toast.success("Blog deleted successfully!");
  };

  // Handle Edit action with Toast
  const handleEdit = () => {
    toast.info("Redirecting to edit page...");
  };

  // Toggle the modal visibility
  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  // Like the blog
  const handleLike = () => {
    setLikes(likes + 1);
    toast.success("You liked this blog!");
  };

  // Share the blog
  const handleShare = () => {
    setShared(true);
    // Example share link (can be extended to actual social media sharing integration)
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
    window.open(shareUrl, "_blank"); // Open Facebook share window
    toast.info("Blog shared!");
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card shadow-sm border-0">
        <img
          src={blog.image}
          alt={blog.title}
          className="card-img-top"
          style={{
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
          onClick={handleModalShow} // Open modal when the image is clicked
        />
        <div className="card-body">
          <h5 className="card-title text-truncate">{blog.title}</h5>
          <p className="card-text text-muted" style={{ fontSize: "0.95rem" }}>
            {blog.content.slice(0, 100)}...
          </p>
          <p className="text-muted mb-3" style={{ fontSize: "0.8rem" }}>
            Uploaded {formattedDate}
          </p>
          <div className="d-flex justify-content-between">
            <Link
              to={`/edit/${blog.id}`}
              className="btn btn-outline-primary btn-sm px-3"
              onClick={handleEdit}
            >
              <i className="bi bi-pencil"></i> Edit
            </Link>
            <button
              onClick={() => handleDelete(blog.id)}
              className="btn btn-outline-danger btn-sm px-3"
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal for displaying full blog details */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{blog.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={blog.image}
            alt={blog.title}
            className="img-fluid mb-3"
            style={{
              width: "100%", // Set the width to 100% of the container
              height: "auto", // Maintain the aspect ratio
              objectFit: "cover", // Ensure image aspect ratio remains consistent
            }}
          />
          <p>{blog.content}</p>
          <p className="text-muted">Uploaded {formattedDate}</p>

          {/* Like and Share Actions */}
          <div className="d-flex justify-content-between mt-3">
            <button
              onClick={handleLike}
              className="btn btn-outline-primary btn-sm"
            >
              <FaThumbsUp /> Like {likes}
            </button>
            <button
              onClick={handleShare}
              className="btn btn-outline-info btn-sm"
            >
              <FaShareAlt /> Share
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogCard;
