"use client";
import React, { useState } from "react";
import { UserController } from "@/contollers/UserController";
import CopyrightProsperNet from "@/app/(Copright)/page";
import AppLogo from "@/components/appLogo";

function LoginPage() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState(false);

  async function login() {
    setLoading(true);
    var result = await UserController.login(user);
    console.log(result);
    setTimeout(() => {
      if (result.status == "success") {
        setLoginFail(false);
        // { status: "success", token: token }
        localStorage.setItem("token", result.token);
        localStorage.setItem("firstName", result.firstName);
        setLoginAttempt(true);
        setTimeout(() => {
          window.location.href = "/home";
        }, 200); // Adjust the delay as needed (in milliseconds)
      } else {
        setLoginFail(true);
        setError("Failed to login, check if you entered correct details");
      }
    }, 500);
  }

  return (
    <section class="h-100">
      <div class="container h-100">
        <div class="row justify-content-sm-center h-100">
          <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <AppLogo />
            <div class="card shadow-lg">
              <div class="card-body p-5 rounded-full ">
                <h1 class="fs-4 card-title fw-bold mb-4">Login</h1>
                <form
                  method="POST"
                  class="needs-validation"
                  novalidate=""
                  autocomplete="off"
                >
                  <div class="mb-3">
                    <label class="mb-2 text-muted" for="email">
                      E-Mail Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      class="form-control"
                      name="email"
                      value={user.email}
                      required=""
                      autofocus=""
                      onChange={(e) => {
                        e.preventDefault();
                        setUser((prevState) => ({
                          ...prevState,
                          email: e.target.value,
                        }));
                      }}
                    />
                    <div class="invalid-feedback">Email is invalid</div>
                  </div>

                  <div class="mb-3">
                    <div class="mb-2 w-100">
                      <label class="text-muted" for="password">
                        Password
                      </label>
                      <a href="/forgot-password" class="float-end">
                        Forgot Password?
                      </a>
                    </div>
                    <input
                      id="password"
                      type="password"
                      class="form-control"
                      name="password"
                      required=""
                      onChange={(e) => {
                        e.preventDefault();
                        setUser((prevState) => ({
                          ...prevState,
                          password: e.target.value,
                        }));
                      }}
                    />
                    <div class="invalid-feedback">Password is required</div>
                  </div>

                  <div class="d-flex align-items-center">
                    <div class="form-check">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        class="form-check-input"
                      />
                      <label for="remember" class="form-check-label">
                        Remember Me
                      </label>
                    </div>
                    <button
                      disabled={loading}
                      type=""
                      class="btn btn-primary ms-auto"
                      onClick={(e) => {
                        e.preventDefault();
                        login();
                      }}
                    >
                      {loading ? "🔁" : "Login"}
                    </button>
                  </div>

                  {loginFail &&!loginAttempt? (
                    <div class="alert alert-danger mt-3" role="alert">
                      Login failed
                    </div>
                  ) : (
                    ""
                  )}

                  {loginAttempt && !loginFail ? (
                    <div class="alert alert-success mt-3" role="alert">
                      Login successful
                    </div>
                  ) : null}
                  
                </form>
              </div>
              <div class="card-footer mt-3 border-0">
                <div class="text-center">
                  Don't have an account?{" "}
                  <a href="/register" class="text-dark">
                    Create One
                  </a>
                </div>
              </div>
            </div>
            <CopyrightProsperNet></CopyrightProsperNet>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
