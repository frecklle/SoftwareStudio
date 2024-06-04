"use client"
import React, { useState } from 'react';
import { UserController } from '@/contollers/UserController';
import CopyrightProsperNet from '../(Copright)/page';
import AppLogo from "@/components/appLogo";

function ResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [error, setError] = useState("")

    async function resetPassword() {
        setLoading(true);
        setError("");
        try {
            const result = await UserController.resetPassword(email);
            if (result.status === "success") {
                setEmailExists(true);
                setError("Email sent, please check your inbox")
            } else if (result.status != "fail" && result.status != "success") {
                setEmailExists(true);
                setError("Server error!!"+result.status)
            } else {
                setEmailExists(false);
                setError("Email doesnt exist")
                
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            // Handle error here
            // For example, set emailExists to false
            setEmailExists(false);
        }
        setLoading(false);
    }

    return (
        <section className="h-100">
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="text-center my-5">
                            <AppLogo />
                        </div>
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Forgot Password</h1>
                                <form method='POST' className="needs-validation" noValidate autoComplete="off">
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">E-Mail Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={email}
                                            required=""
                                            autoFocus=""
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <div className="invalid-feedback">
                                            Email is invalid
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <button disabled={loading} type="submit" className="btn btn-primary ms-auto" onClick={(e) => {
                                            e.preventDefault();
                                            resetPassword();
                                        }}>
                                            Send Link
                                        </button>
                                    </div>
                                    {error.length>0 ? (<div class="alert alert-danger mt-3" role="alert">
                                     {error}
                                    </div>
									):""}
                                </form>
                            </div>
                            <div className="card-footer py-3 border-0">
                                <div className="text-center">
                                    Remember your password? <a href="/login" className="text-dark">Login</a>
                                </div>
                            </div>
                        </div>
                        <CopyrightProsperNet />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ResetPasswordPage;
