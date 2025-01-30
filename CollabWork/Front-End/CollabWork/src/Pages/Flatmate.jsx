import { useState } from "react";
import Footer from "../Components/Footer";
import "../Styling/Flatmate.css";

function FlatmateFinder() {
  // States for user input
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState({
    smoking: false,
    pets: false,
    cleanliness: "any",
  });
  const [submitted, setSubmitted] = useState(false);
  const [matches, setMatches] = useState([]);

  // Predefined flatmate profiles
  const flatmateProfiles = [
    {
      name: "Alice",
      location: "New York",
      budget: 500,
      preferences: { smoking: false, pets: true, cleanliness: "high" },
    },
    {
      name: "Bob",
      location: "San Francisco",
      budget: 800,
      preferences: { smoking: true, pets: false, cleanliness: "medium" },
    },
    {
      name: "Charlie",
      location: "New York",
      budget: 600,
      preferences: { smoking: false, pets: false, cleanliness: "high" },
    },
    // Add more profiles here
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    findMatches();
  };

  // Find matches based on user input
  const findMatches = () => {
    const filteredMatches = flatmateProfiles.filter((profile) => {
      return (
        profile.location.toLowerCase() === location.toLowerCase() &&
        profile.budget <= budget &&
        profile.preferences.smoking === preferences.smoking &&
        profile.preferences.pets === preferences.pets &&
        (preferences.cleanliness === "any" || profile.preferences.cleanliness === preferences.cleanliness)
      );
    });
    setMatches(filteredMatches);
  };

  return (
   <div>
     <div className="flatmate-finder">
      <h1>Find Your Ideal Flatmate</h1>
      <p>Enter your preferences to find a flatmate that matches your needs.</p>

      <div className="form-container">
        <h2>Enter Your Details</h2>
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
            <label htmlFor="location">Preferred Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter preferred location"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="budget">Budget (per month):</label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter your budget"
              required
            />
          </div>
          <div className="form-group">
            <label>Smoking Preference:</label>
            <select
              value={preferences.smoking}
              onChange={(e) => setPreferences({ ...preferences, smoking: e.target.value === "yes" })}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Pets Preference:</label>
            <select
              value={preferences.pets}
              onChange={(e) => setPreferences({ ...preferences, pets: e.target.value === "yes" })}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Cleanliness Preference:</label>
            <select
              value={preferences.cleanliness}
              onChange={(e) => setPreferences({ ...preferences, cleanliness: e.target.value })}
            >
              <option value="any">Any</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button type="submit">Find Flatmate</button>
        </form>

        {submitted && (
          <div className="confirmation-message">
            <p>Thank you, {name}! Below are the flatmate profiles that match your preferences.</p>
          </div>
        )}
      </div>

      <div className="matched-flatmates">
        {matches.length > 0 ? (
          <ul>
            {matches.map((match, index) => (
              <li key={index}>
                <strong>{match.name}</strong> - Location: {match.location}, Budget: ${match.budget}/month
                <p>Smoking: {match.preferences.smoking ? "Yes" : "No"}</p>
                <p>Pets: {match.preferences.pets ? "Yes" : "No"}</p>
                <p>Cleanliness: {match.preferences.cleanliness}</p>
                <button onClick={() => alert(`You have matched with ${match.name}. Contact them!`)}>
                  Contact
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No flatmates match your preferences. Try adjusting your criteria.</p>
        )}
      </div>
    </div>

    <Footer />
   </div>
  
  );
}

export default FlatmateFinder;
