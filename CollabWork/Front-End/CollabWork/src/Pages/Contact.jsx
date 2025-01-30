import React from 'react';
import '../Styling/Contact.css';
import Footer from '../Components/Footer';

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Talk with our sales team</h1>
          <p>Fill out your information and CollabWork representative will reach out to you.</p>
          <div className="contact-form-container">
            <form className="contact-form">
              <label>
                First Name: <span className="required">*</span>
                <input type="text" placeholder="e.g., John" required />
              </label>
              <label>
                Last Name <span className="required">*</span>
                <input type="text" placeholder="Smith" required />
              </label>
              <label>
                Company Email <span className="required">*</span>
                <input type="email" placeholder="name@company.com" required />
              </label>
              <label>
                Phone Number <span className="required">*</span>
                <input type="tel" placeholder="+1 555 655 5656" required />
              </label>
              <label>
                Company Size
                <select>
                  <option value="">Select...</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201+">201+</option>
                </select>
              </label>
              <label>
                Country <span className="required">*</span>
                <select required>
                  <option value="">Select...</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="IN">India</option>
                  <option value="AU">Australia</option>
                </select>
              </label>
              <label>
                What would you like to discuss?
                <textarea placeholder="Tell us about your team and provide details about a project or process you would like to track in"></textarea>
              </label>
              <label className="agreement">
                <input type="checkbox" required />
                By checking the box and clicking "Submit", you are agreeing to CollabWork's{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Statement
                </a>.
              </label>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
          <Footer />
        </div>
        
      </div>
      
    </div>
  
  );
}

export default Contact;
