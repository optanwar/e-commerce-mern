import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, forgotPassword } from "../../slices/authSlice"; 
import { useNavigate } from "react-router-dom"; // Import for redirection

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [image, setImage] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  const { user, loading, error , successMessage  } = useSelector((state) => state.user);

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  // Redirect to home if user is logged in
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home page after successful login
    }
  }, [user, navigate]);

  // Handle image change for profile upload
  const handleImageChange = (e) => {



    const file = e.target.files[0];
  if (file) {
    // Set a size limit (e.g., 5 MB)
    const maxSize = 5 * 1024 * 1024; // 5MB

    // Check if the file size exceeds the limit
    if (file.size > maxSize) {
      alert("File size exceeds 5MB.");
      return; // Stop the process if the file is too large
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

    // const file = e.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setImage(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  // Form validation functions
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const validateFullName = (fullName) => fullName.trim().length > 0;

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!email) {
      errors.email = "Email is required.";
      formIsValid = false;
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address.";
      formIsValid = false;
    }

    if (!password) {
      errors.password = "Password is required.";
      formIsValid = false;
    } else if (!validatePassword(password)) {
      errors.password = "Password must be at least 6 characters.";
      formIsValid = false;
    }

    if (!isLogin && !validateFullName(fullName)) {
      errors.fullName = "Full name is required.";
      formIsValid = false;
    }

    setFormErrors(errors);
    return formIsValid;
  };

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser({ email, password }));
    }
  };

  // Handle Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {

      dispatch(registerUser({ email, password, fullName, image }));
    }
  };

  // Handle Forgot Password
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(forgotPassword(email));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isForgotPassword ? "Forgot Password" : isLogin ? "Login" : "Register"}
        </h2>

        {isForgotPassword ? (
          <form className="space-y-4" onSubmit={handleForgotPasswordSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Loading..." : "Reset Password"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {user && <p className="text-green-500 text-center mt-2">{user}</p>}
            <button
              type="button"
              className="text-blue-600 text-sm hover:underline block text-center mt-3"
              onClick={() => setIsForgotPassword(false)}
            >
              Back to Login
            </button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Profile Image
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border p-3 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {image && (
                    <img
                      src={image}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                    />
                  )}
                </div>
              </div>
            )}

            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            {formErrors.fullName && (
              <p className="text-red-500 text-sm">{formErrors.fullName}</p>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Login" : "Register"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        )}

        {!isForgotPassword && (
          <p className="text-center text-sm mt-5 text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 ml-1 hover:underline font-medium"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
