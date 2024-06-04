"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import AppLogo from '@/components/appLogo';
import Link from 'next/link';

function HomePage() {

const [posts, setPosts] = useState([])
const [openedCommentId, setOpenedCommentId] = useState('');
const [commentContent, setCommentContent] = useState('');

    const user = {
        name: "John Doe"
    };

    // jest wywolany tylko raz w momencie wyswietlenia strony
    useEffect(() => {

        // Pobranie danych z serwera async i zapisanie ich w state
        async function fetchData() {
        
            let postyPobraneZBazyDanych = await fetch("http://localhost:8000/posts",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then(response => response.json());

            setPosts(postyPobraneZBazyDanych);

        }
  
        fetchData();
    }, []);
    


    // funkcja do dodawania komentarza
    const handleCommentSubmission = async (id) => {

        try {
         // Make a POST request to your backend API endpoint
        const response = await fetch("http://localhost:8000/comment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: "663bd125f773f144a9992ff5",
                    postId: id,
                    content: commentContent
                })
            });
        } catch (error) {
            alert("Error submitting comment: " + error);
        }
    };

    // funkcja do otwierania komentarza
    const handleCommentOpen = (id) => {
        setOpenedCommentId(id);
    };

    const data = [
        { name: 'Jan', spending: 400 },
        { name: 'Feb', spending: 300 },
        { name: 'Mar', spending: 500 },
        { name: 'Apr', spending: 700 },
        { name: 'May', spending: 600 },
    ];

    return (
        <div className="container">
            <header className="py-3 header">
                <div className="container-fluid">
                    <div className="row align-items-start justify-content-between">
                        <div className="col-md-4 align-self-center">
                            <a className="text-dark logo" href="#">Prosper.Net</a>
                        </div>
                        <div className="col-md-4 text-center">
                            <h2 className="text-dark title">Work Earn Learn</h2>
                        </div>
                        <div className="col-md-4 d-flex justify-content-end align-items-center">
                            <div className="footer-text mr-3">
                                <p className="text-muted mb-0">Welcome, </p>
                                <Link href="/profile">
                                    <AppLogo/>
                                </Link>
                            </div>
                            <div>
                                <a className="btn btn-sm btn-outline-secondary" href="/login">Sign out</a>
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
                                <h2 className="font-weight-bold">Posts</h2>
                            

                            {posts.map(o => {
                                return (<div className="post">
                                <div className="post-header">
                                    <h2>{o.title}</h2>
                                    <p>{o.dateCreated}</p>
                                </div>
                                <div className="post-content">
                                    <p>{o.content}</p>
                                </div>
                                <div className="post-actions">
                                    <button className="btn btn-sm btn-outline-primary">&#9829;</button>
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleCommentOpen(o._id)}>Comment</button>
                                    

                                    {openedCommentId === o._id && <div>
                                        <input id={o._id} value={commentContent} className='comment-input rounded-lg' onChange={e => setCommentContent(e.target.value)}></input>
                                    <button className="btn btn-sm btn-secondary rounded-lg" onClick={() => handleCommentSubmission(o._id)}>✅</button>
                                    </div>}
                                    

                                    {o.comments  && o.comments.map(c => {
                                        return (<div className="comment">
                                            
                                            <p>{c.content}</p>
                                        </div>);
                                    })}
                                    

                                </div>
                            </div>);
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
                            <p className="mb-0">Prosper.Net is a vibrant online community where members can share their insights and experiences on wealth accumulation and financial well-being. It is a platform designed to inspire and empower individuals to achieve their financial goals.</p>
                            <a href="/bot" class="float-end">
                                Spending analysis 
                            </a> 
                        </div>

                        <div className="p-3 mb-3 bg-light rounded">
                            <h4 className="font-weight-bold">Create Post</h4>
                            <button className="btn btn-primary" onClick={() => window.location.href='/post'}>
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
    )
}


                        <div className="p-3">
                            <h4 className="font-italic">Elsewhere</h4>
                            <ol className="list-unstyled">
                                <li><a href="#">GitHub</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">Facebook</a></li>
                            </ol>
                        </div>
                


export default HomePage;