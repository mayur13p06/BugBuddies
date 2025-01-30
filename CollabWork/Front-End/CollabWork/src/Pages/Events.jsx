import { useState } from "react";
import Footer from "../Components/Footer";
import '../Styling/Events.css';
function Opportunities() {
  // State to manage the user's name and interests
  const [name, setName] = useState("");
  const [interests, setInterests] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Show confirmation message after submission
  };

  return (
  <div>
      <div className="opportunities">
      <h1>Explore Opportunities</h1>
      <p>Discover roles that fit your expertise and interests.</p>

      <div className="form-container">
        <h2>Share your details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="interests">Your Interests:</label>
            <textarea
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Enter your interests or skills"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>

        {submitted && (
          <div className="confirmation-message">
            <p>Thank you, {name}! We have received your details. We will get in touch soon.</p>
          </div>
        )}
      </div>

      <div className="events">
        <h2>Upcoming Events</h2>
        <ul>
          <li>
            <strong>Tech Conference 2025</strong>
            <p>Join us for an exciting tech conference where experts share the latest in technology.</p>
            <button onClick={() => alert("You have registered for Tech Conference 2025!")}>
              Register Now
            </button>
          </li>
          <li>
            <strong>Startup Networking Event</strong>
            <p>A great opportunity to network with potential startup founders and investors.</p>
            <button onClick={() => alert("You have registered for Startup Networking Event!")}>
              Register Now
            </button>
          </li>
          <li>
            <strong>Job Fair 2025</strong>
            <p>Meet employers and find the right job for your skills and experience.</p>
            <button onClick={() => alert("You have registered for Job Fair 2025!")}>
              Register Now
            </button>
          </li>
        </ul>
      </div>

     
    </div>
    <Footer/>
  </div>
  );
}

export default Opportunities;