// page.js
"use client";
import React, { useState } from "react";
import "./style.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [draft, setDraft] = useState(false);
  const [archived, setArchived] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = {
      image: image,
      title: title,
      content: text,
      draft: draft,
      archived: archived,
    };

    alert(JSON.stringify(formData));
    try {
      const response = await fetch("http://localhost:8000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Post created successfully!");
        setTimeout(() => {
          window.location.href = "/home";
        }, 2000);
      } else {
        setMessage("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="post-creation-form">
        <h2 className="text-center mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Post Title</label>
            <input
              className="form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          {/* <div className="mb-3">
                        <label className="form-label">Select an Image</label>
                        <input className="form-control" type="file" onChange={handleImageChange} required />
                    </div> */}
          <div className="mb-3">
            <label className="form-label">
              Post Text (optional, max 500 words)
            </label>
            <textarea
              className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength="3000"
            />
            <div className="form-text">{text.split(" ").length}/500 words</div>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={draft}
              onChange={(e) => setDraft(e.target.checked)}
            />
            <label className="form-check-label">Save to Drafts</label>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={archived}
              onChange={(e) => setArchived(e.target.checked)}
            />
            <label className="form-check-label">Archive Post</label>
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </div>
        </form>
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
    </div>
  );
}

export default CreatePost;
