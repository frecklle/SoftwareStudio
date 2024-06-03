"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import AppLogo from '@/components/appLogo';

function HomePage() {

    const user = {
        name: "John Doe"
    };
    
    const handlePostSubmission = async () => {
        try {
         // Make a POST request to your backend API endpoint
        const response = await fetch('/create-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: 'Your post content here' // Replace 'Your post content here' with the actual content of the post
                })
            });

            // Check if the request was successful
            if (response.ok) {
                // Refresh the page or fetch the updated posts
                // For simplicity, let's reload the page to fetch the latest posts
                window.location.reload();
            } else {
                // Handle the case where the request was not successful
                console.error('Failed to submit post');
            }
        } catch (error) {
            console.error('Error submitting post:', error);
    }
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
                                <AppLogo/>
                            </div>
                            <div>
                                <a className="btn btn-sm btn-outline-secondary" href="#">Sign out</a>
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
                                <div className="post">
                            <div className="post-header">
                                <h2>Earned $100 today!</h2>
                                <p>Posted by John Doe on May 10, 2024</p>
                                <p>User: John Doe, Age: 32, Working Status: Full-time, Hobby: Photography</p>
                            </div>
                            <div className="post-content">
                                <p>Today I earned $100 extra by doing freelance photography work. Remember, turning your hobbies into side hustles can boost your income!</p>
                            </div>
                            <div className="post-actions">
                                <button className="btn btn-sm btn-outline-primary">&#9829;</button>
                                <button className="btn btn-sm btn-outline-secondary">Comment</button>
                            </div>
                        </div>

                        <div className="mt-5"></div> {/* Space between posts */}

                        <div className="post">
                            <div className="post-header">
                                <h2>Saved money by cooking at home!</h2>
                                <p>Posted by Jane Smith on May 10, 2024</p>
                                <p>User: Jane Smith, Age: 28, Working Status: Part-time, Hobby: Yoga</p>
                            </div>
                            <div className="post-content">
                                <p>Instead of eating out, I decided to cook at home today. Not only did I save money, but I also enjoyed a healthy meal! Remember, cooking at home can help you save money and eat healthier.</p>
                            </div>
                            <div className="post-actions">
                                <button className="btn btn-sm btn-outline-primary">&#9829;</button>
                                <button className="btn btn-sm btn-outline-secondary">Comment</button>
                            </div>
                        </div>

                        {/* Add more posts with advice */}

                        <div className="mt-5"></div> {/* Space between posts */}

                        <div className="post">
                            <div className="post-header">
                                <h2>Found a great deal on clothes!</h2>
                                <p>Posted by Emily Johnson on May 9, 2024</p>
                                <p>User: Emily Johnson, Age: 35, Working Status: Stay-at-home parent, Hobby: Gardening</p>
                            </div>
                            <div className="post-content">
                                <p>Today, I found an amazing deal on clothes at the thrift store. Remember, thrifting can help you find great items at affordable prices while also reducing waste!</p>
                            </div>
                            <div className="post-actions">
                                <button className="btn btn-sm btn-outline-primary">&#9829;</button>
                                <button className="btn btn-sm btn-outline-secondary">Comment</button>
                            </div>
                        </div>

                        <div className="mt-5"></div> {/* Space between posts */}

                        <div className="post">
                            <div className="post-header">
                                <h2>Got a promotion at work!</h2>
                                <p>Posted by Michael Williams on May 8, 2024</p>
                                <p>User: Michael Williams, Age: 40, Working Status: Full-time, Hobby: Playing guitar</p>
                            </div>
                            <div className="post-content">
                                <p>I am thrilled to announce that I got promoted to manager at my company. Remember, hard work and dedication pay off. Keep pushing towards your goals!</p>
                            </div>
                            <div className="post-actions">
                                <button className="btn btn-sm btn-outline-primary">&#9829;</button>
                                <button className="btn btn-sm btn-outline-secondary">Comment</button>
                            </div>
                        </div>

                        <div className="mt-5"></div> {/* Space between posts */}

                        <div className="post">
                            <div className="post-header">
                                <h2>Invested in stocks!</h2>
                                <p>Posted by Sarah Lee on May 7, 2024</p>
                                <p>User: Sarah Lee, Age: 29, Working Status: Freelancer, Hobby: Reading</p>
                            </div>
                            <div className="post-content">
                                <p>Today, I decided to invest some of my savings in stocks. Remember, investing is key to building long-term wealth. Start investing early and stay consistent!</p>
                            </div>
                            <div className="post-actions">
                                <button className="btn btn-sm btn-outline-primary">&#9829;</button>
                                <button className="btn btn-sm btn-outline-secondary">Comment</button>
                            </div>
                        </div>

                    

                        </div>

                        {/* Repeat the post structure for more posts */}
                    </div>

                    </div>
                    
            

                    <div className="col-md-4">
                        <div className="p-3 mb-3 bg-light rounded">
                            <h4 className="font-weight-bold">About</h4>
                            <p className="mb-0">Prosper.Net is a vibrant online community where members can share their insights and experiences on wealth accumulation and financial well-being. It is a platform designed to inspire and empower individuals to achieve their financial goals.</p>
                            <a href="/spending" class="float-end">
                                Spending analysis 
                            </a> 
                        </div>

                        <div className="p-3 mb-3 bg-light rounded">
                            <h4 className="font-weight-bold">Create Post</h4>
                            <button className="btn btn-primary" onClick={() => window.location.href='/post'}>
                                Create a Post 
                                
                            </button>
                        </div>

                        
                        <div className="p-3 mb-3 bg-light rounded">
                            <h4 className="font-weight-bold">Links</h4>

                            <ol className="list-unstyled mb-0">
                                <li><a href="#">March 2014</a></li>
                                <li><a href="#">February 2014</a></li>
                                <li><a href="#">January 2014</a></li>
                                <li><a href="#">December 2013</a></li>

                                {/* Add more archive links */}
                            </ol>
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