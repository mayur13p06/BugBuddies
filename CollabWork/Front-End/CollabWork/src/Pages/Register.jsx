import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { auth, db } from '../Components/firebase'; // Firebase setup
import { ToastContainer, toast } from 'react-toastify'; // Toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import '../Styling/Register.css'; // CSS styling

const Register = () => {
  const { register, handleSubmit } = useForm(); // React Hook Form
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const allInterests = [
    "Hackathons", "Events", "Flatmates", "Networking", 
    "Workshops", "Internships"
  ];

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    const { employeeName, college, email, password, confirmPassword, interest } = data;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      // Register user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Ensure Firestore document structure is correct
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        employeeName: employeeName.trim(),
        college: college.trim(),
        email: email.trim(),
        interest: interest, // Save single interest
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });

      // Show success notification
      toast.success('Account created successfully! Redirecting to login...');

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/SignIn');
      }, 3000);

    } catch (error) {
      let errorMessage = 'An error occurred. Please try again later.';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address. Please enter a valid email.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters long.';
      }

      toast.error(errorMessage);
      console.error('Firestore Error:', error.message);
    }
  };

  return (
    <div className="register-container">
      <ToastContainer /> {/* Toastify container */}
      <div className="register-logo">
        <h1>StudSync</h1>
      </div>
      <div className="register-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Employee Name */}
          <div className="register-field">
            <label>Student Name</label>
            <input type="text" placeholder="Enter your name" {...register('employeeName', { required: true })} required />
          </div>

          {/* College Dropdown */}
          <div className="register-field">
            <label>College Name</label>
            <select {...register('college', { required: true })} required>
              <option value="">Select your college</option>
              <option value="VIT">VIT</option>
              <option value="VIIT">VIIT</option>
              <option value="VU">VU</option>
              <option value="MIT">MIT</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Interests Dropdown (Simple Select) */}
          <div className="register-field">
            <label>Interests</label>
            <select
              {...register('interest', { required: true })} // Single select field for interests
              required
            >
              <option value="">Select an interest</option>
              {allInterests.map((interest, index) => (
                <option key={index} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div className="register-field">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" {...register('email', { required: true })} required />
          </div>

          {/* Password */}
          <div className="register-field">
            <label>Password</label>
            <div className="password-input-container">
              <input type={passwordVisible ? 'text' : 'password'} placeholder="Enter your password" {...register('password', { required: true })} required />
              <button type="button" className="password-toggle-btn" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="register-field">
            <label>Confirm Password</label>
            <div className="password-input-container">
              <input type={confirmPasswordVisible ? 'text' : 'password'} placeholder="Confirm your password" {...register('confirmPassword', { required: true })} required />
              <button type="button" className="password-toggle-btn" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="register-submit-btn">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Register;