"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import AppLogo from "@/components/appLogo";
import Link from "next/link";
import { PostsController } from "@/contollers/postsController";
import { UserController } from "@/contollers/UserController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [openedCommentId, setOpenedCommentId] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [firstName, setFirstName] = useState("");

  /////////////
  async function fetchData() {
    let postyPobraneZBazyDanych = await PostsController.getList();

    setPosts(postyPobraneZBazyDanych);
  } /////////////
  // jest wywolany tylko raz w momencie wyswietlenia strony
  useEffect(() => {
    // Pobranie danych z serwera async i zapisanie ich w state

    fetchData();

    const storedFirstName = localStorage.getItem("firstName");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    } else {
      console.error("First name not found in localStorage");
    }
  }, []);
  

  const handleLikeToggle = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/post/${postId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      /////////////
      const data = await response.json();

      // Update posts state with updated likes count
      await fetchData();
      /////////////
    } catch (error) {
      console.error("Error toggling like:", error);
      // Handle error, show message to user, etc.
    }
  };

  // funkcja do dodawania komentarza
  const handleCommentSubmission = async (id) => {
    try {
      // Make a POST request to your backend API endpoint
      const response = await fetch("http://localhost:8000/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "663bd125f773f144a9992ff5",
          postId: id,
          content: commentContent,
        }),
      });
    } catch (error) {
      alert("Error submitting comment: " + error);
    }
  };

  // funkcja do otwierania komentarza
  const handleCommentOpen = (id) => {
    setOpenedCommentId(id);
  };

  return (
    <div className="container">
      <header className="py-3 header">
        <div className="container-fluid">
          <div className="row align-items-start justify-content-between">
            <div className="col-md-4 align-self-center">
              <a className="text-dark logo" href="#">
                Prosper.Net
              </a>
            </div>
            <div className="col-md-4 text-center">
              <h2 className="text-dark title">Work Earn Learn</h2>
            </div>
            <div className="col-md-4 d-flex justify-content-end align-items-center">
              <div className="footer-text mr-3">
                <p className="text-muted mb-0">Welcome, {firstName} </p>
                <Link href="/profile">
                  <AppLogo />
                </Link>
              </div>
              <div>
                <a
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    UserController.logout();
                  }}
                  href="/login"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main role="main" className="container main">
        <div className="row">
          <div className="col-md-8">
            <div className="main-content">
              <div className="mb-5">
                <h2 className="font-weight-bold text-center">Posts</h2>
                {posts.map((o) => {
                  return (
                    <div key={o._id} className="post card my-3 p-5">
                      <div className="post-header">
                        <h2>{o.title}</h2>
                        <p>{o.authorFullName}</p>
                      </div>
                      <div className="post-content">
                        <p>{o.content}</p>
                      </div>
                      {/* ............................*/}
                      <div className="post-actions nav  justify-content-start align-items-center ">
                        <div className="nav-item ">
                          <button
                            className={`btn btn-sm btn-outline-primary  ${
                              o.isLiked ? "active" : ""
                            }`}
                            onClick={() => handleLikeToggle(o._id, o.isLiked)}
                          >
                            <FontAwesomeIcon icon={faThumbsUp} Like />
                          </button>
                        </div>
                        <div className="nav-item mx-2">
                          <span>
                            <b>{o.likes}</b>
                          </span>
                        </div>
                        <div className="nav-item">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleCommentOpen(o._id)}
                          >
                            Comment
                          </button>
                        </div>
                        {/* ............................*/}

                        {openedCommentId === o._id && (
                          <div>
                            <input
                              id={o._id}
                              value={commentContent}
                              className="comment-input rounded-lg"
                              onChange={(e) =>
                                setCommentContent(e.target.value)
                              }
                            ></input>
                            <button
                              className="btn btn-sm btn-secondary rounded-lg"
                              onClick={() => handleCommentSubmission(o._id)}
                            >
                              ✅
                            </button>
                          </div>
                        )}

                        {o.comments &&
                          o.comments.map((c) => {
                            return (
                              <div className="comment">
                                <p>{c.content}</p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
                {/* Add more posts with advice */}
                <div className="mt-5"></div> {/* Space between posts */}
              </div>

              {/* Repeat the post structure for more posts */}
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 mb-3 bg-light rounded">
              <h4 className="font-weight-bold">About</h4>
              <p className="mb-0">
                Prosper.Net is a vibrant online community where members can
                share their insights and experiences on wealth accumulation and
                financial well-being. It is a platform designed to inspire and
                empower individuals to achieve their financial goals.
              </p>
              <a href="/bot" class="float-end">
                Spending analysis
              </a>
            </div>

            <div className="p-3 mb-3 bg-light rounded">
              <h4 className="font-weight-bold">Create Post</h4>
              <button
                className="btn btn-primary"
                onClick={() => (window.location.href = "/post")}
              >
                Create a Post
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-md-7 text-right">
              <p>2024 Prosper.Net</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

<div className="p-3">
  <h4 className="font-italic">Elsewhere</h4>
  <ol className="list-unstyled">
    <li>
      <a href="#">GitHub</a>
    </li>
    <li>
      <a href="#">Twitter</a>
    </li>
    <li>
      <a href="#">Facebook</a>
    </li>
  </ol>
</div>;

export default HomePage;
