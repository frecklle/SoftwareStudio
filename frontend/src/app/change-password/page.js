"use client"
import React,{useState} from 'react'
import { UserController } from '@/contollers/UserController';
import CopyrightProsperNet from '../(Copright)/page';


function ChangePasswordPage() {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [emailExists, setEmailExists] = useState(false);

	function validatePassword(password) {
		setError("");
		const passwordRegex =
		  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[-!?#$%^&*@+=])(?!.*\s).{8,}$/;
	
		if (!password) {
			setError("Password field cannot be empty.");
		  return false;
		}
	
		if (password.length < 8) {
			setError("Password must be at least 8 characters long.");
		  return false;
		}
	
		if (!passwordRegex.test(password)) {
			setError(
			"Password must contain at least one digit, one letter, and one special character from the set: !?#$%^&*@-+=."
		  );
		  return false;
		}
	
		if (password.includes(" ")) {
			setError("Password cannot contain spaces.");
		  return false;
		}
	
		return true;
	  }

	async function changePass(){ 
		setLoading(true);
		if(validatePassword(user.password) == false)return;
		setError("");
		try {
            var result = await UserController.changePassword(user.email,user.newPassword);
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
                            <img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="logo" width="100"/>
                        </div>
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4"></h1>
                                <form className="needs-validation" noValidate autoComplete="off">
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            required
                                            autoFocus
                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        />
                                        <div className="invalid-feedback">
                                            Email is invalid
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="newPassword">New Password</label>
                                        <input
                                            id="newPassword"
                                            type="password"
                                            className="form-control"
                                            name="newPassword"
                                            required
                                            onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
                                        />
                                        <div className="invalid-feedback">
                                            Password is required
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="mb-2 w-100">
                                            <label className="text-muted" htmlFor="repeatPassword">Repeat Password</label>
                                        </div>
                                        <input
                                            id="repeatPassword"
                                            type="password"
                                            className="form-control"
                                            name="repeatPassword"
                                            required
                                            onChange={(e) => setUser({ ...user, repeatPassword: e.target.value })}
                                        />
                                        <div className="invalid-feedback">
                                            Passwords must match
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center">
										<button disabled={loading} type="submit" className="btn btn-primary ms-auto" onClick={(e) => {
                                            e.preventDefault();
                                            changePass();
                                        }}>
                                            {loading ? "🔁" : "Update"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <CopyrightProsperNet />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ChangePasswordPage;