"use client"
import { UserController } from '@/contollers/UserController';
import React,{useState} from 'react'
import CopyrightProsperNet from '../(Copright)/page';

function RegisterPage() {
	const [user, setUser] = useState({})
	const [error, setError] = useState("")


	function validateNameAndSurname(fullName) {
		setError("");
		if (fullName == null || fullName == undefined || fullName.length < 1) {
			setError("Please enter name.");
		  return false;
		}

		const nameParts = fullName.split(" ");
		if (nameParts.length !== 2) {
			setError("Please enter both your first and last name.");
		  return false;
		}
	
		const [firstName, lastName] = nameParts;
	
		const nameRegex = /^[a-zA-Z]+([- ]?[a-zA-Z]+)*$/;
	
		if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
			setError(
			"Invalid name or surname. Please ensure it contains only letters, spaces, or hyphens."
		  );
		  return false;
		}
	
		if (
		  firstName.length < 2 ||
		  firstName.length > 50 ||
		  lastName.length < 2 ||
		  lastName.length > 50
		) {
			setError("Name or surname must be between 2 and 50 characters.");
		  return false;
		}
		return true;
	}
	
	  function validateEmail(email) {
		setError("");
		const emailRegex =
		  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	
		if (
		  !email ||
		  email.length < 5 ||
		  email.length > 320 ||
		  !emailRegex.test(email)
		) {
			setError("Please enter a valid email address.");
		  return false;
		}
		return true;
	  }

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


	async function register() {

		if(validateEmail(user.email) == false)return;
		if(validatePassword(user.password) == false)return;
		if(validateNameAndSurname(user.name) == false)return;

		var result = await UserController.registerNewUser(user);

		if (result.error.length > 0) {
			setError("Email is already taken. Please use a different email.");
		} else {
			alert("Registration successful!");
		}
	
	}

  return (
    <section class="h-100">
		<div class="container h-100">
			<div class="row justify-content-sm-center h-100">
				<div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
					<div class="text-center my-5">
						<img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="logo" width="100"/>
					</div>
					<div class="card shadow-lg">
						<div class="card-body p-5">
							<h1 class="fs-4 card-title fw-bold mb-4">Register</h1>
							<form method="POST" class="needs-validation" novalidate="" autocomplete="off">
								<div class="mb-3">
									<label class="mb-2 text-muted" for="name">Name</label>
									<input id="name" type="text" class="form-control" name="name" value={user.name} required="true" autofocus="" onChange={(e)=> {
										e.preventDefault();
										setUser(prevState => ({
											...prevState,
											 name: e.target.value
										   }));
									}}/>
									<div class="invalid-feedback">
										Name is required	
									</div>
								</div>

								<div class="mb-3">
									<label class="mb-2 text-muted" for="email">E-Mail Address</label>
									<input id="email" type="email" class="form-control" name="email" value={user.email} required="true" onChange={(e)=> {
										e.preventDefault();
										setUser(prevState => ({
											...prevState,
											 email: e.target.value
										   }));
									}}/>
									<div class="invalid-feedback">
										Email is invalid
									</div>
								</div>

								<div class="mb-3">
									<label class="mb-2 text-muted" for="password">Password</label>
									<input id="password" type="password" class="form-control" name="password" value={user.password} onChange={(e)=> {
										e.preventDefault();
										setUser(prevState => ({
											...prevState,
											 password: e.target.value
										   }));
									}}/>
								    <div class="invalid-feedback">
								    	Password is required
							    	</div>
								</div>

								<p class="form-text text-muted mb-3">
									By registering you agree with our terms and condition.
								</p>

								<div class="align-items-center d-flex">
									<button type="" class="btn btn-primary ms-auto" onClick={(e) => {e.preventDefault(); register();}}>
										Register	
									</button>
								</div>

								{error.length>0 ? (<div class="alert alert-danger mt-3" role="alert">
                                     {error}
                                    </div>
									):""}
							</form>
						</div>
						<div class="card-footer py-3 border-0">
							<div class="text-center">
								Already have an account? <a href="/login" class="text-dark">Login</a>
							</div>
						</div>
					</div>
					<CopyrightProsperNet/>
				</div>
			</div>
		</div>
	</section>
  )
}

export default RegisterPage