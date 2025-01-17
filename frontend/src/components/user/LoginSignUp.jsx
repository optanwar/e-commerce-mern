import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../redux/featuresSlice/userSlice";
import Loader from "../../layout/Loader";
import { useNavigate } from "react-router-dom";

const AuthForms = () => {
  const [formType, setFormType] = useState("login"); // "login", "forgotPassword", "register"
  const { loading, error, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((response) => {
        if (response.success === true && response.token) {
          navigate("/");
        }
        console.log("User data:", response);
      })
      .catch((err) => {
        alert(err || "Failed to log in. Please try again.");
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then((response) => {
        if (response.success === true) {
          alert("Registration successful! Please log in.");
          setFormType("login");
        }
      })
      .catch((err) => {
        alert(err || "Registration failed. Please try again.");
      });
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    alert("Password reset email sent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {formType === "login" && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Welcome Back
            </h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="text-right mb-6">
                <button
                  type="button"
                  className="text-sm text-blue-500 hover:underline"
                  onClick={() => setFormType("forgotPassword")}
                >
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-gray-600 text-center mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setFormType("register")}
              >
                Register here
              </button>
            </p>
          </>
        )}

        {formType === "register" && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Create an Account
            </h1>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="register-email"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="register-email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="register-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mb-4"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setFormType("login")}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Back to Login
              </button>
            </form>
          </>
        )}

        {formType === "forgotPassword" && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Reset Your Password
            </h1>
            <form onSubmit={handlePasswordReset}>
              <div className="mb-4">
                <label
                  htmlFor="reset-email"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="reset-email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mb-4"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setFormType("login")}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Back to Login
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForms;
