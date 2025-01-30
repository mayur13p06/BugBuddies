import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import { auth } from '../Components/firebase'; // Firebase Auth instance
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Styling/Register.css'; // Reuse Register.css for styling
import { UserContext } from '../Components/UserContext'; // Context for global state
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Components/firebase'; // Firebase Firestore instance
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setUser } = useContext(UserContext); // Access global user state
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  // Handle Google Sign-In
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Update global user state
      setUser({
        email: user.email,
        name: user.displayName || 'User',
        photoURL: user.photoURL || '',
        uid: user.uid,
      });

      toast.success('Signed in successfully with Google!'); // Success toast
      setTimeout(() => {
        navigate('/'); // Redirect to home after a brief delay
      }, 1000);
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
      toast.error('Failed to sign in with Google. Please try again.'); // Error toast
    }
  };

  // Handle Email/Password Sign-In
  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Update UserContext with Firestore data
        setUser({
          email: userData.email,
          name: userData.employeeName || 'User',
          photoURL: user.photoURL || '',
          company: userData.company || null,
          uid: user.uid,
        });

        toast.success('Sign-in successful!'); // Success toast
      } else {
        console.error('No user data found in Firestore.');
        toast.error('User data not found. Please contact support.'); // Error toast
      }

      // Redirect to home after success
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Sign-In Error:', error.message);
      toast.error('Invalid email or password. Please try again.'); // Error toast
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-logo">
        <h1>StudSync</h1> 
      </div>
      <div className="signin-card">
        <h2>Welcome Back</h2>
        <p className="signin-subtext">Please sign in to continue</p>

        {/* Google Sign-In Button */}
        <button className="signin-google-btn" onClick={signInWithGoogle}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
            alt="Google Logo"
            className="google-icon"
          />
          Continue with Google
        </button>

        <div className="signin-divider">
          <span>or</span>
        </div>

        {/* Email/Password Sign-In Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="signin-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: true })}
              required
            />
          </div>

          <div className="signin-field">
            <label>Password</label>
            <div className="password-input-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password', { required: true })}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="signin-submit-btn">
            Sign In
          </button>
        </form>

        {/* "Don't have an account?" option */}
        <p className="register-link">
          Don’t have an account?{' '}
          <Link to="/register" className="register-link-text">
            Register here
          </Link>
        </p>
      </div>

      {/* ToastContainer for notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default SignIn;
